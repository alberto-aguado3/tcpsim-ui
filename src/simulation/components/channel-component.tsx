import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { animated, useSpring } from "react-spring";
import { Simulation } from "tcpsim-logic";
import { RootState } from "../data-store";
import { Segment, Buffer, Peer } from "../models";

interface ChannelComponentProps {
    isSimulationRunning: boolean,
}

export const ChannelComponent: React.FC<ChannelComponentProps> = ({ isSimulationRunning }) => {
    const simulator = useSelector((state: RootState) => state.simulator);

    const currentAnimatedSegmentsRef = useRef<Segment[]>([]);

    const [width, height] = [650, 200];

    useEffect(() => {
        //TODO: make some alert or similar, when the destination is not the opposite peer (or even if srcIp doesn't exist)
        /*
        Check if there is a new segment (comparing each uuid in storeSegments to currentSegments). If not found (segment created in logic):
            -Find peer in redux store by srcIp in new segment
            -If it's the active peer:
                1.Starting position = top
                2.Destination position = bottom
                3.Add payload according to myself (active)
                4.Add ack according to the other (passive)
            -If it's passive peer:
                1.Starting position = bottom
        Check if there is a new segment (comparing each uuid in currentSegments to storeSegments). If not found (segment deleted in logic):
            -All missing segments are removed from component list
        */

        simulator.channel.segments.forEach((storeSegment) => {
            console.log("EVALUO segmento");
            const storeSegmentExists = currentAnimatedSegmentsRef.current.find((currentSegment) => {
                return storeSegment.id === currentSegment.id;
            });

            if (!storeSegmentExists) {
                //crear y animar
                currentAnimatedSegmentsRef.current.push(storeSegment);
            }
        });

        currentAnimatedSegmentsRef.current.forEach((currentSegment) => {
            const currentSegmentExists = simulator.channel.segments.find((storeSegment) => {
                return storeSegment.id === currentSegment.id;
            });

            if (!currentSegmentExists) {
                //remove
                const indexToRemove = currentAnimatedSegmentsRef.current.findIndex(segment => segment.id === currentSegment.id);
                if (indexToRemove !== -1) {
                    currentAnimatedSegmentsRef.current.splice(indexToRemove, 1);
                }
            }
        });
        
    }, [simulator.channel.segments]);

    return (
        <div style={{width: `${width}px`, height: `${height}px`, background: "#66ccff", position: "relative"}}>
            {/*
            <div style={{
                border: "2px solid black",
                position:"absolute",
                left: 100,
                top: 0,
                width: 90,
                height: 50,
            }}>
                <div style={{
                    backgroundColor: "blanchedalmond",
                    height: 50,
                    width: 50,
                    left: 0,
                    top: 0,
                    zIndex: 2,
                    position: "absolute",
                    opacity: 0.5,
                }}></div>

                <div style={{
                    backgroundColor: "yellowgreen",
                    height: 50,
                    width: 50,
                    //left: 200,
                    right: 0,
                    top: (0),
                    zIndex: 2,
                    position: "absolute",
                    opacity: 0.5,
                }}></div>
            </div>
*/}            

            {currentAnimatedSegmentsRef.current.map((animatedSegment) => {
                let srcPeer: Peer,  dstPeer:Peer, isPassive: boolean;
                if (animatedSegment.header.source.ip === simulator.activePeer.controlBlock.srcIp) {
                    srcPeer = simulator.activePeer;
                    dstPeer = simulator.passivePeer;
                    isPassive = false;
                } else {
                    srcPeer = simulator.passivePeer;
                    dstPeer = simulator.activePeer;
                    isPassive = true;
                }

                return (
                    <AnimatedSegment
                        key={animatedSegment.id}
                        data={animatedSegment} 
                        parentHeight={height}
                        parentWidth={width}
                        isSrcPassive={isPassive}
                        sourcePeer={srcPeer}
                        destinationPeer={dstPeer}
                        isAnimating={isSimulationRunning}
                    />
                );
            })}
        </div>
    );
};


interface AnimatedSegmentProps {
    data: Segment,
    parentWidth: number,
    parentHeight: number,
    sourcePeer: Peer,
    destinationPeer: Peer,
    isSrcPassive: boolean,
    isAnimating: boolean
}

const AnimatedSegment: React.FC<AnimatedSegmentProps> = ({ data, parentHeight, parentWidth, sourcePeer, destinationPeer, isSrcPassive, isAnimating }) => {
    const segmentHeight = parentHeight/10;

    const scaleSrc = parentWidth / sourcePeer.sendBuffer.cells.length;
    const scaleDst = parentWidth / destinationPeer.sendBuffer.cells.length;

    let startHeight = isSrcPassive ? parentHeight - segmentHeight: 0;
    let endHeight = isSrcPassive ? 0: parentHeight - segmentHeight;

    const leftOffsetPayload = (data.header.seqNumber - sourcePeer.sendBuffer.startIndex) * scaleSrc;
    let widthPayload = (data.payload.length) * scaleSrc;

    const leftOffsetAck = (destinationPeer.controlBlock.sndUna - destinationPeer.sendBuffer.startIndex) * scaleDst;
    let widthAck = (data.header.ackNumber - destinationPeer.controlBlock.sndUna) * scaleDst;

    let leftOffsetParent = Math.min(leftOffsetPayload, leftOffsetAck);
    const lowestPoint = Math.min(leftOffsetAck, leftOffsetAck+widthAck, leftOffsetPayload, leftOffsetPayload+widthPayload);
    const biggestPoint = Math.max(leftOffsetAck, leftOffsetAck+widthAck, leftOffsetPayload, leftOffsetPayload+widthPayload);
    let widthParent = Math.abs(biggestPoint - lowestPoint); //Math.abs not needed in theory   

    const borderColor = data.header.controlBits.syn === true ? "yellow": "black";

    if (data.header.controlBits.syn) {
        leftOffsetParent = parentWidth / 2;
        widthParent = 40;
        widthPayload = 0;
        widthAck = 0;
        
    }



    const [animationProps, api] = useSpring(() => ({
        from:{ top: startHeight },
        to: { top: endHeight },
        //TODO: make continue with resume button + adjust speed to simSpeedFactor
        config: { duration: 2 * 1000},
        reset: false,
    }),
    []
    );

    useEffect(() => {
        if (!isAnimating) {
            api.stop();
        } else {
            api.resume();
        }
    }, [isAnimating]);



    return (
        <animated.div key={data.id} style={{
            ...animationProps,
            border: `2px solid ${borderColor}`,
            position: "absolute",

            height: parentHeight/10,
            width: widthParent,
            zIndex: 1,

            left: leftOffsetParent,
        }} onClick={() => {
            alert("Ayoo");
        }}>
            {data.payload.length > 0 && <animated.div style={{
                //...animationProps,
                zIndex: 2,
                //left: leftOffsetPayload, 
                //left: 0,
                left: (leftOffsetPayload - leftOffsetParent),
                width: widthPayload,
                height: parentHeight/10,
                backgroundColor: "pink", 
                opacity: 0.5,
                position:"absolute"}}></animated.div>}
            {<animated.div style={{
                //...animationProps,
                zIndex: 2,
                //left: leftOffsetAck, 
                //right: 0,
                left: (leftOffsetAck - leftOffsetParent),
                width: widthAck, 
                height: parentHeight/10,
                backgroundColor: "#00FFFF", 
                opacity: 0.5,
                position:"absolute"}}> </animated.div>}
        </animated.div>
    );
};
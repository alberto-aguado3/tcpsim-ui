import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { animated, useSpring } from "react-spring";
import { Simulation } from "tcpsim-logic";
import { RootState, updateSimUiData } from "../data-store";
import { Segment, Buffer, Peer } from "../models";
import Modal from "react-modal";

interface ChannelComponentProps {
    isSimulationRunning: boolean,
    simulation: Simulation,
}

export const ChannelComponent: React.FC<ChannelComponentProps> = ({ isSimulationRunning, simulation }) => {
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
            const storeSegmentExists = currentAnimatedSegmentsRef.current.find((currentSegment) => {
                return storeSegment.id === currentSegment.id;
            });

            if (!storeSegmentExists) {
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
                        simulation={simulation}
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
    isAnimating: boolean,
    simulation: Simulation,
}

const AnimatedSegment: React.FC<AnimatedSegmentProps> = ({ data, parentHeight, parentWidth, sourcePeer, destinationPeer, isSrcPassive, isAnimating, simulation }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);    

    const dispatch = useDispatch();
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
        <div>
            <animated.div key={data.id} style={{
                ...animationProps,
                border: `2px solid ${borderColor}`,
                position: "absolute",

                height: parentHeight/10,
                width: widthParent,
                zIndex: 1,

                left: leftOffsetParent,
            }} onClick={() => {
                setModalIsOpen(true);
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

            <Modal isOpen={modalIsOpen} onRequestClose={() => {setModalIsOpen(false);}}>
                <p>Seq Number: {data.header.seqNumber}</p>
                <p>Ack Number: {data.header.ackNumber}</p>
                <p>Window: {data.header.window}</p>
                <p>SYN: {data.header.controlBits.syn ? "true": "false"}</p>
                <p>ACK: {data.header.controlBits.ack ? "true": "false"}</p>
                <p>FIN: {data.header.controlBits.fin ? "true": "false"}</p>
                <button onClick={() => {
                simulation.dropWanderingSegment(data.id);
                dispatch(updateSimUiData(simulation));
                }
                }>Delete segment</button>
            </Modal>
        </div>
    );
};
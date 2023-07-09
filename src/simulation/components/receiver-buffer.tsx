import React, { useRef } from "react";
import { animated, useSpring } from "react-spring";
import { Buffer, ControlBlock } from "../models";
import "./styles.css";

type ReceiverWindow = {
    sizeAcked: number,
    sizeAllowed: number,
    sizeNotAllowed: number
}

function calculateReceiverWindow(ctrl: ControlBlock, rcvBuff: Buffer): ReceiverWindow {
    if (rcvBuff.cells.length === 0) {
        return {
            sizeAcked: 0,
            sizeAllowed: 0,
            sizeNotAllowed: 1
        };
    }

    return {
        sizeAcked: ctrl.rcvNxt - rcvBuff.startIndex,
        sizeAllowed: ctrl.rcvWnd,
        sizeNotAllowed: (rcvBuff.startIndex + rcvBuff.cells.length) - (ctrl.rcvNxt + ctrl.rcvWnd)
    };
}

interface ReceiverBufferProps {
    recvBuffer: Buffer,
    controlBlock: ControlBlock,
}

export const ReceiverBuffer: React.FC<ReceiverBufferProps> = ({recvBuffer, controlBlock}) => {
    const recvWindow = calculateReceiverWindow(controlBlock, recvBuffer);

    const animationDuration = 500;

    const outerDivRef = useRef<HTMLDivElement>(null);

    let scaling: number = 1;
    if (outerDivRef.current !== null) {
        scaling = outerDivRef.current.offsetWidth / recvBuffer.cells.length ;
    }

    const animatedStylesAcked = useSpring({
        //flexBasis: recvWindow.sizeAcked / recvBuffer.cells.length * 100,
        flexBasis: recvWindow.sizeAcked * scaling,
        config: { duration: animationDuration }
    });

    const animatedStylesAllowed = useSpring({
        flexBasis: recvWindow.sizeAllowed * scaling,
        config: { duration: animationDuration }
    });

    const animatedStylesNotAllowed = useSpring({
        flexBasis: recvWindow.sizeNotAllowed * scaling,
        config: { duration: animationDuration }
    });

    return (
        <div ref={outerDivRef} className="progress-bar" >
            <animated.div className="fill-recv-acked" style={animatedStylesAcked} />
            <animated.div className="fill-recv-allowed" style={animatedStylesAllowed} />
            <animated.div className="fill-recv-not-allowed" style={animatedStylesNotAllowed} />
        </div>
    );

    /*
    return (
        <div>
            Receiver: <DataBuffer progress={progress} />
        </div>
    );
    */
};

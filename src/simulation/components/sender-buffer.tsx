import React, { useRef } from "react";
import { animated, useSpring } from "react-spring";
import { Buffer, ControlBlock } from "../models";
import "./styles.css";

type SenderWindow = {
    sizeAcked: number,
    sizeUnacked: number,
    sizeNewTransmission: number,
    sizeNotAllowed: number,
}

function calculateSenderWindow(ctrl: ControlBlock, sndBuff: Buffer): SenderWindow {
    if (sndBuff === undefined || sndBuff.cells.length === 0) {
        return {
            sizeAcked: 0,
            sizeUnacked: 0,
            sizeNewTransmission: 0,
            sizeNotAllowed: 1
        };
    }
    return {
        sizeAcked: ctrl.sndUna - sndBuff.startIndex,
        sizeUnacked: ctrl.sndNxt - ctrl.sndUna,
        sizeNewTransmission: (ctrl.sndUna + ctrl.sndWnd) - ctrl.sndNxt,
        sizeNotAllowed: (sndBuff.startIndex + sndBuff.cells.length) - (ctrl.sndUna + ctrl.sndWnd)
    };
}

interface SenderBufferProps {
    sendBuffer: Buffer,
    controlBlock: ControlBlock,
}

export const SenderBuffer: React.FC<SenderBufferProps> = ({sendBuffer, controlBlock}) => {
    const sendWindow = calculateSenderWindow(controlBlock, sendBuffer);

    const outerDivRef = useRef<HTMLDivElement>(null);

    let scaling: number = 1;
    if (outerDivRef.current !== null) {
        scaling = outerDivRef.current.offsetWidth / sendBuffer.cells.length ;
    }

    const animationDuration = 500;

    const animatedStylesAcked = useSpring({
        flexBasis: sendWindow.sizeAcked * scaling,
        config: { duration: animationDuration }
    });

    const animatedStylesUnacked = useSpring({
        flexBasis: sendWindow.sizeUnacked * scaling,
        config: { duration: animationDuration }
    });

    const animatedStylesNewTransmission = useSpring({
        flexBasis: sendWindow.sizeNewTransmission * scaling,
        config: { duration: animationDuration }
    });

    const animatedStylesNotAllowed = useSpring({
        flexBasis: sendWindow.sizeNotAllowed * scaling,
        config: { duration: animationDuration }
    });

    return (
        <div ref={outerDivRef} className="progress-bar" >
            <animated.div className="fill-send-acked" style={animatedStylesAcked} />
            <animated.div className="fill-send-unacked" style={animatedStylesUnacked} />
            <animated.div className="fill-send-new-transmission" style={animatedStylesNewTransmission} />
            <animated.div className="fill-send-not-allowed" style={animatedStylesNotAllowed} />
        </div>
    );
};

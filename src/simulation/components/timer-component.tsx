import React, { useEffect, useRef, useState } from "react";

interface TimerComponentProps {
    date: Date,
    updateDate(newDate: Date):void
    isTimerRunning: boolean
}

export const TimerComponent: React.FC<TimerComponentProps> = ({ date, updateDate, isTimerRunning }) => {
    const periodIdRef = useRef<number|null>(null);
    const periodStartRef = useRef<number>(0);
    const periodRemainingRef = useRef(0);


    const refreshRate: number = 0.1;

    const simulationSpeedFactor: number = 1; //TODO: pasar a Redux


    useEffect(() => {
        if (!isTimerRunning) {
            if (periodIdRef.current !== null) {
                clearTimeout(periodIdRef.current);
                periodIdRef.current = null;
                const elapsedTime = Date.now() - periodStartRef.current;
                periodRemainingRef.current = Math.max(0, refreshRate*1000 - elapsedTime);
            }
        }

        if (isTimerRunning) {
            periodStartRef.current = Date.now();

            if (periodIdRef.current === null) {
                const timeoutId = setTimeout(() => {
                    updateDate(new Date(date.getTime() + (refreshRate)*simulationSpeedFactor*1000)); //incremento = refresco, escala (real) * factorVelocidad (simulacion)
                    periodIdRef.current = null;
                    periodRemainingRef.current = 0;
                }, (refreshRate)*1000 - periodRemainingRef.current );

                periodIdRef.current = timeoutId as unknown as number;
            }
        }

        return () => {
            if (periodIdRef.current !== null) {
                clearTimeout(periodIdRef.current);
            }
        };
    }, [date, isTimerRunning]);


    return (
        <div>DATE: {date.getTime()/1000}</div>
    );
};
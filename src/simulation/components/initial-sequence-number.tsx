import React from "react";

interface InitialSequenceNumberProps {
    isn: number
}

export const InitialSequenceNumberCard: React.FC<InitialSequenceNumberProps> = ({isn}) => {
    return (
        <div>{isn}</div>    
    );
};

import React from "react";

interface NodeCardProps {
    isPassive: boolean
}

export const NodeCard: React.FC<NodeCardProps> = ({isPassive}) => {
    //TODO: make a circle button or something
    return (
        <div>
            {isPassive ? "B" : "A"}

        </div>
    );
};

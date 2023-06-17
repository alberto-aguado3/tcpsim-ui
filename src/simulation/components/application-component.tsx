import React from "react";
import { Application } from "../models";

interface ApplicationComponentProps {
    application: Application,
}

export const ApplicationComponent: React.FC<ApplicationComponentProps> = ({application}) => {
    return (
        <div>
            <div>Data to send: {application.dataToSend}</div>
            <div>Data received: {application.dataReceived}</div>
        </div>

    );
};
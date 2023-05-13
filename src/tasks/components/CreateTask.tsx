import { Button, Input } from "@mui/material";
import React, { FunctionComponent, useState } from "react";

type CreateTaskProps = {
    onSubmit: (taskTitle: string) => Promise<void>;
}

export const CreateTask: FunctionComponent<CreateTaskProps> = ({ onSubmit }) => {
    const [taskTitle, setTaskTitle] = useState<string>("");

    return (
        <div>
            <Input
                value={taskTitle}
                onChange={(event) => {
                    event.preventDefault(); //
                    setTaskTitle(event.target.value);
                }}
                />
                <Button
                    onClick={async ()=>{
                        if (taskTitle !== "") {
                            try {
                                await onSubmit(taskTitle);
                                setTaskTitle("");
                            } catch {
                                // no-op
                            }
                        }
                    }}
                >
                    Create
                </Button>
            </div>
    );
};
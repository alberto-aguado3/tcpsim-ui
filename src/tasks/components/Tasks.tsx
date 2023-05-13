import React from "react";
import {Button, Input} from "@mui/material";
import { CreateTask } from "./CreateTask";
import { TaskList } from "./TaskList";
import { Task } from "../models";
import { useTaskStore } from "../dataStore/useTaskStore";

export const Tasks = () => {
    
    const {data, createTask} = useTaskStore();

    return (
        <div>
            <CreateTask 
                onSubmit={(newTaskTitle: string) => new Promise((resolve) => {
                    createTask(newTaskTitle);
                    resolve(undefined);
                })}
            />
            <TaskList
                tasks={data}
            />
        </div>
    );
};
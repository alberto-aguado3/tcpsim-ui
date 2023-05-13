import { useState } from "react";
import { Task } from "../models";

type TasksStore = {
    data: Task[];
    createTask: (taskTitle: string) => Promise<void>;
};

export const useTaskStore = (): TasksStore => {
    const [tasks, setTasks] = useState<Task[]>([]);

    return {
        data: tasks,
        createTask: (taskTitle: string) => new Promise((resolve, reject) => {
            setTasks([...tasks, new Task(taskTitle)]);
            resolve(undefined);
        }),
    };
};
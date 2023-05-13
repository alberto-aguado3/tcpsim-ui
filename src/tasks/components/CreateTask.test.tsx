import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CreateTask } from "./CreateTask";
import { Tasks } from "./Tasks";
import React from "react";

describe("testss the CreateTask component", () => {
    it("should trigger the onSubmit function with a valid input", async () => {
        const user = userEvent.setup();
        const onSubmit = jest.fn();

        render(<CreateTask onSubmit={onSubmit}/>);

        await user.click(screen.getByRole("textbox"));
        await user.keyboard("First task");
        await user.click(screen.getByRole("button"));

        expect(onSubmit).toHaveBeenCalledTimes(1);
    });

    it("should not trigger the onSubmit function when the input is invalid", async() => {
        const user = userEvent.setup();
        const onSubmit = jest.fn();

        render(<CreateTask onSubmit={onSubmit}/>);

        await user.click(screen.getByRole("button"));

        expect(onSubmit).toHaveBeenCalledTimes(0);
    });

    it("should clear the task title upon submission with a valid task input", async() => {
        const user = userEvent.setup();
        const onSubmit = (param: string) => new Promise<void>((resolve) => resolve(undefined));
        
        render(<CreateTask onSubmit={onSubmit}/>);

        await user.click(screen.getByRole("textbox"));
        await user.keyboard("First task");
        await user.click(screen.getByRole("button"));

        expect(screen.getByRole("textbox")).toHaveValue("");
    });

    it("should not clear the task title if the task creation cannot be successfully completed", async() => {
        const user = userEvent.setup();

        const onSubmit = (param: string) => new Promise<void>((_resolve, reject) => reject());
        
        render(<CreateTask onSubmit={onSubmit}/>);

        await user.click(screen.getByRole("textbox"));
        await user.keyboard("First task");
        await user.click(screen.getByRole("button"));

        expect(screen.getByRole("textbox")).toHaveValue("First task");
    });
});
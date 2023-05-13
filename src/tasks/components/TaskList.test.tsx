import { render, screen } from "@testing-library/react";
import React from "react";
import { Task } from "../models";
import { TaskList } from "./TaskList";

describe("tests the TaskList component", () => {
    it("should render a list with all the tasks", () => {
        render(<TaskList tasks={[new Task("First task")]}/>);

        expect(screen.getByText("First task")).toBeInTheDocument();
    });
});
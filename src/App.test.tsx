import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";
import userEvent from "@testing-library/user-event";

describe("test the App root component", () => {
    it("should correctly display the created item on the screen", async () => {
        const user = userEvent.setup();
        render(<App/>);

        const itemDescription = screen.getByRole("textbox");
        const createButton = screen.getByRole("button");

        await user.click(itemDescription);
        await user.keyboard("First item");
        await user.click(createButton);

        expect(itemDescription).toHaveValue(""); 
        expect(screen.getByText("First item")).toBeInTheDocument();

        await user.click(itemDescription);
        await user.keyboard("Second item");
        await user.click(createButton);

        expect(itemDescription).toHaveValue(""); 
        expect(screen.getByText("Second item")).toBeInTheDocument();

        await user.click(createButton);
        expect(screen.getAllByRole("listitem")).toHaveLength(2);
    });

    it("should not add empty items to the list", async () => {
        const user = userEvent.setup();
        render(<App/>);

        const itemDescription = screen.getByRole("textbox");
        const createButton = screen.getByRole("button");

        await user.click(createButton); //try to create an item with empty description
        expect(screen.getAllByRole("listitem")).toHaveLength(0);
    });
});


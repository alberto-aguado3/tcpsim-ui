import React from "react";
import { render, screen } from "@testing-library/react";
import { App } from "./App";

describe("test the App root component", () => {
    it("should render the awesome text", () => {
        render(<App/>);
        expect(screen.getByText(/awesome/)).toBeInTheDocument();
    });
});


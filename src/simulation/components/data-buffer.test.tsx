import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataBuffer } from "./data-buffer";

describe("tests the DataBuffer component", () => {
    it("should be able to render the data it contains", () => {
        const user = userEvent.setup();
        render(<DataBuffer />);

        //TODO: extend test?
    });


});
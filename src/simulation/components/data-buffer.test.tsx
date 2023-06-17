import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { DataBuffer } from "./data-buffer";

import React from "react";

describe("tests the DataBuffer component", () => {
    it("should be able to render the data it contains", () => {
        const user = userEvent.setup();
        render(<DataBuffer buffer={{cells: [], startIndex: 0}} />);

        //TODO: extend test?
    });


});
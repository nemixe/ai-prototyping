import { render, screen } from "@testing-library/react";
import { CheckboxDropdown } from "./index";
import { describe, it, expect } from "vitest";

describe("Testing CheckboxDropdown", () => {
  it("Render CheckboxDropdown", async () => {
    render(
      <CheckboxDropdown
        placeholder="dropdown"
        options={[
          { label: "Checkbox 1", value: "checkbox 1" },
          { label: "Checkbox 2", value: "checkbox 2" },
        ]}
        value={["checkbox 1"]}
      />,
    );

    expect(screen.getByText("dropdown")).toBeDefined();
  });
});

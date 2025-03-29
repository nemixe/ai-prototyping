import { render } from "@testing-library/react";
import Tabs from "./index";
import { describe, it, expect } from "vitest";

describe("Tab Testing", () => {
  it("should render correctly", () => {
    const { container } = render(<Tabs />);
    expect(container).toBeDefined();
  });

  it("should render correctly with props", () => {
    const type = "bordered-card";
    const { container } = render(<Tabs type={type} />);
    expect(container).toBeDefined();
  });

  it("should render correctly with props", () => {
    const type = "bordered-card";
    const tabPosition = "top";
    const { container } = render(
      <Tabs type={type} tabPosition={tabPosition} />,
    );
    expect(container).toBeDefined();
  });
});

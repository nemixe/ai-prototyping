import { render, screen } from "@testing-library/react";
import Breadcrumb from "./index";
import { describe, it, expect } from "vitest";

describe("Testing Breadcrumb", () => {
  it("Render Breadcrumb", async () => {
    render(<Breadcrumb breadcrumbs={[{ label: "Home", path: "/" }]} />);
    expect(screen.getByText("Home")).toBeDefined();
  });

  it("Render Breadcrumb with path", async () => {
    render(
      <Breadcrumb
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "Category", path: "/category" },
          { label: "Product", path: "/product" },
        ]}
      />,
    );
    expect(screen.getByText("Home")).toBeDefined();
    expect(screen.getByText("Category")).toBeDefined();
    expect(screen.getByText("Product")).toBeDefined();
  });
});

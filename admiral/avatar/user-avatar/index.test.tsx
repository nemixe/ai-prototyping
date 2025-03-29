import { render, screen } from "@testing-library/react";
import { it, expect, describe } from "vitest";
import UserAvatar from "./index";

describe("Tesing User Avatar", () => {
  it("Render UserAvatar", async () => {
    render(
      <UserAvatar info={{ fullname: "John", roles: [{ name: "Admin" }] }} />,
    );

    expect(screen.getByTestId("avatar")).toBeDefined();
  });
});

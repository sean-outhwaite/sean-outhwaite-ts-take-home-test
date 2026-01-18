import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AddInsight } from "./add-insight.tsx";

describe("Add Insight", () => {
  it("should display brand & insight inputs", () => {
    render(<AddInsight open onClose={() => undefined} />);
    expect(screen.getByText("Brand 3")).toBeTruthy();
    expect(screen.getByPlaceholderText("Something insightful...")).toBeTruthy();
  });
});

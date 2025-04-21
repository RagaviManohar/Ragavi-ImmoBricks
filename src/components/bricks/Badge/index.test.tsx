import React from "react";
import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi, beforeEach } from "vitest";

// Import after mocks
import { Badge } from "@/components/bricks/Badge";

// Mock dependencies
vi.mock("@/components/shadcn/ui/Badge", () => ({
  Badge: ({
    className,
    children,
    variant,
    ...props
  }: React.HTMLAttributes<HTMLDivElement> & { variant?: string }) => (
    <div
      data-testid="mocked-badge"
      data-variant={variant}
      className={className}
      {...props}
    >
      {children}
    </div>
  ),
}));

vi.mock("@/lib/utils", () => ({
  cn: (...inputs: (string | boolean | undefined)[]) =>
    inputs.filter(Boolean).join(" "),
}));

describe("Badge", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders with default props", () => {
    render(<Badge>Default</Badge>);

    const badge = screen.getByTestId("mocked-badge");
    expect(badge).toBeDefined();
    expect(badge.textContent).toBe("Default");
    expect(badge.className).toContain(
      "rounded-full border-transparent px-2 py-0.5 text-xs font-medium"
    );
    expect(badge.getAttribute("data-variant")).toBeNull();
  });

  test("renders with success variant", () => {
    render(<Badge variant="success">Success</Badge>);

    const badge = screen.getByTestId("mocked-badge");
    expect(badge).toBeDefined();
    expect(badge.textContent).toBe("Success");
    expect(badge.className).toContain("bg-green-200 text-green-950");
    expect(badge.getAttribute("data-variant")).toBeNull(); // Custom variant not passed through
  });

  test("renders with danger variant", () => {
    render(<Badge variant="danger">Danger</Badge>);

    const badge = screen.getByTestId("mocked-badge");
    expect(badge).toBeDefined();
    expect(badge.textContent).toBe("Danger");
    expect(badge.className).toContain("bg-red-200 text-red-950");
    expect(badge.getAttribute("data-variant")).toBeNull(); // Custom variant not passed through
  });

  test("renders with standard Badge variant", () => {
    render(<Badge variant="secondary">Secondary</Badge>);

    const badge = screen.getByTestId("mocked-badge");
    expect(badge).toBeDefined();
    expect(badge.textContent).toBe("Secondary");
    expect(badge.getAttribute("data-variant")).toBe("secondary");
  });

  test("renders with custom className", () => {
    render(
      <Badge className="custom-class">With Custom Class</Badge>
    );

    const badge = screen.getByTestId("mocked-badge");
    expect(badge).toBeDefined();
    expect(badge.className).toContain("custom-class");
  });

  test("passes additional props to Badge component", () => {
    render(
      <Badge data-testprop="test-value">
        With Additional Props
      </Badge>
    );

    const badge = screen.getByTestId("mocked-badge");
    expect(badge).toBeDefined();
    expect(badge.getAttribute("data-testprop")).toBe("test-value");
  });
});

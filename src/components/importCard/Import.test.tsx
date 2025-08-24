import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import ImportCard from "./ImportCard";

describe("ImportCard", () => {
  const mockProduct: ImportProduct = {
    name: "Produto1",
    description: "Descrição",
    price: 100,
    category: "Moda",
    pictureUrl: "http://example.com",
    selected: false,
    onToggle: jest.fn()
  };

  it("renders product info correctly", () => {
    render(<ImportCard {...mockProduct} />);

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument();
    expect(screen.getByText(mockProduct.category)).toBeInTheDocument();

    const checkbox = screen.getByRole("checkbox") as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it("calls onToggle when checkbox is clicked", async () => {
    render(<ImportCard {...mockProduct} />);

    const checkbox = screen.getByRole("checkbox");
    await userEvent.click(checkbox);

    expect(mockProduct.onToggle).toHaveBeenCalled();
  });
});

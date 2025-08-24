import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import Home from "./Home";

// mock Card component to simplify
jest.mock("../../components/card/Card", () => {
  return ({ id, name }: { id: number; name: string }) => (
    <div data-testid="card">{`${id} - ${name}`}</div>
  );
});

// mock useLoaderData from react-router-dom
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLoaderData: jest.fn(),
}));

import { useLoaderData } from "react-router-dom";

// sample product data
const mockProducts = [
  { id: 1, name: "Produto A", description: "desc", price: 10, category: "cat", pictureUrl: "url" },
  { id: 2, name: "Produto B", description: "desc", price: 20, category: "cat", pictureUrl: "url" },
];

describe("Home component", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    (useLoaderData as jest.Mock).mockReturnValue(mockProducts);
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders all products initially", () => {
    render(<Home />);
    expect(screen.getAllByTestId("card")).toHaveLength(2);
  });

  it("filters products by id", async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText("Código do Produto...");

    // search for id = 1
    fireEvent.change(input, { target: { value: "1" } });

    // fast-forward debounce timer (500ms)
    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(screen.getAllByTestId("card")).toHaveLength(1);
      expect(screen.getByText("1 - Produto A")).toBeInTheDocument();
    });
  });

  it("shows message when no product matches", async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText("Código do Produto...");

    fireEvent.change(input, { target: { value: "999" } });
    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(screen.getByText("Nenhum produto encontrado.")).toBeInTheDocument();
    });
  });

  it("resets filter when input is cleared", async () => {
    render(<Home />);
    const input = screen.getByPlaceholderText("Código do Produto...");

    // search first
    fireEvent.change(input, { target: { value: "2" } });
    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(screen.getAllByTestId("card")).toHaveLength(1);
    });

    // clear search
    fireEvent.change(input, { target: { value: "" } });
    jest.advanceTimersByTime(500);

    await waitFor(() => {
      expect(screen.getAllByTestId("card")).toHaveLength(2);
    });
  });
});

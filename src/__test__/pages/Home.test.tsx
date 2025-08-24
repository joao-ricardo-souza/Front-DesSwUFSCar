import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { createRoutesStub } from "react-router";
import Home from "../../pages/home/Home";

jest.mock("../../components/card/Card", () => ({
  __esModule: true,
  default: ({ id, name }: { id: number; name: string }) => (
    <div data-testid="card">
      {id} - {name}
    </div>
  ),
}));

const mockProducts = [
  { id: 1, name: "Product One", description: "desc1", price: 10, category: "A", pictureUrl: "a.jpg" },
  { id: 2, name: "Product Two", description: "desc2", price: 20, category: "B", pictureUrl: "b.jpg" },
];

function renderStub(data = mockProducts) {
  const Stub = createRoutesStub([
    {
      path: "/",
      Component: Home,
      loader: () => data,
    },
  ]);

  return render(<Stub initialEntries={["/"]} />);
}

describe("Home Page (createRoutesStub)", () => {
  it("renders products from loader", async () => {
    renderStub();
    expect(await screen.findAllByTestId("card")).toHaveLength(2);
  });

  it("filters products by id", async () => {
    renderStub();
    const input = screen.getByPlaceholderText("Código do Produto...");

    fireEvent.change(input, { target: { value: "2" } });

    await waitFor(() => {
      expect(screen.getAllByTestId("card")).toHaveLength(1);
      expect(screen.getByText(/Product Two/)).toBeInTheDocument();
    });
  });

  it("shows empty state when no match", async () => {
    renderStub();
    const input = screen.getByPlaceholderText("Código do Produto...");

    fireEvent.change(input, { target: { value: "999" } });

    await waitFor(() => {
      expect(screen.queryByTestId("card")).not.toBeInTheDocument();
      expect(screen.getByText("Nenhum produto encontrado.")).toBeInTheDocument();
    });
  });

  it("restores full list when input cleared", async () => {
    renderStub();
    const input = screen.getByPlaceholderText("Código do Produto...");

    fireEvent.change(input, { target: { value: "2" } });
    await waitFor(() => {
      expect(screen.getAllByTestId("card")).toHaveLength(1);
    });

    fireEvent.change(input, { target: { value: "" } });
    await waitFor(() => {
      expect(screen.getAllByTestId("card")).toHaveLength(2);
    });
  });
});

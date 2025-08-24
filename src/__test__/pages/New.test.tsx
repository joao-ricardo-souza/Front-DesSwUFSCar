import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import New from "../../pages/new/New";
import axios from "axios";
import { createMemoryRouter, RouterProvider } from "react-router";
import React from "react";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockNavigate = jest.fn();
jest.mock("react-router", () => {
  const original = jest.requireActual("react-router");
  return {
    ...original,
    useNavigate: () => mockNavigate,
  };
});

describe("New Product Page", () => {
  const setup = () => {
    const router = createMemoryRouter(
      [
        {
          path: "/",
          element: <New />,
        },
      ],
      {
        initialEntries: ["/"],
      }
    );
    return render(<RouterProvider router={router} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("submits form and posts new product", async () => {
    setup();

    fireEvent.change(screen.getByPlaceholderText(/nome/i), {
      target: { value: "Produto Teste" },
    });
    fireEvent.change(screen.getByPlaceholderText(/descrição/i), {
      target: { value: "Descrição Teste" },
    });
    fireEvent.change(screen.getByPlaceholderText(/categoria/i), {
      target: { value: "Categoria Teste" },
    });
    fireEvent.change(screen.getByPlaceholderText(/preço/i), {
      target: { value: "100" },
    });
    fireEvent.change(screen.getByPlaceholderText(/foto/i), {
      target: { value: "http://test.com/foto.jpg" },
    });

    mockedAxios.post.mockResolvedValueOnce({ data: { id: 1 } });

    fireEvent.submit(screen.getByRole("form"));

    await waitFor(() => {
      expect(mockedAxios.post).toHaveBeenCalledWith("http://localhost:3001/api/product", {
        name: "Produto Teste",
        description: "Descrição Teste",
        category: "Categoria Teste",
        price: 100,
        pictureUrl: "http://test.com/foto.jpg",
      });
      expect(mockNavigate).toHaveBeenCalledWith("/products");
    });
  });

  it("navigates back when clicking cancel", () => {
    setup();

    fireEvent.click(screen.getByText(/cancelar/i));
    expect(mockNavigate).toHaveBeenCalledWith("/products");
  });
});

import { it, describe, vi, expect, beforeEach } from "vitest";
import { Homepage } from "./Homepage";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import "@testing-library/jest-dom";
import React from "react";
import axios from "axios";

vi.mock("axios");

describe("testing for homepage component rendering", () => {
  let fetchCart;

  beforeEach(() => {
    fetchCart = vi.fn();

    axios.get.mockImplementation(async (urlPath) => {
      if (urlPath === "/api/products") {
        return {
          data: [
            {
              id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
              image: "images/products/athletic-cotton-socks-6-pairs.jpg",
              name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
              rating: {
                stars: 4.5,
                count: 87,
              },
              priceCents: 1090,
              keywords: ["socks", "sports", "apparel"],
            },
          ],
        };
      }
    });
  });

  it("renders homepage", async () => {
    render(
      <MemoryRouter>
        <Homepage cart={[]} fetchCart={fetchCart} />
      </MemoryRouter>
    );

    expect(
      await screen.findByText(
        "Black and Gray Athletic Cotton Socks - 6 Pairs"
      )
    ).toBeInTheDocument();
  });
});
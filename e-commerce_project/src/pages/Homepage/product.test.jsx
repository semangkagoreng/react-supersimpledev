import { it, describe, vi, expect, beforeEach } from "vitest";
import { Product } from "./Product";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import axios from "axios";

vi.mock("axios");

let product;
let fetchCart;

    beforeEach(() => {
     product = {
      id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      image: "images/products/athletic-cotton-socks-6-pairs.jpg",
      name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
      rating: {
        stars: 4.5,
        count: 87,
      },
      priceCents: 1090,
      keywords: ["socks", "sports", "apparel"],
    };
     fetchCart = vi.fn();
})




describe("testing for product rendering", () => {
  it("rendering", () => {
 
    render(<Product product={product} fetchCart={fetchCart} />);
    expect(
      screen.getByText("Black and Gray Athletic Cotton Socks - 6 Pairs"),
    ).toBeInTheDocument();

    expect(screen.getByTestId("productImage")).toHaveAttribute(
      "src",
      "images/products/athletic-cotton-socks-6-pairs.jpg",
    );
  });

  describe("testing add to cart button", () => {
    it("adding cart button", async () => {

      render(<Product product={product} fetchCart={fetchCart} />);
      const addToCartButton = screen.getByTestId("addToCartButton");
      const user = userEvent.setup();
      await user.click(addToCartButton);

      expect(axios.post).toHaveBeenCalledWith("/api/cart-items", {
        productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 1,
      });
      expect(fetchCart).toHaveBeenCalled()
    });
  });
});

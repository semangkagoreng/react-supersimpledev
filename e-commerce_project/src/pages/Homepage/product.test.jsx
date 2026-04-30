import {it,describe,vi,expect} from 'vitest'
import { Product } from './Product'
import { render,screen } from '@testing-library/react'
import React from 'react'

describe('testing for product rendering', () => {
    it('rendering', () => {
                const product =   {
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                rating: {
                stars: 4.5,
                count: 87
                },
                priceCents: 1090,
                keywords: ["socks", "sports", "apparel"]
            };
           const fetchCart = vi.fn()
           render(<Product product={product} fetchCart={fetchCart}/>)
    expect(
      screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')
    ).toBeInTheDocument()
})
})
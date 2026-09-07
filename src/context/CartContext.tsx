import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
} from 'react';

import {
  CartLine,
  MenuItem,
  SizeOption,
  Customization,
} from '../types';

interface CartContextValue {
  lines: CartLine[];

  addToCart: (
    menuItem: MenuItem,
    size: SizeOption,
    quantity: number,
    customization: Customization
  ) => void;

  removeLine: (lineId: string) => void;

  updateQuantity: (
    lineId: string,
    quantity: number
  ) => void;

  clearCart: () => void;
}

const CartContext =
  createContext<CartContextValue | undefined>(undefined);

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [lines, setLines] = useState<CartLine[]>([]);

  function addToCart(
    menuItem: MenuItem,
    size: SizeOption,
    quantity: number,
    customization: Customization
  ) {
    const lineId =
      `${menuItem.id}-${size.id}-${customization.milk}-${customization.sweetness}-${customization.extraShot}`;

    setLines((current) => {
      const existing = current.find(
        (line) => line.id === lineId
      );

      if (existing) {
        return current.map((line) =>
          line.id === lineId
            ? {
                ...line,
                quantity:
                  line.quantity + quantity,
              }
            : line
        );
      }

      return [
        ...current,
        {
          id: lineId,
          menuItem,
          size,
          quantity,
          customization,
        },
      ];
    });
  }

  function removeLine(lineId: string) {
    setLines((current) =>
      current.filter((line) => line.id !== lineId)
    );
  }

  function updateQuantity(
    lineId: string,
    quantity: number
  ) {
    if (quantity <= 0) {
      removeLine(lineId);
      return;
    }

    setLines((current) =>
      current.map((line) =>
        line.id === lineId
          ? { ...line, quantity }
          : line
      )
    );
  }

  function clearCart() {
    setLines([]);
  }

  return (
    <CartContext.Provider
      value={{
        lines,
        addToCart,
        removeLine,
        updateQuantity,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);

  if (!ctx) {
    throw new Error(
      'useCart must be used inside a CartProvider'
    );
  }

  return ctx;
}
import { useMemo } from "react";

export const useCalculateSubtotal = (cart: any[]) => {
  return useMemo(() => {
    return cart.reduce(
      (acc, item) => acc + item.product.price * item.quantity,
      0
    );
  }, [cart]);
};

export type CartItem = {
  name: string;
  slug: string;
  image: string;
  price: number;
  quantity: number;
};

export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  const cart = localStorage.getItem("cart");
  return cart ? JSON.parse(cart) : [];
}

export function saveCart(cart: CartItem[]) {
  localStorage.setItem("cart", JSON.stringify(cart));
}

export function addToCart(item: CartItem) {
  const cart = getCart();

  const existing = cart.find((p) => p.slug === item.slug);

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);
}
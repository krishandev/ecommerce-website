import toast from "react-hot-toast";

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

  // ✅ ADD THIS LINE
  window.dispatchEvent(new Event("cartUpdated"));
}

export async function addToCart(item: CartItem) {
  // ✅ CHECK LOGIN
  const isSignedIn =
    document.cookie.includes("__session");

  // ✅ LOGGED-IN USER → DB
  if (isSignedIn) {
    try {
      // 🔥 GET CURRENT DB CART
      const res = await fetch("/api/cart");
      const data = await res.json();

      const cart = data?.items || [];

      const existing = cart.find(
        (p: CartItem) => p.slug === item.slug
      );

      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ ...item, quantity: 1 });
      }

      // 🔥 SAVE TO DB
      await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ items: cart }),
      });

      // 🔥 UPDATE UI
      window.dispatchEvent(
        new Event("cartUpdated")
      );

      toast.success(
        `${item.name} added to your cart 🛒`
      );

      return;
    } catch (err) {
      console.error(err);
    }
  }

  // ✅ GUEST USER → LOCALSTORAGE
  const cart = getCart();

  const existing = cart.find(
    (p) => p.slug === item.slug
  );

  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ ...item, quantity: 1 });
  }

  saveCart(cart);

  window.dispatchEvent(new Event("cartUpdated"));

  toast.success(`${item.name} added to your cart 🛒`);
}


// export function addToCart(item: CartItem) {
//   const cart = getCart();

//   const existing = cart.find((p) => p.slug === item.slug);

//   if (existing) {
//     existing.quantity += 1;
//   } else {
//     cart.push({ ...item, quantity: 1 });
//   }

//   saveCart(cart);

//    toast.success(`${item.name} added to your cart 🛒`);
   
// }


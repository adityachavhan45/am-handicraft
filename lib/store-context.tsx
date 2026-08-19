"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { products, type Product } from "@/lib/products";

type CartLine = {
  productId: string;
  quantity: number;
};

type DemoOrder = {
  id: string;
  amount: number;
  customerName: string;
  city: string;
  delivery: string;
};

type StoreContextValue = {
  cart: CartLine[];
  wishlist: string[];
  recentlyViewed: string[];
  isCartOpen: boolean;
  isSearchOpen: boolean;
  demoOrder: DemoOrder | null;
  cartCount: number;
  subtotal: number;
  addToCart: (productId: string, quantity?: number) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  moveToWishlist: (productId: string) => void;
  addRecentlyViewed: (productId: string) => void;
  setCartOpen: (open: boolean) => void;
  setSearchOpen: (open: boolean) => void;
  placeDemoOrder: (order: Omit<DemoOrder, "id" | "amount">) => DemoOrder;
};

const StoreContext = createContext<StoreContextValue | null>(null);

function readStorage<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  try {
    const value = window.localStorage.getItem(key);
    return value ? (JSON.parse(value) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);
  const [demoOrder, setDemoOrder] = useState<DemoOrder | null>(null);
  const [isCartOpen, setCartOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      setCart(readStorage<CartLine[]>("am-cart", []));
      setWishlist(readStorage<string[]>("am-wishlist", []));
      setRecentlyViewed(readStorage<string[]>("am-recently-viewed", []));
      setDemoOrder(readStorage<DemoOrder | null>("am-demo-order", null));
      setLoaded(true);
    }, 0);
    return () => window.clearTimeout(id);
  }, []);

  useEffect(() => {
    if (loaded) window.localStorage.setItem("am-cart", JSON.stringify(cart));
  }, [cart, loaded]);

  useEffect(() => {
    if (loaded) window.localStorage.setItem("am-wishlist", JSON.stringify(wishlist));
  }, [wishlist, loaded]);

  useEffect(() => {
    if (loaded) window.localStorage.setItem("am-recently-viewed", JSON.stringify(recentlyViewed));
  }, [recentlyViewed, loaded]);

  useEffect(() => {
    if (loaded) window.localStorage.setItem("am-demo-order", JSON.stringify(demoOrder));
  }, [demoOrder, loaded]);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (!existing) return [...current, { productId, quantity }];
      return current.map((item) =>
        item.productId === productId
          ? { ...item, quantity: Math.min(20, item.quantity + quantity) }
          : item,
      );
    });
    setCartOpen(true);
  }, []);

  const removeFromCart = useCallback((productId: string) => {
    setCart((current) => current.filter((item) => item.productId !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, quantity: number) => {
    setCart((current) =>
      current.map((item) =>
        item.productId === productId ? { ...item, quantity: Math.max(1, quantity) } : item,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }, []);

  const removeFromWishlist = useCallback((productId: string) => {
    setWishlist((current) => current.filter((id) => id !== productId));
  }, []);

  const moveToWishlist = useCallback(
    (productId: string) => {
      setWishlist((current) => (current.includes(productId) ? current : [...current, productId]));
      removeFromCart(productId);
    },
    [removeFromCart],
  );

  const addRecentlyViewed = useCallback((productId: string) => {
    setRecentlyViewed((current) => [productId, ...current.filter((id) => id !== productId)].slice(0, 8));
  }, []);

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
  const subtotal = cart.reduce((total, item) => {
    const product = products.find((candidate) => candidate.id === item.productId);
    return total + (product?.price ?? 0) * item.quantity;
  }, 0);

  const placeDemoOrder = useCallback(
    (order: Omit<DemoOrder, "id" | "amount">) => {
      const nextOrder = {
        ...order,
        id: `AMH-${Math.floor(100000 + Math.random() * 899999)}`,
        amount: subtotal + (subtotal > 1499 || subtotal === 0 ? 0 : 99) - (subtotal > 3999 ? 350 : 0),
      };
      setDemoOrder(nextOrder);
      setCart([]);
      return nextOrder;
    },
    [subtotal],
  );

  const value = useMemo<StoreContextValue>(
    () => ({
      cart,
      wishlist,
      recentlyViewed,
      isCartOpen,
      isSearchOpen,
      demoOrder,
      cartCount,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      removeFromWishlist,
      moveToWishlist,
      addRecentlyViewed,
      setCartOpen,
      setSearchOpen,
      placeDemoOrder,
    }),
    [
      cart,
      wishlist,
      recentlyViewed,
      isCartOpen,
      isSearchOpen,
      demoOrder,
      cartCount,
      subtotal,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      toggleWishlist,
      removeFromWishlist,
      moveToWishlist,
      addRecentlyViewed,
      placeDemoOrder,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) throw new Error("useStore must be used inside StoreProvider");
  return context;
}

export function getCartProducts(cart: CartLine[]) {
  return cart
    .map((item) => {
      const product = products.find((candidate) => candidate.id === item.productId);
      return product ? { product, quantity: item.quantity } : null;
    })
    .filter(Boolean) as { product: Product; quantity: number }[];
}

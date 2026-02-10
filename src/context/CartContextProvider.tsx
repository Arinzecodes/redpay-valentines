"use client";
import { StaticImageData } from "next/image";
import React, { createContext, useContext, useEffect, useState } from "react";

export interface CartItem {
    id: string;
    name: string;
    size?: string;
    price: number; // Changed to number
    image: StaticImageData | string;
    quantity: number;
}

interface CartContextProps {
    cartItems: CartItem[];
    addToCart: (item: CartItem) => void;
    removeFromCart: (id: string, size: string) => void;
    updateQuantity: (id: string, size: string, quantity: number) => void;
    clearCart: () => void;
    calculateTotal: () => number;

    // ADDED: allow external hydration (API → context)
  setCartItems: React.Dispatch<React.SetStateAction<CartItem[]>>;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [cartItems, setCartItems] = useState<CartItem[]>([]);

    useEffect(() => {
        const savedCartItems = sessionStorage.getItem("cartItems");
        if (savedCartItems) {
            setCartItems(JSON.parse(savedCartItems));
        }
    }, []);

    // Save to session storage whenever cart changes
    useEffect(() => {
        sessionStorage.setItem("cartItems", JSON.stringify(cartItems));
    }, [cartItems]);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);
    };

    const addToCart = (item: CartItem) => {
        setCartItems((currentItems) => {
            const existingItemIndex = currentItems.findIndex(
                (cartItem) => cartItem.id === item.id && cartItem.size === item.size
            );

            if (existingItemIndex > -1) {
                const updatedItems = [...currentItems];
                updatedItems[existingItemIndex].quantity += item.quantity;
                return updatedItems;
            } else {
                return [...currentItems, item];
            }
        });
    };

    const removeFromCart = (id: string, size: string) => {
        setCartItems((currentItems) => 
            currentItems.filter((item) => !(item.id === id && item.size === size))
        );
    };

    const updateQuantity = (id: string, size: string, quantity: number) => {
        setCartItems((currentItems) => 
            currentItems.map((item) => 
                (item.id === id && item.size === size) ? { ...item, quantity } : item
            )
        );
    };

    const clearCart = () => {
        setCartItems([]);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, calculateTotal, setCartItems }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextProps => {
    const context = useContext(CartContext);
    if (!context) throw new Error("useCart must be used within a CartProvider");
    return context;
};
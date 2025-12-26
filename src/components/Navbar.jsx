// src/components/Navbar.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import CartModal from "../components/Cart";
import { useCart } from "../context/cartContext";

export default function Navbar() {
  const [openCart, setOpenCart] = useState(false);
  const { items } = useCart();
  const totalQty = items.reduce((s, it) => s + it.quantity, 0);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top w-100">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Relatos de Papel</Link>

          <div className="collapse navbar-collapse">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item d-flex align-items-center">
                <button
                  type="button"
                  className="btn btn-light btn-sm"
                  onClick={() => setOpenCart(true)}
                >
                  <img className="cart-button__icon" src="/images/carrito-de-compras.png" alt="carrito-de-compras" /> 
                  <span className="cart-button__text">Carrito</span>
                 
                  {totalQty > 0 && (
                    <span className="badge bg-danger ms-3">{totalQty}</span>
                  )}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <CartModal open={openCart} onClose={() => setOpenCart(false)} />
    </>
  );
}

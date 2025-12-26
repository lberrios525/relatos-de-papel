import React from "react";
import { useCart } from "../context/cartContext";
import { Link } from "react-router-dom";

export default function CartModal({ open, onClose, title = "Carrito" }) {
  if (!open) return null;
  const stop = (e) => e.stopPropagation();

  const { items, removeFromCart, updateQuantity, subtotal } = useCart();

  return (
    <>
      <div className="modal-backdrop fade show" />
      <div className="modal fade show" style={{ display: "block" }} tabIndex="-1" role="dialog" onClick={onClose} aria-modal="true">
        <div className="modal-dialog modal-dialog-end" role="document" onClick={stop}>
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{title}</h5>
              <button type="button" className="btn-close" aria-label="Cerrar" onClick={onClose}></button>
            </div>

            <div className="modal-body">
              {items.length === 0 ? (
                <p className="mb-0">Tu carrito está vacío.</p>
              ) : (
                <ul className="list-unstyled">
                  {items.map(({ book, price, quantity }) => (
                    <li key={book.key} className="d-flex gap-2 align-items-start mb-3">
                      <div className="cart-modal__image">
                        {book.covers?.[0] ? (
                          <img
                            className="cart-modal__image-img"
                            src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
                            alt={book.title}
                          />
                        ) : (
                          <div className="cart-modal__image--placeholder"></div>
                        )}
                      </div>
                      <div className="flex-grow-1">
                        <div className="fw-bold">{book.title}</div>
                        <div className="text-muted small">{book.author}</div>

                        <div className="d-flex align-items-center gap-2 mt-2">
                          <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={e => updateQuantity(book.key, Math.max(1, Number(e.target.value)))}
                            style={{ width: 72 }}
                            className="form-control form-control-sm"
                          />
                          <div className="fw-semibold">
                            $ {price * quantity}
                          </div>
                          <button className="btn btn-link text-danger btn-sm" onClick={() => removeFromCart(book.key)}>Eliminar</button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="modal-footer">
              <div className="me-auto">
                <div className="small text-muted">Subtotal</div>
                <div className="fw-bold">${subtotal}</div>
              </div>

              <button type="button" className="btn btn-secondary" onClick={onClose}>Cerrar</button>
              <Link to="/cart" className="btn btn-primary" onClick={onClose}>Ir a pagar</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

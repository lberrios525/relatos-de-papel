import React from "react";
import Navbar from "../components/Navbar";
import { useCart } from "../context/cartContext";
import { Link } from "react-router-dom";

export const Shop = () => {
  const { items, removeFromCart, subtotal, totalQty } = useCart();
  return (
    <div className="home-container">
      <Navbar />
      <section className="container">
        <h1>Carrito de compras</h1>
        {items.length == 0 && (
          <div className="card text-center">
            <div className="card-body">
              <h5 class="card-title">Libros Vacios</h5>
              <p class="card-text">Sigue buscando tu libro preferido.</p>
              <Link to="/" className="card-link ">
                Ir a comprar
              </Link>
            </div>
          </div>
        )}
        {items.length != 0 && (
          <div className="row">
            <div className="col-12 col-md-8 ">
              <h2>{`${totalQty} Libros en el carrito`}</h2>
              <hr />
              <div>
                {items.map(({ book, price, quantity }) => (
                  <div key={book.key} className="card mb-1">
                    <div className="row">
                      <div className="col-2">
                        <img
                          className="img-fluid rounded-start"
                          src={`https://covers.openlibrary.org/b/id/${book.covers[0]}-L.jpg`}
                          alt={book.title}
                        />
                      </div>
                      <div className="col-auto col-md-8">
                        <div className="fs-4">{book.title}</div>
                        <div className="text-start truncate-3">
                          {`Descripcion: ${
                            typeof book.description === "string"
                              ? book.description
                              : book.description.value
                          }`}
                        </div>
                        <div className="row">
                          <div className="col-auto">
                            <p>
                              <strong>Precio:</strong> ${price}
                            </p>
                          </div>
                          <div className="col-auto">
                            <p>
                              <strong>Cantidad:</strong> {quantity}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="col col-auto align-self-center">
                        <button
                          className="btn btn-outline-danger"
                          onClick={() => removeFromCart(book.key)}
                        >
                          Eliminar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-12 col-md-4">
              <div className=" text-secondary">Total</div>
              <div className="fs-1 fw-bold">{`${subtotal} $`}</div>
              <Link
                to="/payment/checkout"
                className="btn btn-primary w-100 fs-3"
              >
                Checkout
              </Link>
            </div>
          </div>
        )}
      </section>
    </div>
  );
};

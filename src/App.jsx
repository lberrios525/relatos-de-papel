// App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import BookDetail from "./pages/BookDetail";
import { CartProvider } from "./context/cartContext";
import { Shop } from "./pages/Shop";

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
      <Routes>
        <Route path="/" element={<Landing />} />  
        <Route path="/home" element={<Home />} />  
        <Route path="/book/*" element={<BookDetail />} />
        <Route path="/cart" element={<Shop />} />
      </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

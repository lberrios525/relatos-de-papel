import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import { searchBooks } from "../services/bookService";

import BookCard from "../components/BookCard";

export default function Landing() {  
  const [cargandoRecomendaciones, setCargandoRecomendaciones] = useState(true);
  const [librosRecomendados, setLibrosRecomendados] = useState([]);

  const navigate = useNavigate();

  const filterValidBooks = (results, limit = 20) => {
    const seenAuthors = new Set();
    const seenTitles = new Set();
    const uniqueBooks = [];

    for (const book of results) {
      if (
        book.author &&
        book.title &&
        !seenAuthors.has(book.author) &&
        !seenTitles.has(book.title)
      ) {
        seenAuthors.add(book.author);
        seenTitles.add(book.title);
        uniqueBooks.push(book);
      }
      if (uniqueBooks.length >= limit) break; // limitar a 20
    }

    return uniqueBooks;
  };


  const cargarRecomendaciones = async () => {
    const results = await searchBooks("the"); 
    const validBooks = filterValidBooks(results, 10);

    const shuffled = validBooks.sort(() => 0.5 - Math.random());
    const random20 = shuffled.slice(0, 4);
    const booksWithPrice = random20.map(book => ({
            author: book.author,
            cover: book.cover,
            id: book.id,
            title: book.title,
            price: Math.floor(Math.random() * 50) + 1 // Precio aleatorio entre 1 y 50
          }));    

    setLibrosRecomendados(booksWithPrice);
    setCargandoRecomendaciones(false);
  };    

  //Carga libros recomendados
  useEffect(() => {    
    cargarRecomendaciones();    
  }, [])  
  

  //Redirigir a home luego de 5 segundos de haber cargado las recomendaciones
  useEffect(() => {
    let timeOutID;

    if (!cargandoRecomendaciones) {
      timeOutID = setTimeout(() => {
        navigate("/home")
      }, 5000)
    }
    

    return () => { clearTimeout(timeOutID)}	
  }, [cargandoRecomendaciones])
    
  return (
    cargandoRecomendaciones ? 
    (
      <div className="container py-5 text-center">
        <div className="spinner-border text-primary" role="status" />
        <p>Obteniendo recomendaciones del día</p>
      </div>
    ) :      

    (
      <div className="container py-5 text-center">
        <h1>
          <i className="bi bi-lightbulb"></i> 
          Recomendaciones del día
        </h1>

        <div className="book-list">
          {librosRecomendados.map( (libro) => (
            <BookCard key={libro.id} book={libro} />
          ))}          
        </div>
      </div>
    )
   )     
}

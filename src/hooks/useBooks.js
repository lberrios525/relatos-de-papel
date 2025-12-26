import { useState, useEffect } from "react";
import { searchBooks } from "../services/bookService";

export function useBooks() {
  const [books, setBooks] = useState([]);


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

  const fetchBooks = async (query) => {
    const results = await searchBooks(query);
    const validBooks = filterValidBooks(results);
    setBooks(validBooks);
  };

  useEffect(() => {
    const loadInitialBooks = async () => {

      const results = await searchBooks("the"); 

    
      const validBooks = filterValidBooks(results, 100);

     
      const shuffled = validBooks.sort(() => 0.5 - Math.random());
      const random20 = shuffled.slice(0, 20);
      const booksWithPrice= random20.map(book => ({
              author: book.author,
              cover: book.cover,
              id: book.id,
              title: book.title,
              price: Math.floor(Math.random() * 50) + 1 // Precio aleatorio entre 1 y 50
            }));

      setBooks(booksWithPrice);
    };

    loadInitialBooks();
  }, []);

  return { books, fetchBooks };
}

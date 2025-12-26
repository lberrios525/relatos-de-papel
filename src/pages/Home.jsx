import { useBooks } from "../hooks/useBooks";
import SearchBar from "../components/SearchBar";
import BookCard from "../components/BookCard";
import Navbar from "../components/Navbar"; //

export default function Home() {
  const { books, fetchBooks } = useBooks();

  const filteredBooks = books.filter( (book) => book.cover && book.description );
  return (
    <div className="home-container" >
      <Navbar />
      <h1>
        <i className="bi bi-journal-bookmark me-2"></i>
          Relatos de Papel
      </h1>

      <SearchBar onSearch={fetchBooks} />
      <div className="book-list">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
}

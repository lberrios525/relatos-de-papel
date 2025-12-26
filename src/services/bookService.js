// src/services/bookService.js
export async function searchBooks(query) {
  try {
    const response = await fetch(
      `https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`
    );

    if (!response.ok) {
      throw new Error("Error al obtener libros");
    }

    const data = await response.json();


    return data.docs
      .filter((book) =>
        book.title?.toLowerCase().includes(query.toLowerCase())
      )
      .map((book) => ({
        id: book.key,
        title: book.title,
        author: book.author_name ? book.author_name[0] : "Autor desconocido",
        cover: book.cover_i
          ? `https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`
          : "https://via.placeholder.com/150?text=Sin+Imagen",
      }));
  } catch (error) {
    console.error("Error en fetch:", error);
    return [];
  }
}

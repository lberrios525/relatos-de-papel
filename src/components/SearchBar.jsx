export default function SearchBar({ onSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = e.target.elements.search.value;
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="d-flex justify-content-end mb-3">
      <input
        type="text"
        name="search"
        className="form-control form-control-sm me-2 w-25"
        placeholder="Buscar por título..."
      />
      <button type="submit" className="btn btn-outline-primary btn-sm">
         <i className="bi bi-search me-1"></i> Buscar
      </button>
    </form>
  );
}

import axios from "axios";

export default function App() {
  return (
    <div className="container p-5 vh-100">
      <h1 className="text-center">📨Post Form📨</h1>
      <div className="card border-5">
        <form className="p-3">
          <div className="mb-3">
            <label for="author" className="form-label">
              <h2 className="h6 m-0">Author</h2>
            </label>
            <input type="text" className="form-control" id="author" />
          </div>
          <div className="mb-3">
            <label for="title" className="form-label">
              <h2 className="h6 m-0">Title</h2>
            </label>
            <input type="text" className="form-control" id="title" />
          </div>
          <div class="mb-3">
            <label for="body" class="form-label">
              <h2 className="h6 m-0">Body</h2>
            </label>
            <textarea class="form-control" id="body"></textarea>
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="public" />
            <label className="form-check-label" for="public">
              <h2 className="h6 m-0">Public</h2>
            </label>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">
              <h2 className="h6 m-0">Submit</h2>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

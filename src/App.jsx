import axios from "axios";
import { useState } from "react";

const urlApi = "https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts";

export default function App() {
  const initialState = {
    author: "",
    title: "",
    body: "",
    public: false,
  };

  const [formData, setFormData] = useState(initialState);

  const handleFormDataChanges = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios
      .post(urlApi, formData)
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.error(e.message));
    setFormData(initialState);
  };

  return (
    <div className="container p-5 vh-100">
      <h1 className="text-center">📨Post Form📨</h1>
      <div className="card border-5">
        <form className="p-3" onSubmit={handleFormSubmit}>
          <div className="mb-3">
            <label htmlFor="author" className="form-label">
              <h2 className="h6 m-0">Author</h2>
            </label>
            <input
              name="author"
              value={formData.author}
              onChange={handleFormDataChanges}
              type="text"
              className="form-control"
              id="author"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              <h2 className="h6 m-0">Title</h2>
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleFormDataChanges}
              type="text"
              className="form-control"
              id="title"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="body" className="form-label">
              <h2 className="h6 m-0">Body</h2>
            </label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleFormDataChanges}
              className="form-control"
              id="body"
            ></textarea>
          </div>
          <div className="mb-3 form-check">
            <input
              name="public"
              checked={formData.public}
              onChange={handleFormDataChanges}
              type="checkbox"
              className="form-check-input"
              id="public"
            />
            <label className="form-check-label" htmlFor="public">
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

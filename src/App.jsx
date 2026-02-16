import axios from "axios";
import { useState } from "react";

const urlApi = "https://67c5b4f3351c081993fb1ab6.mockapi.io/api/posts";

export default function App() {
  const alertDefault = { content: "", type: "alert-info", isActive: false };
  const [alertObj, setAlertObj] = useState(alertDefault);

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
    setAlertObj(alertDefault);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    let missingData = false;
    for (let key in formData) {
      if (key !== "public") {
        if (!formData[key] || formData[key].trim() === "") {
          missingData = true;
          break;
        }
      }
    }

    const printData = (objectData) => {
      let stringResult = "";
      for (let key in objectData) {
        stringResult += ` ${key}: ${objectData[key]},`;
      }
      return stringResult.slice(0, -1);
    };

    const handleApiRequest = () => {
      {
        /* alert("Dati Inviati!"); */
        setAlertObj({
          content: "Dati Inviati!",
          type: "alert-info",
          isActive: true,
        });
        axios
          .post(urlApi, formData)
          .then((res) => {
            console.log(res.data);
            /* alert("Risposta server: \n\n" + printData(res.data)); */
            setAlertObj((alertObj) => ({
              ...alertObj,
              content: "Risposta server:" + printData(res.data),
              type: "alert-success",
              isActive: true,
            }));
          })
          .catch((e) => {
            console.error("ERRORE: " + e.message);
            /* alert("ERRORE: \n\n" + e.message); */
            setAlertObj((alertObj) => ({
              ...alertObj,
              content: "ERRORE: " + e.message,
              type: "alert-danger",
              isActive: true,
            }));
          });
      }
    };

    if (missingData) {
      /* alert(
          "Dati mancanti! Compilare in modo corretto tutti i campi e riprovare.",
        ) */
      setAlertObj({
        content:
          "Dati mancanti! Compilare in modo corretto tutti i campi e riprovare.",
        type: "alert-warning",
        isActive: true,
      });
    } else {
      handleApiRequest();
    }

    setFormData(initialState);
  };

  return (
    <div className="container p-5 vh-100">
      <div className="alert-container">
        <div
          className={`alert alert-dismissible fade show ${alertObj.type} ${alertObj.isActive ? "" : "d-none"}`}
          role="alert"
        >
          {alertObj.content}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() =>
              setAlertObj((alertObj) => ({ ...alertObj, isActive: false }))
            }
          ></button>
        </div>
      </div>

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
              required
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
              required
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
              required
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

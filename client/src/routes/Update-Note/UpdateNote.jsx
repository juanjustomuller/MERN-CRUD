import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const UpdateNote = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const baseUrl = `https://mern-crud-notes.vercel.app/api/notes/${id}`;
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseUrl);

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        //console.log("data", data)
        setTitle(data.title);
        setDescription(data.description);
      } catch (error) {
        setError("Error fetching data. Please try again later");
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const updateNote = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseUrl, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (response.ok) {
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2000);
      } else {
        console.log("Failed to submit data");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const removeNote = async (e) => {
    e.preventDefault()
    try {
        const response = await fetch(baseUrl, {
            method: "DELETE"
        })

        if(response.ok){
            navigate('/')
        }
    } catch (error) {
        
    }
  }

  return (
    <div>
      <div className="breadcrump-nav">
        <Link to="/" className="back-button">
          👈🏻 Back
        </Link>

        <button onClick={removeNote} className="delete">
            ❌ Remove
        </button>
      </div>

      <form onSubmit={updateNote}>
        <div className="single-note">
          <div>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Title"
              className="title"
            />
          </div>

          <div>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Description"
              rows="4"
              cols="50"
              className="description"
            ></textarea>
          </div>
        </div>

        <input
          type="submit"
          value={submitted ? "Saving Note..." : "💾 Save Note"}
          disabled={submitted}
        />

        <p className="text-center">
          {submitted && (
            <div className="success-message">Note has been added!</div>
          )}
        </p>
      </form>
    </div>
  );
};

export default UpdateNote;

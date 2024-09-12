import React, { useState } from "react";
import { Link } from "react-router-dom";

const AddNNote = () => {
  const baseUrl = 'https://mern-crud-notes.vercel.app/api/notes';
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const addNote = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(baseUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title,
          description,
        }),
      });

      if (response.ok) {
        setTitle("");
        setDescription("");
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 2000);
      } else {
        console.log("Failed to submit data");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div>
      <Link to="/" className="back-button">
        👈🏻 Back
      </Link>

      <form onSubmit={addNote}>
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

export default AddNNote;

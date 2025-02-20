import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

function Create() {
  const [student, setValues] = useState({
    name: "",
    email: "",
    age: "",
    gender: "",
  });
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!student.name || !student.email || !student.age || !student.gender) {
      return console.log("all fields are required");
    }
    console.log(student);

    try {
      const apiUrl = "https://students-backend-bb8k.onrender.com/add_user";
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      };
      const response = await fetch(apiUrl, options);
      const data = await response.json();
      console.log(data);
      setValues({ name: "", email: "", age: "", gender: "" });
      navigate("/");
    } catch (err) {
      return console.log(`${err}`);
    }
  }

  function handleChange(event) {
    setValues({ ...student, [event.target.name]: event.target.value });
  }
  return (
    <div className="form-container">
      <h2 className="form-title">Add Student</h2>
      <form className="student-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={student.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={student.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Gender:</label>
          <select
            name="gender"
            value={student.gender}
            onChange={handleChange}
            required
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={student.age}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn-save">
          Save
        </button>
      </form>
    </div>
  );
}

export default Create;

import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.css";

const Edit = () => {
  const { id } = useParams();
  const [student, setData] = useState([null]);
  const navigate = useNavigate();
  //console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `https://students-backend-bb8k.onrender.com/student/${id}`;
        const options = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(apiUrl, options);
        if (response.ok) {
          const data = await response.json();
          console.log(data[0]);
          return setData(data[0]);
        }
        return console.log("Error fetching data");
      } catch (error) {
        console.log(`Message:${error}`);
      }
    };
    fetchData();
  }, [id]);

  function handleChange(event) {
    setData({ ...student, [event.target.name]: event.target.value });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(student);
    if (!student.name || !student.email || !student.age || !student.gender) {
      return console.log("all fields are required");
    }

    try {
      const apiUrl = `https://students-backend-bb8k.onrender.com/edit/${id}`;
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(student),
      };
      const response = await fetch(apiUrl, options);
      if (response.ok) {
        const data = await response.json();
        setData({ name: "", email: "", age: "", gender: "" });
        console.log(data);
        return navigate("/");  
      }
      return console.log("Error fetching data");
    } catch (err) {
      console.log(`Error:${err}`);
    }
  }

  return (
    <div className="form-container">
      <h1>User {id}</h1>

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
        <div className="d-flex flex-row justify-content-around">
          <Link to="/">
            <button type="submit" className="btn-save">
              Back
            </button>
          </Link>

          <button type="submit" className="btn-save">
            Save Edits
          </button>
        </div>
      </form>
    </div>
  );
};

export default Edit;

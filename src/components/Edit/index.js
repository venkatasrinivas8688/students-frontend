import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./index.css";

const Edit = () => {
  const { id } = useParams();
  const [student, setData] = useState([null]);
  const navigate = useNavigate();
  console.log(id);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://students-backend-nq8g.onrender.com/student/${id}`
        );

        setData(response.data[0]);
        console.log(response.data[0]);
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
      const apiurl = `https://students-backend-nq8g.onrender.com/edit/${id}`;
      const response = await axios.post(apiurl, student);
      console.log(response.data);
      setData({ name: "", email: "", age: "", gender: "" });
      navigate("/");
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

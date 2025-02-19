import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./index.css";
const Read = () => {
  const { id } = useParams();
  const [student, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/student/${id}`);
        setData(response.data[0]); // Directly set response data
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  if (!student) {
    return <p>Loading student details...</p>;
  }

  return (
    <div className="user-container">
      <div className="header">
        <h2>Users</h2>
        <Link to="/" className="btn-back">
          Back
        </Link>
      </div>

      <table className="user-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Gender</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          <tr key={student.id}>
            <td>{student.id}</td>
            <td>{student.name}</td>
            <td>{student.email}</td>
            <td>{student.gender}</td>
            <td>{student.age}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Read;

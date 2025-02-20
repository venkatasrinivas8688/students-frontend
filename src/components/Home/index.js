import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (deleted) {
          setDeleted(false);
        }
        const response = await fetch(
          "https://students-backend-nq8g.onrender.com/students"
        );
        const result = await response.json();
        setData(result);
        console.log(result);
      } catch (error) {
        console.log(`Message:${error}`);
      }
    };
    fetchData();
  }, [deleted]);

  async function handleDelete(id) {
    try {
      await axios.delete(
        `https://students-backend-nq8g.onrender.com/delete/${id}`
      );
      setDeleted(true);
    } catch (err) {
      console.log(`error:${err}`);
    }
  }
  return (
    <div className="container-fluid bg-primary vh-100 vw-100 p-4">
      <h1 className="text-white text-center">Students</h1>

      <div className="d-flex justify-content-end my-3">
        <Link className="btn btn-success" to="/create">
          Add Student
        </Link>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-bordered table-hover bg-white">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {data && data.length > 0 ? (
              data.map((student) => (
                <tr key={student.id}>
                  <td>{student.id}</td>
                  <td>{student.name}</td>
                  <td>{student.email}</td>
                  <td>{student.age}</td>
                  <td>{student.gender}</td>
                  <td>
                    <Link
                      className="btn btn-success mx-2"
                      to={`/read/${student.id}`}
                    >
                      Read
                    </Link>
                    <Link
                      className="btn btn-primary mx-2"
                      to={`/edit/${student.id}`}
                    >
                      Edit
                    </Link>
                    <button
                      className="btn btn-danger mx-2"
                      onClick={() => handleDelete(student.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No students available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default Home;

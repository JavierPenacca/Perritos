import React from "react";
import { Link } from "react-router-dom";
import "./SearchBar.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDog } from "../actions";
import Logo2 from "../assest/Logo-2.jpg";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState("");

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
  }
  function handleSubmit(e) {
    e.preventDefault();
    dispatch(getNameDog(name));
  }

  return (
    <div className="nav-container">
      <div className="img-container">
        <Link to="/">
          {" "}
          <img src={Logo2} alt="Logo2" />
        </Link>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter dog name..."
          onChange={(e) => handleInputChange(e)}
        />
        <button
          type="submit"
          onClick={(e) => {
            handleSubmit(e);
            setName("");
          }}
        >
          Buscar
        </button>
      </div>
      <Link to="/form">
        <button className="nav-link">Crear una raza de perro</button>
      </Link>
    </div>
  );
}

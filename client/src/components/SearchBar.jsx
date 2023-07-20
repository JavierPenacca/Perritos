import React from "react";
import { Link, useHistory } from "react-router-dom";
import "./SearchBar.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getNameDog } from "../actions";
import Logo2 from "../assest/Logo-2.jpg";

export default function SearchBar() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [name, setName] = useState("");

  const handleInputChange = (e) => {
    setName(e.target.value);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (name.trim() !== "") {
    dispatch(getNameDog(name));
    history.push("/search");
    setName("");
    }
  };

  return (
    <div className="nav-container">
      <div className="img-container">
        <Link to="/">
          <img src={Logo2} alt="Logo2" />
        </Link>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter dog name..."
            value={name}
            onChange={handleInputChange}
          />
          <button type="submit" >Buscar</button>
        </form>
      </div>
      <Link to="/form">
        <button className="nav-link">Crear una raza de perro</button>
      </Link>
    </div>
  );
}

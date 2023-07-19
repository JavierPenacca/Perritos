import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { postDog, getTemperaments } from "../actions/index";
import { useDispatch, useSelector } from "react-redux";
import "./Form.css";
import Footer from "./Footer";

function validate(input) {
  let errors = {};
  if (!input.name) {
    errors.name = "Se requiere un nombre";
  }
  if (!input.heightMin) {
    errors.heightMin = "Se necesita una altura mínima";
  }
  if (!input.heightMax) {
    errors.heightMax = "Se necesita una altura máxima";
  }
  if (!input.weightMin) {
    errors.weightMin = "Se necesita un peso mínimo";
  }
  if (!input.weightMax) {
    errors.weightMax = "Se necesita un peso máximo";
  }
  if (!input.life_span) {
    errors.life_span = "Se necesita el periodo de vida del perro";
  }
  if (!input.image) {
    errors.image = "Se requiere una imagen para este perro";
  }
  if (!input.temperament || input.temperament.length === 0) {
    errors.temperament = "Debe seleccionar al menos 1 temperamento";
  }
  return errors;
}

export default function Form() {
  const dispatch = useDispatch();
  const history = useHistory();
  const reduxTemperaments = useSelector((state) => state.temperaments);
  const [errors, setErrors] = useState({});
  const [input, setInput] = useState({
    name: "",
    heightMin: "",
    heightMax: "",
    weightMin: "",
    weightMax: "",
    life_span: "",
    image: "/assets/placeholder_dog.png",
    temperament: [],
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value,
    }));
    // validate((prevInput) => ({
    //   ...prevInput,
    //   [name]: value,
    // }));
  }

  function handleSelect(e) {
    const selectedTemperament = e.target.value;
    // console.log(selectedTemperament);
    // console.log("----");
    // console.log(input.temperament);
    setInput((prevInput) => ({
      ...prevInput,
      temperament: [...prevInput.temperament, selectedTemperament],
    }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate(input);
    if (Object.keys(validationErrors).length === 0) {
      dispatch(postDog(input));
      alert("Perro creado!!");
      setInput({
        name: "",
        heightMin: "",
        heightMax: "",
        weightMin: "",
        weightMax: "",
        life_span: "",
        image: "",
        temperament: [],
      });
      history.push("/home");
    } else {
      setErrors(validationErrors);
    }
  }

  function handleDelete(el) {
    setInput((prevInput) => ({
      ...prevInput,
      temperament: prevInput.temperament.filter((temp) => temp !== el),
    }));
  }

  useEffect(() => {
    dispatch(getTemperaments());
  }, [dispatch]);

  return (
    <div>
      <Link to="/home">
        <button className="detail-container-button">Volver</button>
      </Link>
      <div className="contenedor-completo">
        <h1 className="fondo-verde">Crea tu perro!!</h1>
        <form className="fondo-verde" onSubmit={handleSubmit}>
          <div>
            <button className="detail-container-button" type="submit">
              Crear Perro
            </button>
          </div>
          <label>Nombre: </label>
          <input
            type="text"
            value={input.name}
            name="name"
            onChange={handleChange}
          />
          {errors.name && <p className="error">{errors.name}</p>}
          <label>Altura mínima: </label>
          <input
            type="number"
            value={input.heightMin}
            name="heightMin"
            onChange={handleChange}
          />
          {errors.heightMin && <p className="error">{errors.heightMin}</p>}
          <label>Altura máxima: </label>
          <input
            type="number"
            value={input.heightMax}
            name="heightMax"
            onChange={handleChange}
          />
          {errors.heightMax && <p className="error">{errors.heightMax}</p>}
          <label>Peso mínimo: </label>
          <input
            type="number"
            value={input.weightMin}
            name="weightMin"
            onChange={handleChange}
          />
          {errors.weightMin && <p className="error">{errors.weightMin}</p>}
          <label>Peso máximo: </label>
          <input
            type="number"
            value={input.weightMax}
            name="weightMax"
            onChange={handleChange}
          />
          {errors.weightMax && <p className="error">{errors.weightMax}</p>}
          <label>Imagen: </label>
          <input
            type="text"
            value={input.image}
            name="image"
            onChange={handleChange}
          />
          {errors.image && <p className="error">{errors.image}</p>}
          <label>Años de vida: </label>
          <input
            type="number"
            value={input.life_span}
            name="life_span"
            onChange={handleChange}
          />
          {errors.life_span && <p className="error">{errors.life_span}</p>}

          <select onChange={handleSelect}>
            <option value="">Seleccione un temperamento</option>
            {reduxTemperaments.map((temp) => (
              <option key={temp.name} value={temp.name}>
                {temp.name}
              </option>
            ))}
          </select>
          <div className="temp-cent">
            {input.temperament.map((el) => (
              <div className="divTemp" key={el}>
                <p>{el}</p>
                <button className="botonX" onClick={() => handleDelete(el)}>
                  x
                </button>
              </div>
            ))}
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

import React from "react";
import { Link } from "react-router-dom";
// importo los hooks de react
import { useState, useEffect } from "react";
// importo los hooks de react-redux
import { useDispatch, useSelector } from "react-redux";
// importo las actions que voy a usar en éste componente
import {
  getDogs,
  // filterDogsByTemperament,
  filterCreated,
  orderByName,
  orderByWeightMax,
} from "../actions";
import Card from "../components/Card";
import Paginado from "../components/Pagination";
import SearchBar from "../components/SearchBar";
import Footer from "../components/Footer";
import "../components/Home.css";
// import Max2 from "../assest/Max2.png";

//Aquí comienza mi componente
export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const [orden, setOrden] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage, setDogsPerPage] = useState(200);
  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
  // const apiUrl = "/api/data";
  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
  }

  useEffect(() => {
    dispatch(getDogs());
  }, [dispatch]);

  function handleClick(ev) {
    ev.preventDefault();
    dispatch(getDogs());
  }

  function handleSort(e) {
    e.preventDefault();
    dispatch(orderByName(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }
  function handleSort2(e) {
    e.preventDefault();
    dispatch(orderByWeightMax(e.target.value));
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`);
  }

  // function handleFilteredTemperament(event) {
  //   dispatch(filterDogsByTemperament(event.target.value));
  // }

  function handleFilteredCreated(event) {
    dispatch(filterCreated(event.target.value));
  }

  return (
    <div className="container">
      <SearchBar />
      <div className="header">
        <div>
          <button
            onClick={(ev) => {
              handleClick(ev);
            }}
          >
            Volver a cargar todos los perros
          </button>
          <label>Ordenar por nombre</label>
          <select onChange={(e) => handleSort(e)}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>
          <label>Ordenar por peso</label>
          <select onChange={(e) => handleSort2(e)}>
            <option value="asc">Ascendente</option>
            <option value="desc">Descendente</option>
          </select>

          {/* <label>Ordenar por temperamento</label>
          <select onChange={(event) => handleFilteredTemperament(event)}>
            {allDogs.temperament.map((el) => (
              <div className="divTemp" key={el}>
                <p>{el}</p>
              </div>
            ))}
          </select> */}

          <label>Origen</label>
          <select onChange={(event) => handleFilteredCreated(event)}>
            <option value="All">Todos</option>
            <option value="Api">Externos</option>
            <option value="Bdd">Locales</option>
          </select>
        </div>
      </div>

      <div className="header2">
        <Paginado
          // apiUrl={apiUrl}
          dogsPerPage={dogsPerPage}
          allDogs={allDogs.length}
          paginado = {paginado}
          // currentPage={currentPage}
        />
      </div>

      <form className="form-container">
        <div className="data-container">
          {currentDogs?.map((el) => {
            return (
              <div className="cards" key={el.id}>
                <Link to={"/home/" + el.id}>
                  <Card
                    name={el.name}
                    weightMin={el.weightMin}
                    weightMax={el.weightMax}
                    image={
                      el.image ? el.image : <img src="../assest/Max2.png" />
                    }
                    temperament={el.temperament}
                  />
                </Link>
              </div>
            );
          })}
        </div>
      </form>
      <Footer />
    </div>
  );
}

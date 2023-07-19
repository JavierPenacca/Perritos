import React from "react";
import { Link } from "react-router-dom";
import './Card.css'

const API_URL = "https://api.thedogapi.com/v1/breeds";
const placeholder = "../assets/placeholder_dog.png";

export default function Card({
  id,
  name,
  weightMin,
  weightMax,
  image,
  temperament,
  isLocalData // Agrega esta prop para indicar si los datos provienen de la base de datos local
}) {
  let weightTxt = " - - ";
  if (weightMin && weightMax) {
    weightTxt = weightMin + " - " + weightMax + " Kg";
  } else {
    if (weightMin || weightMax) {
      weightTxt = (weightMin ? weightMin : weightMax) + " Kg";
    }
  }

  const imageUrl = isLocalData ? image : API_URL + image;

  return (
    <div className="card">
      <Link to={`/detail/${id}`}>
        <div className="card-header">
          <img src={imageUrl ?? placeholder} alt={name} loading="lazy" />
        </div>
        <div className="card-body">
          <h3>{name}</h3>
          <p>
            {temperament &&
              temperament
                .slice(0, 3)
                .map((t, i) => <span key={t}>{i === 2 ? t : t + ", "}</span>)}
          </p>
        </div>
        <div className="bottom">
          <span>WEIGHT: {weightTxt}</span>
        </div>
      </Link>
    </div>
  );
}

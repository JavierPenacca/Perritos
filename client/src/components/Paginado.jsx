import React from "react";
import '../components/paginado.css'

export default function Paginado({ dogsPerPage, allDogs, paginado }) {
  const pageNumbers = [];

  for (let i = 0; i <= Math.ceil(allDogs/dogsPerPage); i++) {
    pageNumbers.push(i+1);
  }
  return (
    <nav>
      <ul className="paginado">
        {pageNumbers &&
          pageNumbers.map((number) => (
            <li className="number" key={number}>
              <a onClick={() => paginado(number)}>{number}</a>;
            </li>
          ))}
      </ul>
    </nav>
  );
}

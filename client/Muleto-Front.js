//ACTIONS
import axios from 'axios';

export function getDogs() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/dogs", {
        });
        return dispatch({
            type: "GET_DOGS",
            payload: json.data,
        })
    }
}

export function getNameDog(name) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/dogs?name=" + name);
            return dispatch({
                type: "GET_NAME_DOG",
                payload: json.data[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

export function orderByName(payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export function filterDogsByTemperament(payload) {
    return {
        type: 'FILTER_BY_TEMPERAMENT',
        payload
    }
}

export function filterCreated(payload) {
    return {
        type: "FILTER_CREATED",
        payload
    }
}

export function getTemperaments() {
    return async function (dispatch) {
        var info = await axios("http://localhost:3001/temperaments", {

        });
        return dispatch({ type: "GET_TEMPERAMENTS", payload: info.data });
    };
}
export function postDog(payload) {
    return async function (dispatch) {
        const response = await axios.post("http://localhost:3001/dogs", payload);
        return response;
    }
};

export function getDetail(id) {
    return async function (dispatch) {
        try {
            var json = await axios.get("http://localhost:3001/dogs/" + id);
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data[0]
            })
        } catch (error) {
            console.log(error);
        }
    }
}

//REDUCER

const initialState = {
    dogs: [],
    Detail: [],
    temperaments: [],
    allDogs: []
}
function rootReducer(state = initialState, action) {
    switch (action.type) {
        case 'GET_DOGS':
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case 'FILTER_BY_TEMPERAMENT':
            const allDogs = state.allDogs
            const temperamentFiltered = action.payload === 'All' ? allDogs : allDogs.filter(el => el.temperament === action.payload)
            return {
                ...state,
                dogs: temperamentFiltered
            }
        case 'POST_DOG':
            return {
                ...state,
            }
        case 'FILTER_CREATED':
            const createdFilter = action.payload === 'Bdd' ? state.allDogs.filter(el => el.createdBd) : state.allDogs.filter(el => !el.createdBd)
            return {
                ...state,
                dogs: createdFilter
            }
        case "GET_NAME_DOG":
            return {
                ...state,
                dogs: action.payload
            }
        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload
            }
        case "ORDER_BY_NAME":
            let sortedArr = action.payload === 'asc' ? state.dogs.sort(function (a, b) {
                if (a.name > b.name) {
                    return 1;
                }
                if (b.name > a.name) {
                    return -1;
                }
                return 0;
            }) :
                state.dogs.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0;
                });
            return {
                ...state,
                dogs: sortedArr
            }

        case "GET_DETAILS":
            return{
                ...state,
                detail: action.payload
            }

        default:
            return state;
    }
}
export default rootReducer;

//Card.js
import React from "react";
import { Link } from "react-router-dom";
import './Card.css'

export default function Card({
  id,
  name,
  weightMin,
  weightMax,
  image,
  temperament,
}) {
  let weightTxt = " - - ";
  if (weightMin && weightMax) {
    weightTxt = weightMin + " - " + weightMax + " Kg";
  } else {
    if (weightMin || weightMax) {
      weightTxt = (weightMin ? weightMin : weightMax) + " Kg";
    }
  }
  const placeholder = "../assets/placeholder_dog.png";
  return (
    <div className="card">
      <Link to={`/detail/${id}`}>
        <div className="card-header">
          <img src={image ?? placeholder} alt={name} loading="lazy" />
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

//Card.css

// .card {
//     margin: 10px;
//     background-color: #fff;
//     border-radius: 5px;
//     box-shadow: 0 2px 20px rgba(0, 0, 0, 0.2);
//     overflow: hidden;
//     width: 250px;
//     height: 360px;
//   }
  
//   .card-header img {
//     width: 100%;
//     height: 200px;
//     object-fit: cover;
//     object-position: top;
//   }
  
//   .card-body {
//     height: 70px;
//     display: flex;
//     flex-direction: column;
//     justify-content: center;
//     align-items: flex-start;
//     padding: 10px;
//     min-height: 10px;
//   }
  
//   .card-body h3 {
//     margin: 0 0 5px;
//   }
  
//   .card-body p {
//     font-family: "Roboto";
//     font-size: 13px;
//     margin: 0 0 15px;
//     color: #555;
//   }
  
//   .bottom {
//     width: 100%;
//     min-height: 30px;
//     color: white;
//     background-color: #6dc264;
//     display: inline-flex;
//     justify-content: center;
//     align-items: center;
//   }
  
//   .bottom span {
//     font-size: 12px;
//     margin: 0;
//     padding: 0 8px 0 0;
//     text-transform: uppercase;
//   }

//Paginado.jsx

import React from "react";
import { LeftArrow, RightArrow, DoubleLeftArrow, DoubleRightArrow } from "../assest/SvgIcons";

import './paginado.css'

export default function Paginado({
  handleChange,
  totalItems,
  currentPage,
  countPerPage,
}) {
  const pagesCount = Math.ceil(totalItems / countPerPage); 

  if (pagesCount === 1) return null;

  let firstNumber = 1;
  let lastNumber = 1;
  const adicionalNumbers = 2;
  let countOfNumbers = adicionalNumbers * 2 + 1;

  if (countOfNumbers >= pagesCount) {
    countOfNumbers = pagesCount;

  } else {
    firstNumber = Math.max(currentPage - adicionalNumbers, 1);
    lastNumber = Math.min(currentPage + adicionalNumbers, pagesCount);

    if (lastNumber === pagesCount) {
      firstNumber += lastNumber - firstNumber - adicionalNumbers * 2;
    }
  }

  const pageNumbers = new Array(countOfNumbers)
    .fill()
    .map((_, i) => i + firstNumber);

  return (
    <ul className="pagination-container">
      <li
        onClick={() => handleChange(1)}
        className={currentPage === 1 ? "disabled" : ""}
        title="First Page"
      >
        <DoubleLeftArrow />
      </li>
      <li
        onClick={() => handleChange(currentPage - 1)}
        className={currentPage === 1 ? "disabled" : ""}
        title="Previous"
      >
        <LeftArrow />
      </li>

      {pageNumbers.map((number) => {
        return (
          <li
            key={number}
            className={currentPage === number ? "selected" : ""}
            onClick={() => handleChange(number)}
          >
            {number}
          </li>
        );
      })}

      <li
        onClick={() => handleChange(currentPage + 1)}
        className={pagesCount === currentPage ? "disabled" : ""}
        title="Next"
      >
        <RightArrow />
      </li>
      <li
        onClick={() => handleChange(pagesCount)}
        className={pagesCount === currentPage ? "disabled" : ""}
        title="Last Page"
      >
        <DoubleRightArrow />
      </li>
    </ul>
  );
}

//Paginado.css

// .pagination-container {
//     width: 100%;
//     display: flex;
//     justify-content: center;
//     list-style-type: none;
//     padding: 0;
//     margin: 15px;
//   }
  
//   .pagination-container li {
//     padding: 0 12px;
//     height: 32px;
//     text-align: center;
//     margin: auto 4px;
//     color: rgba(0, 0, 0, 0.87);
//     display: flex;
//     box-sizing: border-box;
//     align-items: center;
//     letter-spacing: 0.01071em;
//     border-radius: 16px;
//     line-height: 1.43;
//     font-size: 13px;
//     min-width: 32px;
//     cursor: pointer;
//   }
  
//   .pagination-container li:hover {
//     background-color: rgba(0, 0, 0, 0.04);
//   }
  
//   .pagination-container li.selected {
//     background-color: rgba(0, 0, 0, 0.2);
//   }
  
//   .pagination-container li.disabled {
//     pointer-events: none;
//     color: rgba(0, 0, 0, 0.43);
//     cursor: default;
//   }
          {/* <div>
          <label>Años de vida min.: </label>
          <input
            type="number"
            value={input.lifeSpanMin}
            name="lifeSpanMin"
            onChange={(e) => handleChange(e)}
          />
        </div>
        <div>
          <label>Años de vida max.: </label>
          <input
            type="number"
            value={input.lifeSpanMax}
            name="lifeSpanMax"
            onChange={(e) => handleChange(e)}
          />
        </div> */}
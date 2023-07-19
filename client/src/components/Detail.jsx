import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getDetail } from "../actions/index";
import Footer from "./Footer";
import "./Detail.css";

export default function Detail(props) {
  const dispatch = useDispatch();
  const myDog = useSelector((state) => state.detail);

  useEffect(() => {
    dispatch(getDetail(props.match.params.id));
  }, [dispatch, props.match.params.id]);

  return (
    <div className="detail-container">
      {myDog.length > 0 ? (
        <div>
          <h1>{myDog[0].name}</h1>
          <img
            src={myDog[0].img ? myDog[0].img : myDog[0].image}
            alt=""
            width="500px"
            height="700px"
          />

          <h4>
            Temperamentos:{" "}
            {!myDog[0].createdInDb
              ? myDog[0].temperament + " "
              : myDog[0].temperament.map((el) => el.name + " ")}{" "}
          </h4>
        </div>
      ) : (
        <p className="loading">Loading...</p>
      )}
      <Link to="/home">
        <button>Volver</button>
      </Link>
      <Footer/>
    </div>
  );
}

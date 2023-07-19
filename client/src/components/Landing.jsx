import React from "react";
import { Link } from "react-router-dom";
import "./Landing.css";
// import Fondo from "../assest/Fondo.jpg";
import Logo from "../assest/Logo.png";
// import { Github, Linkedin } from "../img/SvgIcons";
import Footer from "./Footer";

export default function Landing() {
  return (
    <div className="container">
      <Link to="/home">
        <button className="buttonContainer">Ingresar</button>
      </Link>
      <div className="imageContainer">
        <img src={Logo} alt="Logo" className="landing-logo" />
      </div>
      <Footer/>
    </div>
  );
}

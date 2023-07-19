import React from "react";
import "./Footer.css";
import { Github, Linkedin } from "../img/SvgIcons";

export default function Footer() {
  return (
      <div className="SocialLink">
        <a
          href="https://www.linkedin.com/in/javier-penacca-p%C3%A9rez-228a6529/"
          title="LinkedIn"
          target="_blank"
          rel="noreferrer"
        >
          <Linkedin />
        </a>
        <a>Creado por Javier Penacca Pérez / 2023</a>
        <a
          href="https://github.com/JavierPenacca"
          title="GitHub"
          target="_blank"
          rel="noreferrer"
        >
          <Github />
        </a>
      </div>
  );
}

import React from "react";
import "./Hero.scss";
import { heroPlanet, cloudOne } from "../../assets/images";
import { Button } from "../../components/Button";
import { motion } from "framer-motion";
import { cloudPath } from "./anim";

export const Hero = () => {
  return (
    <section className="hero__section">
      <img className="hero__image" src={heroPlanet} alt="" />
      <motion.img
        initial={{ y: "10%" }}
        animate={{
          x: ["-12%", "5%", "-12%"],
          y: ["-34%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "linear",
        }}
        src={cloudOne}
        alt="White 3d cloud"
        className="cloud__img__small"
      />
      <motion.img
        initial={{ y: "10%" }}
        animate={{
          x: ["-12%", "5%", "-12%"],
          y: [-60],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "linear",
        }}
        src={cloudOne}
        alt="White 3d cloud"
        className="cloud__img__small2"
      />
      <h1 className="hero__h1">Booking Made Easy</h1>
      <div className="hero__btn__container">
        <Button to="/venues" className="primary__btn" arrowFillColor="#f9f5f3">
          Venues
        </Button>
        <Button
          style={{
            "--button-color": "#171717",
            "--button-background": "#f9f5f3",
            // "--button-background": "transparent",
          }}
          arrowFillColor="#171717"
        >
          Venues
        </Button>
      </div>
      <motion.img
        initial={{ y: "10%" }}
        animate={{
          x: ["-12%", "-10%", "-12%"],
          y: [-60],
        }}
        transition={{
          repeat: Infinity,
          duration: 15,
          ease: "linear",
        }}
        src={cloudOne}
        alt="White 3d cloud"
        className="cloud__img"
      />
    </section>
  );
};

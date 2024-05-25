import React, { useLayoutEffect, useRef } from "react";
import "./Hero.scss";
import { heroPlanet, cloudOne } from "../../assets/images";
import { Button } from "../../components/ui/Button";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useUser } from "../../hooks/useStore";
gsap.registerPlugin(ScrollTrigger);

export const Hero = ({}) => {
  const container = useRef(null);
  const title = useRef(null);
  const buttonContainer = useRef(null);
  const heroImage = useRef(null);
  const user = useUser(); // Get the user data from Zustand store
  const userName = user ? user.name : null;

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          target: container.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      tl.to(title.current, { y: -500 }, 0);
      tl.to(buttonContainer.current, { y: -350 }, 0);
      tl.to(heroImage.current, { y: 50 }, 0);
    });

    return () => context.revert();
  }, []);
  return (
    <section className="hero__section" ref={container}>
      <img className="hero__image" src={heroPlanet} alt="" ref={heroImage} />
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
      <h1 className="hero__h1" ref={title}>
        Booking Made Easy
      </h1>
      <div className="hero__btn__container" ref={buttonContainer}>
        <Button to="/venues" className="primary__btn" arrowFillColor="#f9f5f3">
          Venues
        </Button>
        <Button
          to={`/profiles/${userName}`}
          style={{
            "--button-color": "#171717",
            "--button-background": "#f9f5f3",
            // "--button-background": "transparent",
            // fontSize: "12px",
            gap: "1.5rem",
          }}
          arrowFillColor="#171717"
        >
          Profile
        </Button>
      </div>
      <motion.img
        initial={{ y: "10%" }}
        animate={{
          x: ["-12%", "-8%", "-12%"],
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

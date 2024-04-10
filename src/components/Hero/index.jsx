import "./Hero.scss";
import heroImage from "../../assets/images/hero-planet.png";

export const Hero = () => {
  return (
    <section className="hero__section">
      <img src={heroImage} alt="" />
    </section>
  );
};

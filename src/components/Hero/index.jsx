import "./Hero.scss";
import { heroPlanet, cloudOne } from "../../assets/images";
import { Button } from "../../components/Button";

export const Hero = () => {
  return (
    <section className="hero__section">
      <img className="hero__image" src={heroPlanet} alt="" />
      <h1 className="hero__h1">Booking Made Easy</h1>
      <div className="hero__btn__container">
        <Button to="/venues" className="primary__btn" arrowColor="#FFF">
          Venues
        </Button>
        <Button
          style={{
            "--button-color": "#171717",
            "--button-background": "#f9f5f3",
          }}
          arrowColor="#000000"
        >
          List
        </Button>
      </div>
      {/* <img src={cloudOne} alt="" /> */}
    </section>
  );
};

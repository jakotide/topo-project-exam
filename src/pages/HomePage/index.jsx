import React, { useEffect, useState } from "react";
import { Hero, HomeVenuesSection } from "../../components";
import { Preloader } from "../../components/ui";
import Lenis from "lenis";
import "./HomePage.scss";

export const HomePage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis();
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 3000);
  }, []);

  return (
    <>
      {isLoading && <Preloader isLoading={isLoading} />}

      <>
        <Hero />
        <HomeVenuesSection />
      </>
    </>
  );
};

import "./HomePage.scss";
import { Hero, HomeVenuesSection } from "../../components";
// import { useFetchApiKey } from "../../hooks/useFetchApiKey";
// import { useEffect } from "react";

export const HomePage = () => {
  // const { error } = useFetchApiKey();

  // useEffect(() => {
  //   if (error) {
  //     console.error("API Key Error:", error);
  //   }
  // }, [error]);
  return (
    <>
      <Hero />
      <HomeVenuesSection />
    </>
  );
};

import Scroll from "react-scroll";
import AboutMe from "../AboutMe/AboutMe";
import AboutProject from "../AboutProject/AboutProject";
import Footer from "../Footer/Footer";
import Header from "../Header/Header";
import Portfolio from "../Portfolio/Portfolio";
import Promo from "../Promo/Promo";
import Techs from "../Techs/Techs";

export default function Main() {
  return (
    <>
      <Header />
      <main className="main">
        <Promo />
        <Scroll.Element name="about-project">
          <AboutProject />
        </Scroll.Element>
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>

  );
};

import "./Contact.scss";

export const Contact = () => {
  return (
    <div className="contact__container">
      <h1 className="contact__h1">Contact Us</h1>
      <section className="contact__grid">
        <div className="hello__box">
          <div className="contact__box__header">Hello</div>
          <div>
            <p>Topostreet123,</p>
            <p>Oslo, Norway</p>
          </div>
          <div>
            <p className="write__us">Write us at</p>
            <p>hello@topo.com</p>
          </div>
        </div>
        <div className="socials__box">
          <div className="contact__box__header">Socials</div>
          <p>Facebook</p>
          <p>Twitter</p>
          <p>Instagram</p>
        </div>
        <div className="faq__box">
          <p>FAQ</p>
        </div>
        <div className="international__box">
          <p className="contact__box__header">International</p>
          <div>
            <p>Europe:</p>
            <div className="contact__country__number">+47 (113) 233333</div>
          </div>
          <div>
            <p>North America:</p>
            <div className="contact__country__number">+55 (232) 535334</div>
          </div>
          <div>
            <p>South America:</p>
            <div className="contact__country__number">+54 (313) 667766</div>
          </div>
          <div>
            <p>Asia:</p>
            <div className="contact__country__number">+10 (223) 553333</div>
          </div>
          <div>
            <p>Africa:</p>
            <div className="contact__country__number">+11 (213) 551333</div>
          </div>
        </div>
        <div className="career__box">
          <div className="contact__box__header">Career</div>
          <p>
            We're always on the lookout for talented individuals who are eager
            to contribute their skills and grow with us. Email us at
            jobs@topo.com.
          </p>
        </div>
        <div className="terms__box">
          <div className="contact__box__header">Terms Of Service</div>
          <p>Read here</p>
        </div>
      </section>
    </div>
  );
};

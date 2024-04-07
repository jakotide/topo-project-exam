import "./Footer.scss";

export const Footer = ({ className }) => {
  return (
    <footer className={className}>
      <div className="footer__body">
        <div className="footer__upper">
          <div className="footer__left">
            <div className="footer__logo">TOPO</div>
            <form action="" className="footer__newsletter">
              <label htmlFor="email">Subscribe to our newsletter!</label>
              <div>
                <input type="email" id="email" placeholder="Your Email ..." />
                <button>Subscribe</button>
              </div>
            </form>
          </div>
          <div className="footer__right">
            <div className="footer__list">
              <div>Socials</div>
              <p>Facebook</p>
              <p>Twitter</p>
              <p>Instagram</p>
            </div>
            <div className="footer__list">
              <div>About Us</div>
              <div>Contact</div>
            </div>
            <div className="footer__list">
              <div>Career</div>
              <div>FAQ</div>
            </div>
          </div>
        </div>
        <div className="footer__lower">
          <div>Jakob Tidemand</div>
          <div>&#169;2024</div>
        </div>
      </div>
    </footer>
  );
};

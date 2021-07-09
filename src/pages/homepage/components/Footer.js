import React, { useState } from "react";
import "../css/Footer.css";
import { Link } from "react-router-dom";
import EmailServices from "../../../apis/EmailServices";
import { MAIL_MES, MAIL_SUB } from "../../../config";

function Footer() {
  const [note, setNote] = useState({});
  const [mailAddress, setMailAddress] = useState("");

  const mailer = (e) => {
    

    let data = JSON.stringify({
      subject: MAIL_SUB,
      message: MAIL_MES,
      to: mailAddress,
    });

    console.log(mailAddress);

    EmailServices.sendEmailDefault(data)
      .then((response) => {
        setNote(response);
        console.log(note);
      })
      .catch((e) => {
        console.log(e.response);
      });

    setMailAddress('');
    e.preventDefault();
  };

  return (
    <div className="footer-container">
      <section className="footer-subscription">
        <p className="footer-subscription-heading">
          Join the Adventure newsletter to receive our best recipes and cooking tips
        </p>
        <p className="footer-subscription-text">
          You can unsubscribe at any time.
        </p>
        <div className="input-areas">
          <form onSubmit={mailer}>
            <input
              className="footer-input"
              name="email"
              type="email"
              placeholder="Your Email"
              value={mailAddress}
              onChange={(e) => setMailAddress(e.target.value)}
            />
            {/* <Button buttonStyle="btn--outline">Subscribe</Button> */}
            <button className="btn--outline" type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </section>
      <div className="footer-links">
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>About Us</h2>
            <Link to="/sign-up">How it works</Link>
            <Link to="/">Testimonials</Link>
            <Link to="/">Careers</Link>
            <Link to="/">Investors</Link>
            <Link to="/">Terms of Service</Link>
          </div>
          <div className="footer-link-items">
            <h2>Contact Us</h2>
            <Link to="/">Contact</Link>
            <Link to="/">Support</Link>
            <Link to="/">Destinations</Link>
            <Link to="/">Sponsorships</Link>
          </div>
        </div>
        <div className="footer-link-wrapper">
          <div className="footer-link-items">
            <h2>Videos</h2>
            <Link to="/">Submit Video</Link>
            <Link to="/">Ambassadors</Link>
            <Link to="/">Agency</Link>
            <Link to="/">Influencer</Link>
          </div>
          <div className="footer-link-items">
            <h2>Social Media</h2>
            <Link to="/">Instagram</Link>
            <Link to="/">Facebook</Link>
            <Link to="/">Youtube</Link>
            <Link to="/">Twitter</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;

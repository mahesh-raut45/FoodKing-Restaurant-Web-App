import { Component } from "react";
import styles from "./DeliveryBanner.module.css";
import { Button } from "../Button/Button";
import { TbTruckDelivery } from "react-icons/tb";
import navlogo from "../../photos/navlogo.jpg";
import { Link } from "react-router-dom";

class DeliveryBanner extends Component {
  render() {
    return (
      <>
        <div className={styles.container}>
          <div className={styles.background_banner}>
            <div className={styles.title}>
              <span className={styles.small}>crispy, every bite taste</span>
              <h2 className={styles.title_heading}>
                30 minutes fast <br />{" "}
                <span className={styles.yellow}>delivery</span> challage
              </h2>
            </div>
            <div>
              <Button
                background={true}
                icon={<TbTruckDelivery />}
                text="Order Now"
              />
            </div>
            <div className={styles.arrow_shape}>
              <img
                src="https://foodking-react.vercel.app/assets/img/shape/arrow-shape.png"
                alt="arrow"
              />
            </div>
            <div className={styles.delivery_man}>
              <img
                src="https://foodking-react.vercel.app/assets/img/delivery-man.png"
                alt="delivery man"
              />
            </div>
            <div className={styles.frame_shape}>
              <img
                src="https://foodking-react.vercel.app/assets/img/shape/frame.png"
                alt="drops"
              />
            </div>
          </div>
        </div>
        <div className={styles.footer_section}>
          <div className={styles.footer_container}></div>
          <div className={styles.footer_bottom}></div>
        </div>

        {/* footer */}

        <footer className={styles.footer}>
          <div className={`${styles.container} ${styles.containerRow}`}>
            <div>
              <a href="#" className={styles.logoWrapper}>
                <div className={styles.logoContainer}>
                  <img className={styles.logoIcon} src={navlogo} alt="Logo" />
                </div>
                <span className={styles.brandName}>FoodKing</span>
              </a>

              <Link to={"/contact-us"}>
                <p className={styles.contact_us}>CONTACT US</p>
              </Link>
            </div>

            <div className={`${styles.grid} ${styles.gridLg}`}>
              <div className={styles.linkSection}>
                <h3 className={styles.heading}>My account</h3>
                <ul className={styles.linkList}>
                  <li>
                    <a className={styles.link} href="#">
                      My Profile
                    </a>
                  </li>
                  <li>
                    <a className={styles.link} href="#">
                      My Order History
                    </a>
                  </li>
                  <li>
                    <a className={styles.link} href="#">
                      Shopping Cart
                    </a>
                  </li>
                  <li>
                    <a className={styles.link} href="#">
                      FAQ
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles.linkSection}>
                <h3 className={styles.heading}>Company</h3>
                <ul className={styles.linkList}>
                  <li>
                    <a className={styles.link} href="#">
                      Privacy
                    </a>
                  </li>
                  <li>
                    <a className={styles.link} href="#">
                      Terms of Service
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles.linkSection}>
                <h3 className={styles.heading}>Developers</h3>
                <ul className={styles.linkList}>
                  <li>
                    <a className={styles.link} href="#">
                      Public API
                    </a>
                  </li>
                  <li>
                    <a className={styles.link} href="#">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a className={styles.link} href="#">
                      Guides
                    </a>
                  </li>
                </ul>
              </div>

              <div className={styles.linkSection}>
                <h3 className={styles.heading}>Social media</h3>
                <div className={styles.social}>
                  <a href="#" title="Facebook">
                    <svg
                      className={styles.socialIcon}
                      viewBox="0 0 32 32"
                      fill="currentColor"
                    >
                      {/* <path d="..." /> */}
                    </svg>
                  </a>
                  <a href="#" title="Twitter">
                    <svg
                      className={styles.socialIcon}
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      {/* <path d="..." /> */}
                    </svg>
                  </a>
                  <a href="#" title="Instagram">
                    <svg
                      className={styles.socialIcon}
                      viewBox="0 0 32 32"
                      fill="currentColor"
                    >
                      {/* <path d="..." /> */}
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.copyright}>
            © 1968 Company Co. All rights reserved.
          </div>
        </footer>
      </>
    );
  }
}

export { DeliveryBanner };

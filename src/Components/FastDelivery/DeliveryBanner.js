import { Component } from "react";
import styles from "./DeliveryBanner.module.css";
import { Button } from "../Button/Button";
import { TbTruckDelivery } from "react-icons/tb";

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
      </>
    );
  }
}

export { DeliveryBanner };

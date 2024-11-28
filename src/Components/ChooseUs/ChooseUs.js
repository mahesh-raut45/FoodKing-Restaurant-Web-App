import { Component } from "react";
import styles from "./ChooseUs.module.css";
import { MdFastfood } from "react-icons/md";
import { GiBowlOfRice } from "react-icons/gi";
import { TbTruckDelivery } from "react-icons/tb";

class ChooseUs extends Component {
  render() {
    return (
      <>
        <div>
          <h1 className={styles.main_heading}>WHY US ?</h1>
        </div>
        <div className={styles.container}>
          <div className={styles.cover_image}>
            <div className={styles.row}>
              <div className={styles.column}>
                <div className={styles.single_food_icon}>
                  <div className="icon">
                    <MdFastfood className={styles.food_icon} />
                  </div>
                  <div className="content">
                    <h4 className={styles.content_heading}>
                      super quality food
                    </h4>
                    <p>
                      A team of dreamers and doers building unique interactive
                      music and art
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.single_food_icon}>
                  <div className="icon">
                    <GiBowlOfRice className={styles.food_icon} />
                  </div>
                  <div className="content">
                    <h4 className={styles.content_heading}>original recipes</h4>
                    <p>
                      A team of dreamers and doers building unique interactive
                      music and art
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.single_food_icon}>
                  <div className="icon">
                    <TbTruckDelivery className={styles.food_icon} />
                  </div>
                  <div className="content">
                    <h4 className={styles.content_heading}>
                      quick fast delivery
                    </h4>
                    <p>
                      A team of dreamers and doers building unique interactive
                      music and art
                    </p>
                  </div>
                </div>
              </div>
              <div className={styles.column}>
                <div className={styles.single_food_icon}>
                  <div className="icon">
                    <MdFastfood className={styles.food_icon} />
                  </div>
                  <div className="content">
                    <h4 className={styles.content_heading}>100% fresh foods</h4>
                    <p>
                      A team of dreamers and doers building unique interactive
                      music and art
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}

export { ChooseUs };

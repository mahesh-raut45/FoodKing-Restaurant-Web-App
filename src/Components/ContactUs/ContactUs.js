import HeaderComponent from "../HeaderComponent/HeaderComponent";
import styles from "./Contactus.module.css";
import React from "react";

const ContactUs = () => {
  return (
    <>
      <HeaderComponent title="Contact Us" />

      <section className={styles.contactSection}>
        <div className={`${styles.container} ${styles.containerSplit}`}>
          <div className={`${styles.leftCol} ${styles.leftColMd}`}>
            <h1 className={styles.heading}>Get in touch</h1>
            <p className={styles.description}>
              Fill in the form to start a conversation
            </p>
            <div className={styles.contactInfo}>
              <p className={styles.contactItem}>
                <svg
                  className={`${styles.icon} ${styles.iconSm}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Navi Mumbai, India</span>
              </p>
              <p className={styles.contactItem}>
                <svg
                  className={`${styles.icon} ${styles.iconSm}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"></path>
                </svg>
                <span>987654321</span>
              </p>
              <p className={styles.contactItem}>
                <svg
                  className={`${styles.icon} ${styles.iconSm}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>contact@foodking.com</span>
              </p>
            </div>
          </div>

          <form
            action="https://formsubmit.co/mahesharaut@coep.sveri.in"
            method="POST"
            className={`${styles.form} ${styles.formMd}`}
            noValidate
          >
            <label className={styles.label}>
              <span className={styles.labelText}>Full name</span>
              <input
                type="text"
                placeholder="Leroy Jenkins"
                name="name"
                className={styles.input}
              />
            </label>
            <label className={styles.label}>
              <span className={styles.labelText}>Email address</span>
              <input
                type="email"
                name="email"
                placeholder="leroy@jenkins.com"
                className={styles.input}
              />
            </label>
            <label className={styles.label}>
              <span className={styles.labelText}>Message</span>
              <textarea
                rows="3"
                name="textarea"
                className={styles.textarea}
              ></textarea>
            </label>
            <button type="submit" className={styles.button}>
              Submit
            </button>
          </form>
        </div>
      </section>
    </>
  );
};

export { ContactUs };

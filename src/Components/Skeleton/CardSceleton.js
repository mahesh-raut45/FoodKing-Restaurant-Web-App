import React from "react";

export function CardSceleton() {
  const styles = {
    container: {
      width: "300px",
      height: "500px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-evenly",
      borderRadius: "20px",
      padding: "10px",
      gap: "10px",
      backgroundColor: "#f1e1dc",
      position: "relative",
      overflow: "hidden",
    },
    skeleton: {
      backgroundColor: "#e0e0e0",
      borderRadius: "8px",
      animation: "shimmer 1.2s infinite linear",
      background:
        "linear-gradient(to right, #e0e0e0 0%, #f8f8f8 50%, #e0e0e0 100%)",
      backgroundSize: "200% 100%",
    },
    foodItem: {
      width: "270px",
      height: "200px",
      margin: "0 auto",
      borderRadius: "20px",
    },
    btnContainer: {
      display: "flex",
      justifyContent: "center",
    },
    button: {
      width: "80%",
      height: "37px",
    },
    bottomInfo: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "10px",
      padding: "0 20px",
    },
    text: {
      width: "60%",
      height: "20px",
    },
    rating: {
      width: "80%",
      height: "18px",
    },
    shimmerKeyframes: `
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `,
  };

  return (
    <>
      {/* Inject shimmer keyframes globally once */}
      <style>{styles.shimmerKeyframes}</style>
      <div style={styles.container}>
        <div style={{ ...styles.skeleton, ...styles.foodItem }} />
        <div style={styles.btnContainer}>
          <div style={{ ...styles.skeleton, ...styles.button }} />
        </div>
        <div style={styles.bottomInfo}>
          <div style={{ ...styles.skeleton, ...styles.text }} />
          <div style={{ ...styles.skeleton, ...styles.rating }} />
        </div>
      </div>
    </>
  );
}

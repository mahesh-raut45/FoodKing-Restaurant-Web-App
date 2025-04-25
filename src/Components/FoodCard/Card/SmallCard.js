import React from "react";
import styled from "styled-components";

const Card = ({ product }) => {
  //   console.log(product);

  return (
    <StyledWrapper>
      <div className="card">
        <div className="bg" />
        <div className="content">
          <img src={product.image} alt={product.name} />
          <p>{product.name}</p>
          <p className="price"> $ {product.price}</p>
        </div>
        <div className="blob" />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .content {
    z-index: 3;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 0px 24px;
    top: 20px;
    // gap: 25px;
  }
  p {
    font-size: 18px;
    font-weight: 700;
    color: var(--green);
    text-align: center;
    margin-bottom: 0;
  }
  .price {
    color: var(--orange);
  }

  .content img {
    width: 150px;
    border-radius: 10px;
  }
  .card {
    position: relative;
    width: 200px;
    height: 300px;
    border-radius: 14px;
    z-index: 1111;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: 20px 20px 60px #bebebe, -20px -20px 60px #ffffff;
  }

  .bg {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 190px;
    height: 300px;
    z-index: 2;
    background: rgba(255, 255, 255, 0.95);
    backdrop-filter: blur(24px);
    border-radius: 10px;
    overflow: hidden;
    outline: 2px solid white;
  }

  .blob {
    position: absolute;
    z-index: 1;
    top: 50%;
    left: 50%;
    width: 150px;
    height: 150px;
    border-radius: 50%;
    background-color: var(--rating);
    opacity: 1;
    filter: blur(12px);
    animation: blob-bounce 5s infinite ease;
  }

  @keyframes blob-bounce {
    0% {
      transform: translate(-100%, -100%) translate3d(0, 0, 0);
    }

    25% {
      transform: translate(-100%, -100%) translate3d(100%, 0, 0);
    }

    50% {
      transform: translate(-100%, -100%) translate3d(100%, 100%, 0);
    }

    75% {
      transform: translate(-100%, -100%) translate3d(0, 100%, 0);
    }

    100% {
      transform: translate(-100%, -100%) translate3d(0, 0, 0);
    }
  }
`;

export { Card };

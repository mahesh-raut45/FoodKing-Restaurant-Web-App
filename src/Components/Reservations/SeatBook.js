import { useNavigate } from "react-router-dom";
import { Button } from "../Button/Button";

const SeatBook = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/reservations");
  };

  return (
    <div onClick={handleNavigate}>
      <Button text="Book Now" />
    </div>
  );
};

export { SeatBook };

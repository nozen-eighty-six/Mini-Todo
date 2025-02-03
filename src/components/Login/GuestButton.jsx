import { useDispatch } from "react-redux";
import { addGuest } from "../../context/guestSlice";
import { createGuestTasks } from "../../services/guestServices";
import { useNavigate } from "react-router";
import { deleteUser } from "../../context/userSlice";

const GuestButton = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleGuestLogin = () => {
    dispatch(addGuest());
    dispatch(deleteUser());
    createGuestTasks();
    navigate("/");
  };

  return (
    <button
      className="text-white bg-gray-500 w-1/2 py-2 px-3 rounded-md text-[clamp(1rem,2vw,1.25rem)]"
      onClick={handleGuestLogin}
    >
      As a Guest
    </button>
  );
};

export default GuestButton;

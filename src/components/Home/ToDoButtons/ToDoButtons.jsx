import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { deleteUser } from "../../../context/userSlice";
import AttendButton from "./AttendButton";

const ToDoButtons = ({ currentTaskId, setUpdate }) => {
  const { user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const redirectToLogin = () => {
    navigate("/login");
  };
  const logOutUser = () => {
    dispatch(deleteUser());
  };
  return (
    <div className="xs:w-full xs:order-2 lg:order-3 lg:w-[15%] flex flex-col gap-4 p-5 text-[clamp(1rem,2vw,1.12rem)]">
      <AttendButton currentTaskId={currentTaskId} setUpdate={setUpdate} />
      <button
        className="bg-[#939393] text-white py-2 px-3 w-full rounded-md
      "
        onClick={() => (user ? logOutUser() : redirectToLogin())}
      >
        {user ? "Log out" : "Log in"}
      </button>
    </div>
  );
};

export default ToDoButtons;

import { useSelector } from "react-redux";
import { SERVER_URL } from "../../../consts/server";
import helpHttp from "../../../helpers/helpHttp";
import { updateGuest } from "../../../context/guestSlice";
import { updateGuestTasks } from "../../../services/guestServices";

const AttendButton = ({ currentTaskId, setUpdate }) => {
  const { user } = useSelector((state) => state.user) || null;
  console.log(currentTaskId);
  const attendTask = async (taskId) => {
    if (taskId == null) {
      alert("No hay tareas");
      return;
    }
    //setUpdate(false);
    try {
      const req = await helpHttp().put(SERVER_URL + "task/" + taskId, {
        credentials: "include",
      });
      if (req.status == 202) setUpdate(true);
      console.log(req);
    } catch (error) {
      console.log(error);
    }
  };
  const attendGuestTask = (taskId) => {
    //setUpdate(false);
    try {
      if (taskId == null) {
        alert("No hay tareas");
        return;
      }
      updateGuestTasks(taskId);
      setUpdate(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <button
      className="w-full bg-[#64941b] text-white py-2 px-3 rounded-md"
      onClick={() =>
        !user ? attendGuestTask(currentTaskId) : attendTask(currentTaskId)
      }
    >
      Attend
    </button>
  );
};

export default AttendButton;

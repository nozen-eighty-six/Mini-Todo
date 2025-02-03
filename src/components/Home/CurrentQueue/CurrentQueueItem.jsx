import { useSelector } from "react-redux";
import { SERVER_URL } from "../../../consts/server";
import helpHttp from "../../../helpers/helpHttp";
import { updateGuestTasks } from "../../../services/guestServices";

const CurrentQueueItem = ({ el, setUpdate }) => {
  const { user } = useSelector((state) => state.user) || null;
  const updateTask = async (id) => {
    //setUpdate(false);
    try {
      const req = await helpHttp().put(SERVER_URL + "task/" + id, {
        credentials: "include",
      });
      console.log(req);
      setUpdate(true);
    } catch (error) {
      console.log(error);
    }
  };
  const updateGuestTask = (taskId) => {
    //setUpdate(false);
    try {
      updateGuestTasks(taskId);
      setUpdate(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <li
      className="task-item-animate-fadeInUp flex justify-between p-2 items-center text-[clamp(1rem,2vw,1.12rem)]"
      onAnimationEnd={(e) =>
        e.target.classList.remove("task-item-animate-fadeInUp")
      }
    >
      <span className="text-white">{el.name}</span>
      <button
        className="bg-red-500 flex justify-center items-center py-1 px-2 rounded-md"
        onClick={() =>
          !user ? updateGuestTask(el.taskId) : updateTask(el.taskId)
        }
      >
        <i className="ri-delete-bin-line text-white text-lg"></i>
      </button>
    </li>
  );
};

export default CurrentQueueItem;

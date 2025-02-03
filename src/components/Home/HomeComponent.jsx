import { useSelector } from "react-redux";
import { SERVER_URL } from "../../consts/server";
import helpHttp from "../../helpers/helpHttp";
import AddToQueue from "./AddToQueue";
import CurrentQueue from "./CurrentQueue/CurrentQueue";
import { useEffect, useState } from "react";
import ToDoButtons from "./ToDoButtons/ToDoButtons";
import { getGuestTasks } from "../../services/guestServices";

const HomeComponent = () => {
  const [data, setData] = useState([]);
  const [update, setUpdate] = useState(null);
  const [currentTaskId, setCurrentTaskId] = useState(null);
  const { user } = useSelector((state) => state.user) || null;
  //const id = user == null ? 0 : user.id;

  const getCurrentTaskId = (tasks) => {
    const uncompletedTasks = tasks.filter((el) => el.completed == false);
    if (uncompletedTasks.length != 0)
      setCurrentTaskId(uncompletedTasks[0].taskId);
  };
  useEffect(() => {
    const getTasks = async () => {
      try {
        const req = await helpHttp().get(SERVER_URL + "task/" + user.id, {
          credentials: "include",
        });
        const data = await req;
        console.log(data);
        setData(data);
        getCurrentTaskId(data);
      } catch (error) {
        console.log(error);
      }
    };
    if (user) {
      getTasks();
    } else {
      setData(getGuestTasks());
      getCurrentTaskId(getGuestTasks());
    }
  }, []);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const req = await helpHttp().get(SERVER_URL + "task/" + user.id, {
          credentials: "include",
        });
        const data = await req;
        console.log(data);
        setData(data);
        getCurrentTaskId(data);
      } catch (error) {
        console.log(error);
      }
    };
    console.log(update);
    if (user && update == true) {
      getTasks();
      setUpdate(false);
    }
    if (!user && update == true) {
      console.log("sí");
      setData(getGuestTasks());
      getCurrentTaskId(getGuestTasks());
      setUpdate(false);
    }
  }, [update]);

  return (
    <div className=" bg-[#1f2022] w-full h-screen flex justify-center lg:items-center">
      <div
        className="home__container home-animate-fadeInUp w-[1220px] xs:h-full lg:h-[650px]
         bg-[#1c1d1f] shadow-md border-[#292a2c] border-2 rounded-md "
        onAnimationEnd={(e) =>
          e.target.classList.remove("home-animate-fadeInUp")
        }
      >
        <h1 className="home__title text-white text-center text-[clamp(2.5rem,5vw,3.5rem)] mt-12 mb-6 font-bold">
          TO-DO List
        </h1>
        <div className="home__content  flex xs:flex-col lg:flex-row justify-center xs:items-center lg:items-start">
          <AddToQueue setUpdate={setUpdate} />
          <CurrentQueue data={data} setUpdate={setUpdate} />
          <ToDoButtons currentTaskId={currentTaskId} setUpdate={setUpdate} />
        </div>
      </div>
    </div>
  );
};

export default HomeComponent;

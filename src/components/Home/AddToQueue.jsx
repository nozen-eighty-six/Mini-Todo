import { useState } from "react";
import { useSelector } from "react-redux";

import helpHttp from "../../helpers/helpHttp";
import { SERVER_URL } from "../../consts/server";
import { addGuestTask, getLength } from "../../services/guestServices";

const AddToQueue = ({ setUpdate }) => {
  const [form, setForm] = useState({});
  const { user } = useSelector((state) => state.user);

  const handleSubmit = async () => {
    if (!form.item) return;
    setUpdate(false);
    try {
      const options = {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: {
          name: form.item,
          user: {
            userId: user.id,
          },
        },
        credentials: "include",
      };
      const res = await helpHttp().post(SERVER_URL + "task", options);
      // console.log(res);
      setUpdate(true);
    } catch (error) {
      console.log(error);
    } finally {
      setForm({});
    }
  };
  const handleGuestSubmit = () => {
    if (!form.item) return;
    try {
      const tasksNumber = getLength();
      const newTask = {
        taskId: tasksNumber + 1,
        name: form.item,
        completed: false,
      };
      console.log("Sí 2");
      addGuestTask(newTask);
      setUpdate(true);
    } catch (error) {
      console.log(error);
    } finally {
      setForm({});
    }
  };
  return (
    <div className="xs:w-full xs:order-1 lg:w-[40%] h-full p-5 ">
      <form
        className="form_queue w-full h-full flex flex-col gap-3"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="form_queue__input flex flex-col gap-1">
          <label
            htmlFor="item"
            className="text-white  text-[clamp(1rem,2vw,1.12rem)]
"
          >
            Add to queue
          </label>
          <input
            id="item"
            type="text"
            className="bg-transparent border-2 p-3 rounded-md  border-[#292a2c]  outline-none text-[#94a3af] text-[clamp(1rem,2vw,1.12rem)]"
            name="item"
            value={form.item || ""}
            onChange={(e) =>
              setForm({ ...form, [e.target.name]: e.target.value })
            }
            placeholder="Enter your task"
          />
        </div>
        <button
          type="submit"
          className={`w-full rounded-md p-3 ${
            !form.item ? "bg-[#9ca3af]" : "bg-[#0a44a5] hover:opacity-80"
          }   text-white text-[clamp(1rem,2vw,1.12rem)]`}
          disabled={!form.item}
          onClick={() => (!user ? handleGuestSubmit() : handleSubmit())}
        >
          Add Item
        </button>
      </form>
    </div>
  );
};

export default AddToQueue;

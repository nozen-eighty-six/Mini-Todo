import { Link, useNavigate } from "react-router-dom";
import GuestButton from "./GuestButton";
import { useState } from "react";
import { SERVER_URL } from "../../consts/server";
import helpHttp from "../../helpers/helpHttp";
import { useDispatch } from "react-redux";
import { addUser } from "../../context/userSlice";
import { updateGuest } from "../../context/guestSlice";

const initialState = {
  email: "",
  password: "",
};
const LoginComponent = ({ handleLogin }) => {
  const [form, setForm] = useState(initialState);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  const valitedForm = () => {
    let valitedForm = true;
    Object.values(form).forEach((el) => {
      if (el.length == 0) {
        valitedForm = false;
      }
    });
    return valitedForm;
  };

  const handleSubmit = async () => {
    if (!valitedForm()) return;
    try {
      const options = {
        body: form,
        credentials: "include",
      };
      const req = await helpHttp().post(
        "http://localhost:9000/" + "login",
        options
      );
      console.log(req);
      if (req.token) {
        dispatch(updateGuest());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setForm(initialState);
    }
  };

  const verifyUser = async () => {
    if (!valitedForm()) return;

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: form,
        credentials: "include",
      };

      const req = await helpHttp().post(SERVER_URL + "user/verify", options);

      if (!req.status) {
        alert("User not exist");
        return;
      }
      dispatch(addUser(req.data));
      await handleSubmit();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form
        className="login__form login-animate-fadeInUp w-full mx-auto flex flex-col gap-7  "
        onAnimationEnd={(e) => {
          e.target.classList.remove("login-animate-fadeInUp");
        }}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="login__header">
          <h2 className="login__title text-white text-[clamp(2rem,4vw,3.5rem)] mb-2">
            Log In
          </h2>
          <span
            className="text-[clamp(0.875rem,1.5vw,1rem)] text-white/80 inline-flex gap-2 
        "
          >
            You do not have an account?{" "}
            <a
              className="text-[#8a86f6] decoration-solid underline cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              Sign Up
            </a>{" "}
          </span>
        </div>
        <div className="login__body flex flex-col gap-3">
          <input
            type="email"
            name="email"
            className="bg-[#3b364c] px-3 py-3 rounded-md lg:text-base text-[#9ea7b8]"
            value={form.email || ""}
            onChange={handleChange}
            placeholder="Email "
          />
          <input
            type="password"
            name="password"
            className="bg-[#3b364c]  px-3 py-3 rounded-md lg:text-base text-[#9ea7b8] "
            value={form.password || ""}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <div className="flex justify-center items-center gap-1  w-full">
          <button
            className={`text-white ${
              valitedForm() ? "bg-[#6e54b5] hover:opacity-80" : "bg-[#6b7280]"
            }  w-1/2 py-2 px-3 rounded-md text-[clamp(1rem,2vw,1.25rem)]`}
            disabled={!valitedForm()}
            onClick={verifyUser}
          >
            Log In
          </button>
          <GuestButton />
        </div>
      </form>
    </>
  );
};

export default LoginComponent;

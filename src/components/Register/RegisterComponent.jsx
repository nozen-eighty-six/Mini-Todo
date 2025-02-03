import { Link } from "react-router";
import GuestButton from "../Login/GuestButton";
import { useState } from "react";
import helpHttp from "../../helpers/helpHttp";
import { SERVER_URL } from "../../consts/server";

const initialState = {
  name: "",
  lastName: "",
  email: "",
  password: "",
};
const RegisterComponent = ({ handleLogin }) => {
  const [form, setForm] = useState(initialState);

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
        method: "POST",
        headers: {
          "Content-Type": "Application/json",
        },
        body: form,
        credentials: "include",
      };
      const req = await helpHttp().post(SERVER_URL + "user", options);
      console.log(req);
      handleLogin();
    } catch (error) {
      console.log(error);
    } finally {
      setForm({});
    }
  };
  return (
    <>
      <form
        className="register__form register-animate-fadeInUp w-full mx-auto flex flex-col gap-7  "
        onAnimationEnd={(e) =>
          e.target.classList.remove("register-animate-fadeInUp")
        }
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="login__header">
          <h2 className="login__title text-white text-[clamp(2rem,4vw,3.5rem)] mb-2">
            Create an account
          </h2>
          <span
            className="text-[clamp(0.875rem,1.5vw,1rem)] text-white/80 inline-flex gap-2 
        "
          >
            Already have an account?{" "}
            <a
              className="text-[#8a86f6] decoration-solid underline cursor-pointer"
              onClick={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              Log in
            </a>{" "}
          </span>
        </div>
        <div className="login__body flex flex-col gap-4">
          <div className="flex gap-4 ">
            <input
              type="text"
              name="name"
              className="w-1/2 bg-[#3b364c] px-3 py-3 rounded-md lg:text-base text-[#9ea7b8]"
              value={form.name || ""}
              onChange={handleChange}
              placeholder="Name"
            />
            <input
              type="text"
              name="lastName"
              className="w-1/2 bg-[#3b364c]  px-3 py-3 rounded-md lg:text-base text-[#9ea7b8] "
              value={form.lastName || ""}
              onChange={handleChange}
              placeholder="Last Name"
            />
          </div>

          <div className="flex flex-col gap-4">
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
              } w-1/2 py-2 px-3 rounded-md text-[clamp(1rem,2vw,1.25rem)]`}
              disabled={!valitedForm()}
              onClick={handleSubmit}
            >
              Register
            </button>
            <GuestButton />
          </div>
        </div>
      </form>
    </>
  );
};

export default RegisterComponent;

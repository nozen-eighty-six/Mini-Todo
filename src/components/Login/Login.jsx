import { Swiper, SwiperSlide } from "swiper/react";

import {
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
  Autoplay,
} from "swiper/modules";
import LoginComponent from "./LoginComponent";
import { useState } from "react";
import RegisterComponent from "../Register/RegisterComponent";
const Login = () => {
  const [login, setLogin] = useState(true);

  const handleLogin = () => {
    setLogin((prev) => !prev);
  };
  return (
    <div className="login w-full h-screen bg-[#605b71]  ">
      <div className="login__container w-[1220px] h-screen mx-auto  flex justify-center items-center  ">
        <div className=" w-[90%] h-[620px] bg-[#2b2738] shadow-2xl rounded-md p-4 flex lg:gap-5 xl:gap-3 2xl:gap-0">
          <div className="login__image w-[50%] h-full  ">
            <Swiper
              className="login__swiper h-full w-full  rounded-md"
              modules={[Autoplay]}
              loop={true}
              spaceBetween={-60}
              grabCursor={true}
              slidesPerView={"auto"}
              centeredSlides={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
            >
              {[
                "akane.jpg",
                "fan.jpg",
                "kawa.jpg",
                "chizuru.jpg",
                "koe.jpg",
                "yumeko.jpg",
              ].map((image, index) => (
                <SwiperSlide key={index} className="w-full h-full rounded-md ">
                  <img
                    src={"/images/" + image}
                    alt={"image-" + index}
                    className="w-full h-full rounded-md object-cover"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
          <div
            className="w-1/2 h-full  flex flex-col justify-center items-center gap-7  px-10 py-28 
          "
          >
            {login ? (
              <LoginComponent handleLogin={handleLogin} />
            ) : (
              <RegisterComponent handleLogin={handleLogin} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

import { useEffect, useState } from "react";
import { SERVER_URL } from "../consts/server";
import helpHttp from "../helpers/helpHttp";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

const ProtectedRoutes = ({ children }) => {
  const { guest } = useSelector((state) => state.guest);
  const { user } = useSelector((state) => state.user);
  //const [validatedToken, setValidatedToken] = useState();
  const navigate = useNavigate();
  const verifyToken = async () => {
    try {
      const req = await helpHttp().post(SERVER_URL + "token/verify");
      return req.status;
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (user != null && guest.active == false) {
      const valitedToken = verifyToken();
      if (valitedToken == false) {
        navigate("/login");
      }
    }
    if (user == null && guest.active == false) {
      navigate("/login");
    }
    //if(guest.active == true && user == null)
  }, [user, guest]);

  return children;
};

export default ProtectedRoutes;

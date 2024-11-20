import { 
  Divider,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Input,
  Button
} from "@nextui-org/react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import Logo from "../../assets/logo.svg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../../store/auth-context";
import { useContext } from "react";
import Cookies from "js-cookie";

const LoginPage = () => {

  const { setAuth } = useContext(AuthContext);
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
      try {
          const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, data, {
              headers: {
                  "Content-Type": "application/json",
              },
          });
          const { token, user } = response.data.data;
          setAuth({ token, user });
          Cookies.set("token", token, { expires: 3 });
          Cookies.set("user", JSON.stringify(user), { expires: 3 });
          navigate("/dashboard");
      } catch (error) {
          console.log(error);
      }
  }

  return (
      <div className="h-screen flex justify-center items-center">
          <Card className="lg:w-1/3 w-1/2 px-8 py-6">
              <CardHeader className="flex justify-center items-center space-x-2">
              <img src={Logo} alt="Logo" className="w-14 h-14" />
              <h1 className="text-3xl font-bold text-center text-blue-500">
                      BrainQuest
                  </h1>
              </CardHeader>
              <Divider />
              <CardBody className="flex flex-col items-center space-y-4 justify-center">
                  <h1 className="text-2xl font-bold text-center">Welcome back!</h1>
                  <p className="text-center">Login to your account to continue</p>
                  <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-4">
                      <Input
                          type="text"
                          placeholder="Username"
                          label="Username"
                          isRequired
                          {...register("username", {
                              required: "Username is required",
                          })}
                      />
                      <Input
                          type="password"
                          placeholder="Password"
                          label="Password"
                          isRequired
                          {...register("password", {
                              required: "Password is required",
                          })}
                      />
                      <div className="flex justify-center">
                          <Button color="primary" type="submit">
                              Login
                          </Button>
                      </div>
                  </form>
              </CardBody>
              <Divider />
              <CardFooter>
                  <div className="flex justify-center">
                      Don't have an account?&nbsp;<Link to="/register" className="text-blue-500">Register</Link>
                  </div>
              </CardFooter>
          </Card>
      </div>
  );
}

export default LoginPage;
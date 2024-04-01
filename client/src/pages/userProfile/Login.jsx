import { SiSaltproject } from "react-icons/si";
import { Carousel, Alert, Space, message } from "antd";
import { Link } from "react-router-dom";
import {
  FundTwoTone,
  PieChartTwoTone,
  ProjectTwoTone,
} from "@ant-design/icons";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginUserApi } from "../../api/user/userApi";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useState } from "react";
import ForgotPasswordModal from "../../components/userProfile/ForgotPasswordModal";
import { useDispatch } from "react-redux";
import {
  onLogin,
  onLoginSuccess,
  onLoginFailure,
} from "../../redux/slices/userSlice";
import setCookie from "../../helpers/setCookie";

const schema = yup.object().shape({
  email: yup.string().email().required(),
});

const Login = () => {
  const [isValid, setIsValid] = useState(true);
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    dispatch(onLogin());

    try {
      const loginSuccess = await loginUserApi(data);

      if (loginSuccess?.data?.user?.role === "user") {
        setCookie("token", loginSuccess.data?.token, 1);
        setCookie("user", JSON.stringify(loginSuccess.data?.user), 1);
        dispatch(onLoginSuccess(loginSuccess.data.user));
        setIsValid(true);
        messageApi.success("Logged In Successfully");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else if (loginSuccess?.data?.user?.role === "admin") {
        dispatch(onLoginSuccess(loginSuccess.data.user));
        setIsValid(true);
        messageApi.success("Logged In Successfully");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1000);
      } else {
        dispatch(onLoginFailure("Invalid credentials"));
        setIsValid(false);
        messageApi.error("Invalid credentials");
      }
    } catch (error) {
      dispatch(onLoginFailure(error.message));
      setIsValid(false);
      messageApi.error(error.message);
    }
  };
  return (
    <>
      {contextHolder}
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-10 mx-auto flex flex-wrap items-start">
          <div className="left-class mx-auto w-full lg:w-3/5 md:w-1/2 md:pr-16 lg:pr-0 pr-0">
            <header className="text-center">
              <h1 className="mb-2 inline-flex items-center space-x-2 text-4xl font-bold">
                <span>
                  <SiSaltproject />
                </span>
                <span>Sync Track</span>
              </h1>
              <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-300">
                Create Your Project
              </h3>
              <Carousel autoplay className="bg-white-500 mt-10">
                <div>
                  <FundTwoTone style={{ fontSize: "230px" }} />

                  <h3 className="text-black-500 text-2xl text-left">
                    Track less, work more. Manage your projects your way!
                  </h3>
                </div>
                <div>
                  <ProjectTwoTone style={{ fontSize: "230px" }} />

                  <h3 className="text-black-500 text-2xl text-left">
                    Streamline your workflow, collaborate effectively, and
                    achieve your goals.
                  </h3>
                </div>
                <div>
                  <PieChartTwoTone
                    style={{
                      fontSize: "230px",
                    }}
                  />
                  <h3 className="text-black-500 text-2xl text-left">
                    Unleash your team potential, deliver exceptional results,
                    and conquer the world.
                  </h3>
                </div>
              </Carousel>
            </header>
          </div>

          <div className="right-class lg:w-2/6 md:w-1/2 bg-gray-100 rounded-lg p-8 flex flex-col md:ml-auto w-full mt-10 md:mt-0">
            <h2 className="text-gray-900 text-lg font-medium title-font mb-3">
              Sign In
            </h2>
            {!isValid && (
              <Space
                direction="vertical"
                style={{
                  width: "100%",
                }}
              >
                <Alert
                  message="Incorrect Email/Password"
                  type="error"
                  showIcon
                  closable
                />
              </Space>
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">Email</label>
                <input
                  {...register("email")}
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {errors.email && (
                  <p className="text-sm" style={{ color: "red" }}>
                    {errors.email?.message}
                  </p>
                )}
              </div>
              <div className="relative mb-4">
                <label className="leading-7 text-sm text-gray-600">
                  Password
                </label>
                <input
                  {...register("password")}
                  type="password"
                  className="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                />
                {errors.password && (
                  <p className="text-sm" style={{ color: "red" }}>
                    {errors.password?.message}
                  </p>
                )}
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center space-x-2 rounded-lg border border-indigo-700 bg-indigo-700 px-6 py-2 font-semibold leading-6 text-white hover:border-indigo-600 hover:bg-indigo-600 hover:text-white focus:ring focus:ring-indigo-400 focus:ring-opacity-50 active:border-indigo-700 active:bg-indigo-700 dark:focus:ring-indigo-400 dark:focus:ring-opacity-90"
              >
                <svg
                  className="hi-mini hi-arrow-uturn-right inline-block h-5 w-5 opacity-50"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.207 2.232a.75.75 0 00.025 1.06l4.146 3.958H6.375a5.375 5.375 0 000 10.75H9.25a.75.75 0 000-1.5H6.375a3.875 3.875 0 010-7.75h10.003l-4.146 3.957a.75.75 0 001.036 1.085l5.5-5.25a.75.75 0 000-1.085l-5.5-5.25a.75.75 0 00-1.06.025z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Sign In</span>
              </button>
            </form>
            <ForgotPasswordModal />

            <div className="grow bg-gray-50 p-2 pb-2 text-center text-sm dark:bg-gray-700/50 md:px-12 bg:transparent w-[100%]">
              Dont have an account? &nbsp;
              <Link
                to="/signup"
                className="font-medium text-indigo-600 hover:text-indigo-400 dark:text-indigo-400 dark:hover:text-indigo-300"
              >
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;

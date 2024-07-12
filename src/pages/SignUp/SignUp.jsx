import React from "react";
import { useForm } from "react-hook-form";
import "./SignUp.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context.";
import { useCallback } from "react";

const SignUp = () => {
  const navigate = useNavigate();
  const { user, setUserDetails } = useGlobalContext();

  const [showRegister, setShowRegister] = useState(true);
  const [showInvalid, setShowInvalid] = useState(false);

  const RegisterForm = () => {
    const {
      register,
      handleSubmit,
      unregister,
      formState: { errors },
    } = useForm();

    const handleShowRegister = () => {
      unregister("name");
      unregister("email");
      unregister("password");
      setShowRegister((prevValue) => !prevValue);
    };

    const onRegister = useCallback(async (data) => {
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
          email: data.email,
          password: data.password,
          username: data.name,
        });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };

        await fetch("http://localhost:3001/users/register", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            setUserDetails(JSON.parse(result));
            navigate("/book");
          })
          .catch((error) => console.error(error));
      } catch (error) {
        return [];
      }
    }, []);

    return (
      <>
        <div id="register" className={showRegister ? "show" : "hidden"}>
          <p className="form-title">Registration Form</p>
          <form className="App" onSubmit={handleSubmit(onRegister)}>
            <input placeholder="Name" type="text" {...register("name")} />
            <input
              placeholder="Email"
              type="email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span style={{ color: "red" }}>Email is mandatory </span>
            )}
            <input
              placeholder="Password"
              type="password"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span style={{ color: "red" }}>Password is mandatory </span>
            )}
            <input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
          </form>
          <p
            onClick={() => {
              handleShowRegister();
            }}
          >
            Have an account?{" "}
            <span className="App" style={{ backgroundColor: "red" }}>
              Login
            </span>
          </p>
        </div>
      </>
    );
  };

  const LoginForm = () => {
    const {
      register,
      handleSubmit,
      unregister,
      formState: { errors },
    } = useForm();

    const onLogin = useCallback(async (data) => {
      console.log(data, "::::login")
      try {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        const raw = JSON.stringify({
          email: data.email,
          password: data.password,
        });
        const requestOptions = {
          method: "POST",
          headers: myHeaders,
          body: raw,
          redirect: "follow",
        };
  
        await fetch("http://localhost:3001/users/login", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            result = JSON.parse(result)
            if(result?.status === 401){
              console.log("unauthorised")
            } else {
              let user = JSON.stringify(result);
              console.log(user)
              localStorage.setItem("user", user);
              setUserDetails(user);
              navigate("/book");
            }
          })
          .catch((error) => console.error(error));
      } catch (error) {
        return [];
      }
    }, []);

    const handleShowRegister = () => {
      unregister("email");
      unregister("password");
      setShowRegister((prevValue) => !prevValue);
    };
    return (
      <>
        <div id="login" className={showRegister ? "hidden" : "show"}>
          <p className="form-title">Login</p>
          <form className="App" onSubmit={handleSubmit(onLogin)}>
            <input
              placeholder="Email"
              type="email"
              {...register("email", { required: true })}
            />

            <input
              placeholder="Password"
              type="password"
              {...register("password", { required: true })}
            />

            <input type={"submit"} style={{ backgroundColor: "#a1eafb" }} />
          </form>
          <p
            onClick={() => {
              handleShowRegister();
            }}
          >
            Don't have an account?{" "}
            <span className="App" style={{ backgroundColor: "red" }}>
              SignUp
            </span>
          </p>
        </div>
      </>
    );
  };

  return (
    <>
      {showRegister ? <RegisterForm></RegisterForm> : <LoginForm></LoginForm>}
    </>
  );
};

export default SignUp;

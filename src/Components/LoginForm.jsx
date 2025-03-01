import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";

export default function LoginForm({ setIsLogedin }) {
  const [formData, setformData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const [showPassword, setshowPassword] = useState(false);

  function changeHandler(event) {
    setformData((prevData) => ({
      ...prevData,
      [event.target.name]: event.target.value,
    }));
  }
  const API_BASE_URL = process.env.REACT_APP_BASE_URL;
  const submithandler = async (event) => {
    event.preventDefault();

    const res = await fetch(`${API_BASE_URL}/Login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...formData }),
    });
    const newRes = await res.json();
    if (res.ok && newRes.success) {
      setIsLogedin(true);
      console.log(formData);
      toast.success("Logged In");
      navigate("/");
    } else {
      toast.error("Invalid User");
    }
  };

  return (
    <form
      onSubmit={submithandler}
      className=" flex flex-col w-full gap-y-4 mt-6"
    >
      <label className="w-full ">
        <p className=" text-[0.875rem] text-richblack-5  mb-1 leading-[1.375rem]">
          Email Address <sup className="text-pink-200">*</sup>
        </p>
        <input
          type="email"
          required
          value={formData.email}
          onChange={changeHandler}
          placeholder="Enter email Address"
          name="email"
          className="bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
        />
      </label>
      <label className="w-full relative">
        <p className=" text-[0.875rem] text-richblack-5  mb-1 leading-[1.375rem]">
          Password <sup className="text-pink-200">*</sup>
        </p>
        <input
          type={showPassword ? "text" : "password"}
          required
          value={formData.password}
          onChange={changeHandler}
          placeholder="Enter Password"
          name="password"
          className="   bg-richblack-800 rounded-[0.5rem] text-richblack-5 w-full p-[12px]"
        />
        <span
          className=" absolute right-3 top-[38px] cursor-pointer"
          onClick={() => setshowPassword((prev) => !prev)}
        >
          {showPassword ? (
            <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
          ) : (
            <AiOutlineEye fontSize={24} fill="#AFB2BF" />
          )}
        </span>
        <Link to="#">
          <p className="mt-1 text-xs text-blue-100  max-w-max  ml-auto">
            Forgot Password
          </p>
        </Link>
      </label>
      <button className="bg-yellow-50 rounded-[8px] font-medium text-richblack-900 px-[12px] py-[8px] mt-6">
        Sign In
      </button>
    </form>
  );
}

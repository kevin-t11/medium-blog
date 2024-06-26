import { SignupInput } from "@kevint11/medium-common";
import { ChangeEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Auth = ({ type }: { type: "signin" | "signup" }) => {
  const navigate = useNavigate();
  const [postInput, setPostInput] = useState<SignupInput>({
    name: "",
    email: "",
    password: "",
  });

  async function sendRequest() {
    try {
      const endpoint = type === "signup" ? "signup" : "signin";
      // console.log(endpoint);

      const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
      const response = await axios.post(
        `${BACKEND_URL}/api/v1/user/${endpoint}`,
        postInput,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response);
      const token = response.data.jwt;
      localStorage.setItem("token", token);
      // console.log("token is " + token);
      navigate("/blogs");
    } catch (error) {
      // alert("Error while signing up !!")
      console.error("Authentication error: Invalid credentials.");
    }
  }

  return (
    <div className="h-screen flex flex-col justify-center">
      <div className="flex justify-center">
        <div>
          <div className="px-10">
            <div className="w-[300px] text-3xl font-bold">
              {type === "signin"
                ? "Sign in to an account"
                : " Create an account"}
            </div>

            <div className="ml-2 text-slate-500 font-medium pt-2">
              {type === "signin"
                ? "Don't have an account ?"
                : "Already have an account ?"}
              <Link
                to={type === "signin" ? "/signup" : "/signin"}
                className="underline pl-2"
              >
                {type === "signin" ? "Sign up" : "Sign in"}
              </Link>
            </div>
          </div>

          <div className="pt-5">
            {type === "signup" && (
              <LabeledInput
                label="Name"
                placeholder="Kevin Thumbar"
                onChange={(e) => {
                  setPostInput({
                    ...postInput,
                    name: e.target.value,
                  });
                }}
              />
            )}
            <LabeledInput
              label="Email"
              placeholder="example@gmail.com"
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  email: e.target.value,
                });
              }}
            />
            <LabeledInput
              label="Password"
              type={"password"}
              placeholder="••••••••"
              onChange={(e) => {
                setPostInput({
                  ...postInput,
                  password: e.target.value,
                });
              }}
            />
            <button
              onClick={sendRequest}
              type="button"
              className="mt-8 w-full text-white text-base bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-semibold rounded-lg px-5 py-2.5 me-2 mb-2"
            >
              {type === "signin" ? "Sign In" : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;

interface LabelInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabeledInput({ label, placeholder, onChange, type }: LabelInputType) {
  return (
    <div>
      <label className="block mb-2 text-base font-semibold pt-3 text-gray-900">
        {label}
      </label>
      <input
        onChange={onChange}
        type={type || "text"}
        id={label}
        className="bg-slate-100 border border-slate-300 text-gray-900 font-medium text-sm rounded-lg block w-full p-2.5"
        placeholder={placeholder}
        required
      />
    </div>
  );
}

import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import Logo from "../../assets/logo2x.png";
import backgroundImgNew from "../../assets/FOTO.png";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function Login() {
  const { login } = useContext(AuthContext);

  const [mat, setMat] = useState("");
  const [password, setPassword] = useState("");

  const notify = () => {
    toast.info("Bem-Vindo!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  function handleSubmit() {
    notify();
    setTimeout(() => {
      login(mat, password); //interação com o contexto/api
    }, 1000);
  }

  return (
    <div className="w-full h-screen grid grid-cols-1 sm:grid-cols-2">
      <div className="hidden sm:block">
        <img
          className="w-full h-screen object-cover"
          src={backgroundImgNew}
          alt="background"
        />
      </div>
      <div className="w-full h-screen bg-loginBackground bg-cover bg-no-repeat flex flex-col justify-center">
        <div className="max-w-[400px] w-full mx-auto bg-[#4263EB] rounded-md p-8">
          <div className="w-full flex justify-center items-center my-2">
            <img src={Logo} alt={"Logo"} className="px-10" />
          </div>
          <div className="flex flex-col py-1">
            <label htmlFor="mat" className="text-zinc-200">
              Matrícula
            </label>
            <input
              className="border p-2 rounded outline-none text-zinc-700"
              id="mat"
              type="text"
              name="mat"
              value={mat}
              onChange={(e) => setMat(e.target.value)}
            />
          </div>
          <div className="flex flex-col py-2">
            <label htmlFor="password" className="text-zinc-200">
              Senha
            </label>
            <input
              className="border p-2 rounded outline-none text-zinc-700"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="flex justify-start items-center">
            <p className="text-white">
              <input className="rounded-md" type="checkbox" /> Manter conectado
            </p>
          </div>
          {mat.length === 0 || password.length === 0 ? (
            <button
              disabled={true}
              className="bg-[#18C4B3] w-full my-2 py-2 rounded-md text-white hover:bg-[#16b1a1] duration-300 cursor-not-allowed"
            >
              Entrar
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-[#18C4B3] w-full my-2 py-2 rounded-md text-white hover:bg-[#16b1a1] duration-300"
            >
              Entrar
            </button>
          )}
          <div className="flex justify-between mb-10">
            <p></p>
            <p className="text-white text-sm">
              <a href="/">Esqueci minha senha.</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

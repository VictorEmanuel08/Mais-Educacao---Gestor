import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app, createSession } from "../api/app";
import socketServices from "../util/socketServices";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  const [idSenha, setIdSenha] = useState("");
  const [previousMessages, setPreviousMessages] = useState([]);
  const [idSala, setIdSala] = useState("");
  const [conversas, setConversas] = useState([]);

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");
    const recoveredIdUser = localStorage.getItem("idSenha");

    if (recoveredUser) {
      setUser(recoveredUser);
      setIdSenha(recoveredIdUser);
    }
    setLoading(false);
  }, []);

  const login = async (mat, password) => {
    const response = await createSession(mat, password);

    //api para criar uma session
    const loggedUser = response.data.user;
    const token = response.data.token;

    localStorage.setItem("user", loggedUser.id);
    localStorage.setItem("token", token);
    localStorage.setItem("idSenha", response.data.user.id_senha);

    app.defaults.headers.Authorization = `Bearer ${token}`;

    setUser(loggedUser.id);
    setIdSenha(response.data.user.id_senha);

    navigate("/home");
  };

  const getData = async () => {
    const response = await app.get(`/openRooms/${user}`);
    setConversas(response.data);

    return conversas;
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    app.defaults.headers.Authorization = null;
    setUser(null);
    navigate("/");
  };

  const ConnectRoom = (id_aluno, id_professor) => {
    setTimeout(() => {
      socketServices.emit(
        "select_room",
        {
          id_connected: idSenha,
          id_aluno,
          id_professor,
        },
        (res) => {
          setPreviousMessages(res.messages);
          setIdSala(res.room_id);
        }
      );
    }, 2000);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated: !!user,
        user,
        idSenha,
        login,
        loading,
        logout,
        ConnectRoom,
        previousMessages,
        idSala,
        getData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

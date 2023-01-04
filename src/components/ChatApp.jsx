import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/auth";
import bigodeIcon from "../assets/bigode.png";
import etIcon from "../assets/et.png";
import pintinhoIcon from "../assets/pintinho.png";

import socketServices from "../util/socketServices";
import { app } from "../api/app";

export default function ChatApp() {
  const { user } = useContext(AuthContext);

  const [conversas, setConversas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const response = await app.get(`/openRooms/${user}`);
      setConversas(response.data);
    };
    getData();
  }, []);

  // console.log(user);

  const mensagens = [
    {
      id: 1,
      name: "Ramon Maia",
      message: "Boa tarde professor, um triângulo é tridimensional?",
      img: bigodeIcon,
    },
    {
      id: 2,
      name: "José Neto",
      message: "Bom dia professor, existe um triângulo redondo?",
      img: etIcon,
    },
    {
      id: 3,
      name: "Vinicíus Travincas",
      message: "Oi Professor, um triângulo pode ter quatro lados?",
      img: pintinhoIcon,
    },
  ];

  useEffect(() => {
    socketServices.initializeSocket();
    socketServices.on("open_chats", (res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className="w-[500px]">
      <div className="shadow-md rounded-t-md bg-dark-purple py-2 pt-2">
        <h2 className="text-center text-[16px] font-semibold text-[#FFF]">
          Mensagens
        </h2>
      </div>

      <div className="bg-white h-[250px] w-full">
        <div className="flex flex-col justify-between"></div>
      </div>
    </div>
  );
}

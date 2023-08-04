import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../context/auth";
import { useNavigate } from "react-router-dom";
import { app } from "../../api/app";

export function ChatApp() {
  const navigate = useNavigate();
  const { ConnectRoom, user } = useContext(AuthContext);
  const [conversas, setConversas] = useState([]);

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await app.get(`/openRooms/${user}`);
        setConversas(response.data);
      } catch (Error) {
        console.warn("Não há mensagens cadastradas", Error);
      }
    };

    getData();
  }, [user]);

  const roomChat = async (msg) => {
    ConnectRoom(msg.id_aluno, msg.id_professor);
    navigate("/chat");
  };

  return (
    <div className="w-[500px]">
      <div className="shadow-md rounded-t-md bg-dark-purple py-2 pt-2">
        <h2 className="text-center text-[16px] font-semibold text-[#FFF]">
          Mensagens
        </h2>
      </div>
      <div className="bg-white h-[250px] w-full">
        <div className="flex flex-col justify-between">
          {conversas.length >= 1 ? (
            conversas.map((msg, i) => {
              return (
                <div
                  className="border-l-rose-800 border-solid border-2 overflow-y-auto"
                  key={i}
                  onClick={() => roomChat(msg)}
                >
                  <h1 className="font-poppins text-[20px]">{msg.aluno_name}</h1>
                  <p className="text-[14px]">{msg.msg.text}</p>
                </div>
              );
            })
          ) : (
            <div>
              <p className="text-zinc-500 text-sm mt-2">
                Não há mensagens cadastradas!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

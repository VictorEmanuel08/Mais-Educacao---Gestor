import React, { useState, useContext } from "react";
import { Sidebar } from "../../components/Sidebar";

import { AuthContext } from "../../context/auth";
import socketServices from "../../util/socketServices";

export function Chat() {
  const [message, setMessage] = useState("");
  const { previousMessages, idSenha, idSala } = useContext(AuthContext);

  const SendMessage = () => {
    const objectMessage = [
      {
        _id: 1,
        text: message,
        createdAt: new Date(),
        user: {
          _id: idSenha,
          _idSala: idSala,
          avatar:
            "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png",
        },
      },
    ];

    socketServices.emit("send_message", objectMessage, (res) => {
      setMessage("");
    });
  };

  return (
    <div className="flex w-full min-h-screen font-sans bg-dark-theme ">
      <Sidebar />
      <div className="flex-1">
        <div className="w-full h-screen flex flex-col justify-between px-5 py-2">
          <div className="relative w-full overflow-y-auto h-[40rem] justify-between">
            <ul className="w-full space-y-2">
              {previousMessages.map((prevMessage, i) => {
                return (
                  <div key={i} className="w-full">
                    {idSenha !== prevMessage.user._id ? (
                      <li className="flex justify-start">
                        <div className="relative max-w-xl px-4 py-2 text-gray-700 rounded shadow bg-[#f2f7ff]">
                          <span className="flex">{prevMessage.text}</span>
                        </div>
                      </li>
                    ) : (
                      <li className="flex justify-end">
                        <div className="relative max-w-xl px-4 py-2 text-zinc-300 bg-[#4263EB] rounded shadow">
                          <span className="block">{prevMessage.text}</span>
                        </div>
                      </li>
                    )}
                  </div>
                );
              })}
            </ul>
          </div>

          <div className=" w-full flex items-center justify-between p-3">
            <input
              type="text"
              placeholder="Digite sua menssagem"
              onChange={(e) => setMessage(e.target.value)}
              className="block w-full py-2 pl-4 mx-3 bg-white rounded-full outline-none focus:text-gray-700 shadow-md"
              name="Digite sua mensagem"
              value={message}
              required
            />
            <button type="submit" onClick={() => SendMessage()}>
              <svg
                className=" w-7 h-7 text-blue-500 origin-center transform rotate-90"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

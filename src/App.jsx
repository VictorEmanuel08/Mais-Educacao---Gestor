import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Home } from "./pages/Home";
import { Disciplinas } from "./pages/Disciplinas";
import { OverviewDisciplinas } from "./pages/OverviewDisciplinas";
import { Dados } from "./pages/Dados";
import { AuthProvider } from "./context/auth";
import { Private } from "./components/Private";
import { CriarConteudo } from "./pages/CriarConteudo";
import { EditarConteudo } from "./pages/EditarConteudo";
import { useEffect } from "react";
import socketServices from "./util/socketServices";
import { Chat } from "./pages/Chat";

export function App() {
  useEffect(() => {
    socketServices.initializeSocket();
  }, []);

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <Private>
                <Home />
              </Private>
            }
          />
          <Route
            path="/chat"
            element={
              <Private>
                <Chat />
              </Private>
            }
          />
          <Route
            path="/disciplinas"
            element={
              <Private>
                <Disciplinas />
              </Private>
            }
          />
          <Route
            path="/view-disciplinas/:idSerie/:idDisc"
            element={
              <Private>
                <OverviewDisciplinas />
              </Private>
            }
          />
          <Route
            path="/criar-conteudo/:idSerie/:idDisc"
            element={
              <Private>
                <CriarConteudo />
              </Private>
            }
          />
          <Route
            path="/editar-conteudo/:idConteudo/:idSerie/:idDisc/"
            element={
              <Private>
                <EditarConteudo />
              </Private>
            }
          />
          <Route
            path="/dados"
            element={
              <Private>
                <Dados />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

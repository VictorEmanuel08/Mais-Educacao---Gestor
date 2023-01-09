import { Route, BrowserRouter, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import Home from "./pages/Home";
import { DisciplinasFirst } from "./pages/DisciplinasFirst";
import DisciplinasSecond from "./pages/DisciplinasSecond";
import Dados from "./pages/Dados";
import { NewCalendar } from "./components/NewCalendar";
import { Calendario } from "./components/Calendario/Calendario";
import { ItemAulaEdit } from "./pages/drag n drops/items/ItemAulaEdit";
import { AuthProvider } from "./context/auth";
import { Private } from "./components/Private";
import { CriarAula } from "./pages/drag n drops/CriarAula";
import { EditAula } from "./pages/drag n drops/EditAula";
import { ModalComponent } from "./components/Modalcomponent";
import { ModalcomponentEditarAtividade } from "./components/ModalcomponentEditarAtividade";
import Chat from "./pages/Chat";
import { useEffect } from "react";
import socketServices from "./util/socketServices";

function App() {
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
            path="/disciplinas"
            element={
              <Private>
                <DisciplinasFirst />
              </Private>
            }
          />
          <Route
            path="/editar-disciplinas/:idSerie/:idDisc"
            element={
              <Private>
                <DisciplinasSecond />
              </Private>
            }
          />
          <Route
            path="/criar-disciplinas-conteudo/:idSerie/:idDisc"
            element={
              <Private>
                <CriarAula />
              </Private>
            }
          />
          <Route
            path="/editar-disciplinas-conteudo/:idConteudo/:idSerie/:idDisc/"
            element={
              <Private>
                <EditAula />
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

          <Route
            path="/ItemAulaEdit/:id"
            element={
              <Private>
                <ItemAulaEdit />
              </Private>
            }
          />
          <Route
            path="/Modalcomponent"
            element={
              <Private>
                <ModalComponent />
              </Private>
            }
          />
          <Route
            path="/editar/:idAtividade"
            element={
              <Private>
                <ModalcomponentEditarAtividade />
              </Private>
            }
          />
          <Route
            path="/Calendario"
            element={
              <Private>
                <Calendario />
              </Private>
            }
          />
          <Route
            path="/NewCalendar"
            element={
              <Private>
                <NewCalendar />
              </Private>
            }
          />
          <Route
            path="/Chat"
            element={
              <Private>
                <Chat />
              </Private>
            }
          />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;

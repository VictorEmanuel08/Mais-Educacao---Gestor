import banner from "../../assets/banner.png";
import { Calendario } from "../Calendario";
import { PerfilData } from "../PerfilData";

export function ContentHome() {
  return (
    <div className="flex flex-row">
      <div>
        <div className="w-full px-5">
          <img  src={banner} alt="banner" />
        </div>
        <PerfilData />
      </div>
      <Calendario />
    </div>
  );
}

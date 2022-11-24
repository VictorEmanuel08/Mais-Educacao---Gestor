import banner from "../assets/banner.png";
import PerfilData from "./PerfilData";

export function ContentHome() {
  return (
    <div>
      <div className="w-full px-5">
        <img src={banner} alt="banner" />
      </div>
      <PerfilData />
    </div>
  );
}

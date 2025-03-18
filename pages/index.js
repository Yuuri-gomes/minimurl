import Main from "components/UI/Main";
import Home from "components/UI/Home";
import { GoogleTagManager } from "@next/third-parties/google";

export default function HomePage() {
  <GoogleTagManager gtmId="GTM-NRH72HBB" />;
  return (
    <Main>
      <Home />
    </Main>
  );
}

import Logo from "components/UI/Logo";
import Footer from "components/UI/Footer";

export default function MainComponent({ children }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-800 p-4">
      <Logo />
      <main>{children}</main>
      <Footer />
    </div>
  );
}

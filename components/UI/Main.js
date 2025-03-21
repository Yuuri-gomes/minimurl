import Footer from "components/UI/Footer";
import Navbar from "components/UI/Navbar";
import Logo from "components/UI/Logo";

export default function MainComponent({ children }) {
  return (
    <main>
      <Navbar />
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-gray-800 pt-20 pb-20">
        <div className="w-full flex flex-col items-center justify-center">
          <Logo />
          {children}
        </div>
        <Footer />
      </div>
    </main>
  );
}

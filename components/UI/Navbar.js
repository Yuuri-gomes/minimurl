import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pages = [
    { title: "Home", url: "/" },
    { title: "Contador de cliques", url: "/url-counter" },
    { title: "Termos de uso", url: "/terms" },
    { title: "Denunciar URL", url: "/denounce" },
    { title: "Desencurtar URL", url: "/unshorten-url" },
  ].map((page) => ({ id: crypto.randomUUID(), ...page }));

  return (
    <header className="bg-gray-900 text-white p-4 w-full fixed top-0 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/">
          <h1 className="text-2xl uppercase font-bold text-gray-300">
            Minimurl
          </h1>
        </Link>
        <button
          className="lg:hidden p-2 focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <XMarkIcon className="w-6 h-6" />
          ) : (
            <Bars3Icon className="w-6 h-6" />
          )}
        </button>
        <nav
          className={`lg:flex lg:items-center lg:space-x-6 ${isOpen ? "block" : "hidden"} absolute lg:relative bg-gray-900 lg:bg-transparent w-full lg:w-auto left-0 top-full lg:top-auto p-4 lg:p-0`}
        >
          {pages.map((page) => (
            <Link
              key={page.id}
              href={page.url}
              className="block py-2 hover:text-gray-400"
            >
              {page.title}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}

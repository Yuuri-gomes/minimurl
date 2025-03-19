import { ExclamationCircleIcon } from "@heroicons/react/24/solid";
import Main from "components/UI/Main";

export default function UnderConstruction() {
  return (
    <Main>
      <div className="flex flex-col items-center justify-center text-gray-300 bg-gray-900 p-4 rounded-lg max-w-5xl mx-auto">
        <ExclamationCircleIcon className="w-16 h-16 text-yellow-500" />
        <div className="text-center">
          <h1 className="text-4xl font-bold md:text-6xl">Em Construção 🚧</h1>
          <p className="mt-4 text-lg">
            Estamos trabalhando duro para trazer algo incrível. Volte em breve !
          </p>
        </div>
      </div>
    </Main>
  );
}

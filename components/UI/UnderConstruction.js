import { ExclamationCircleIcon } from "@heroicons/react/24/solid";

export default function UnderConstruction() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <ExclamationCircleIcon className="w-16 h-16 text-yellow-500" />
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 md:text-6xl">
          Em Construção 🚧
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Estamos trabalhando duro para trazer algo incrível. Volte em breve!
        </p>
      </div>
    </div>
  );
}

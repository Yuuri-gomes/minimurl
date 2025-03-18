import Link from "next/link";

export default function Logo() {
  return (
    <Link href="/" id="MinimurlLogo">
      <p className="text-4xl uppercase font-bold text-gray-300 mb-4">
        minimurl
      </p>
    </Link>
  );
}

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-[#202124] text-white py-4">
      <div className="container mx-auto flex px-4 py-5 flex flex-col lg:flex-row justify-between items-center">
        <h1 className="text-2xl font-bold">Quest News</h1>
        <ul className="flex space-x-4">
          <li>
            <Link href="/">
              <h1 className="hover:text-gray-300">Home</h1>
            </Link>
          </li>
          <li>
            <Link href="/news">
              <h1 className="hover:text-gray-300">News</h1>
            </Link>
          </li>
          <li>
            <Link href="/sports">
              <h1 className="hover:text-gray-300">Sports</h1>
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

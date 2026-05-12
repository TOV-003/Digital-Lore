import { Link } from "react-router-dom"


export default function Navbar() {
    return (
        <nav className="bg-digilore-primary text-white p-4 border-b border-white flex flex-col items-center md:flex-row md:justify-between gap-4">
            <div className="flex flex-col md:flex-row gap-4 md:gap-2.5 items-center w-full md:w-auto">
                <Link to="/"><h1 className="text-xl font-bold">DIGITAL LORE</h1></Link>

                <div className="border border-white p-2.5 rounded-lg w-full md:w-xl text-sm flex gap-2">
                    <img src="/Search.svg" alt="Search" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent outline-none text-white placeholder:text-gray-400 w-full"
                    />
                </div>
            </div>

            <div className="flex flex-row gap-4 md:gap-6 md:items-center">
                <Link to="/" className="hover:text-gray-400 font-bold text-xl">HOME</Link>
                <Link to="/explore" className="hover:text-gray-400 font-bold text-xl">EXPLORE</Link>
                <Link to="/upcoming" className="hover:text-gray-400 font-bold text-xl">UPCOMING</Link>
            </div>
        </nav>
    );
}
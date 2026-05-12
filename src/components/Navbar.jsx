import { Link, NavLink } from "react-router-dom"
import { useState } from "react"


export default function Navbar() {
    const [searchVisible, setSearchVisible] = useState(false);
    return (
        <nav className="bg-digilore-primary text-white p-4 border-b border-white flex flex-col items-center md:flex-row md:justify-between gap-4">
            <div className="bg-digilore-primary border border-white rounded-md flex flex-col w-80"></div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-2.5 items-center w-full md:w-auto">
                <Link to="/"><h1 className="text-xl font-bold">TITLE STACK</h1></Link>

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
                <NavLink to="/" className={({ isActive }) => isActive ? "text-digilore-secondary font-bold text-xl" : "text-white hover:text-digilore-secondary font-bold text-xl"}>HOME</NavLink>
                <NavLink to="/explore" className={({ isActive }) => isActive ? "text-digilore-secondary font-bold text-xl" : "text-white hover:text-digilore-secondary font-bold text-xl"}>EXPLORE</NavLink>
                <NavLink to="/upcoming" className={({ isActive }) => isActive ? "text-digilore-secondary font-bold text-xl" : "text-white hover:text-digilore-secondary font-bold text-xl"}>UPCOMING</NavLink>
            </div>
        </nav>
    );
}
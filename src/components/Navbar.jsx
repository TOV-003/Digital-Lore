import { Link, NavLink } from "react-router-dom"
import { useState, useEffect, useContext } from "react"
import { GameContext } from "../Context/GameContext"



export default function Navbar() {
    const [search, setSearch] = useState("");
    const [searchVisible, setSearchVisible] = useState(false);
    const [searchResults, setSearchResults] = useState("");

    const { apiKey } = useContext(GameContext);

    useEffect(() => {
        async function searchGames() {
            if (searchVisible) {
                try {
                    const response = await fetch(
                        `https://api.rawg.io/api/games?key=${apiKey}&search=${search}&page_size=5`
                    );
                    const data = await response.json();
                    setSearchResults(data.results);
                } catch (err) {
                    console.error("Random Games Load Failed", err);
                }
            }

        }

        searchGames();
    }, [search, searchVisible, apiKey]);
    return (
        <nav className="bg-digilore-primary text-white p-4 border-b border-white flex flex-col items-center md:flex-row md:justify-between gap-4">
            <div className={`bg-digilore-primary border border-white rounded-md flex flex-col w-80 h-fit text-2xl absolute top-30 lg:top-18 lg:left-42 ${searchVisible ? 'block' : 'hidden'}`}>
                {searchResults && searchResults.length > 0 ? (
                    searchResults.map((result) => (
                        <Link to={`/game/${result.id}`} className="text-white hover:text-digilore-secondary p-2 text-lg border-b border-white" key={result.id} onClick={() => setSearchVisible(false)}>
                            {result.name}
                        </Link>
                    ))
                ) : (
                    <p className="text-gray-300">No games found.</p>
                )}
            </div>
            <div className="flex flex-col md:flex-row gap-4 md:gap-2.5 items-center w-full md:w-auto">
                <Link to="/"><h1 className="text-xl font-bold">TITLE STACK</h1></Link>

                <div className="border border-white p-2.5 rounded-lg w-full md:w-xl text-sm flex gap-2">
                    <img src="/Search.svg" alt="Search" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="bg-transparent outline-none text-white placeholder:text-gray-400 w-full"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setSearchVisible(true);
                        }
                        }
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
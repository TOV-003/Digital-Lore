
import { Link } from "react-router-dom";
import Layout from "../components/Layout"
import { useContext } from "react";
import { GameContext } from "../Context/GameContext.jsx";

export default function Explore() {

    const { exploreGames, setExplorePage, setGenre, genre, setExploreGames, setSort, sort } = useContext(GameContext);
    console.log("Explore Games in Explore:", exploreGames);

    const genres = [
        { name: "Action", slug: "action" },
        { name: "Adventure", slug: "adventure" },
        { name: "RPG", slug: "role-playing-games-rpg" },
        { name: "Strategy", slug: "strategy" },
        { name: "Indie", slug: "indie" },
        { name: "Simulation", slug: "simulation" },
        { name: "Platformer", slug: "platformer" },
        { name: "Puzzle", slug: "puzzle" },
        { name: "Sports", slug: "sports" },
        { name: "Arcade", slug: "arcade" },
        { name: "Family", slug: "family" },
    ];

    const sortOptions = [
        { name: "Recently Added", slug: "-added" },
        { name: "A -> Z", slug: "name" },
        { name: "Z -> A", slug: "-name" },
        { name: "Release Date", slug: "-released" },
        { name: "Rating", slug: "-rating" },
        { name: "Metacritic", slug: "-metacritic" },
    ];

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center h-full gap-12">
                <h1 className="md:text-6xl text-3xl font-bold text-white">Explore</h1>
                <div className="flex lg:flex-row flex-wrap lg:px-20 lg:py-5 p-5 justify-center lg:justify-evenly w-full gap-2.5 lg:gap-auto">
                    {genres.map((g) => (
                        <div
                            key={g.slug}
                            className={`flex items-center justify-center px-2.5 py-1 border border-white rounded-lg cursor-pointer hover:bg-digilore-secondary text-white hover:text-purple-950 font-bold transition-colors ${genre === g.slug ? "bg-digilore-secondary text-purple-950" : ""
                                }`}
                            onClick={() => {
                                setExploreGames([]);
                                setExplorePage(1);
                                setGenre(g.slug);
                                setSort("added");
                            }}
                        >
                            {g.name}
                        </div>
                    ))}
                    <div
                        className={`flex items-center justify-center px-2.5 py-1 border border-white rounded-lg cursor-pointer hover:bg-digilore-secondary text-white hover:text-purple-950 font-bold transition-colors ${genre === "" ? "bg-digilore-secondary text-purple-950" : ""
                            }`}
                        onClick={() => {
                            setExploreGames([]);
                            setExplorePage(1);
                            setGenre("");
                            setSort("added");
                        }}
                    >
                        All Games
                    </div>
                </div>
                <div className="flex lg:flex-row flex-wrap lg:px-20 lg:py-5 p-5 justify-center lg:justify-evenly w-full gap-2.5 lg:gap-auto">
                    {sortOptions.map((g) => (
                        <div
                            key={g.slug}
                            className={`flex items-center justify-center px-2.5 py-1 border border-white rounded-lg cursor-pointer hover:bg-digilore-secondary text-white hover:text-purple-950 font-bold transition-colors ${sort === g.slug ? "bg-digilore-secondary text-purple-950" : ""
                                }`}
                            onClick={() => {
                                setExploreGames((prev) => prev);
                                setExplorePage((prev) => prev);
                                setGenre((prev) => prev);
                                setSort(g.slug);
                            }}
                        >
                            {g.name}
                        </div>
                    ))}
                    <div
                        className={`flex items-center justify-center px-2.5 py-1 border border-white rounded-lg cursor-pointer hover:bg-digilore-secondary text-white hover:text-purple-950 font-bold transition-colors ${sort === "" ? "bg-digilore-secondary text-purple-950" : ""
                            }`}
                        onClick={() => {
                            setExploreGames((prev) => prev);
                            setExplorePage((prev) => prev);
                            setGenre((prev) => prev);
                            setSort("added");
                        }}
                    >
                        All Games
                    </div>
                </div>
            </div>
            <div className="p-4 flex flex-col items-center justify-center gap-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {exploreGames.length > 0 ? exploreGames.map((el) => (
                        <div key={el.id}>
                            <Link to={`/game/${el.id}`}>
                                <img
                                    src={el.background_image}
                                    alt={el.name}
                                    className="w-full h-48 object-cover"
                                />
                            </Link>
                            <div className="p-4">
                                <h3 className="text-xl font-bold text-white">{el.name}</h3>
                                <p className="text-gray-300">{el.genres.map((genre) => genre.name).join(", ")}</p>
                            </div>
                        </div>
                    )) : <p className="text-gray-300 ">Loading...</p>}
                </div>
                <div className="text-white font-3xl border border-white px-8 py-2 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-colors duration-300" onClick={() => setExplorePage((page) => page + 1)}>
                    MORE GAMES
                </div>
            </div>
        </Layout>
    )
}


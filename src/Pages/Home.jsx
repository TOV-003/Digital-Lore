
import { Link } from "react-router-dom";
import Layout from "../components/Layout"
import { useEffect, useState, useContext } from "react";
import { GameContext } from "../Context/GameContext.jsx";

export default function Home() {

    const [currentImage, setCurrentImage] = useState("");
    const [currentImageId, setCurrentImageId] = useState("");
    const [split, setSplit] = useState(false);
    const [splitRandom, setSplitRandom] = useState(false);
    const { trendingGames, randomGames, futureGames } = useContext(GameContext);
    console.log("Trending Games in Home:", trendingGames);


    useEffect(() => {
        if (trendingGames.length === 0) return;

        const interval = setInterval(() => {
            try {
                const randomIndex = Math.floor(Math.random() * trendingGames.length);
                const nextImage = trendingGames[randomIndex].background_image;
                const nextImageId = trendingGames[randomIndex].id;

                if (!nextImage) {
                    throw new Error("No background image found for selected game");
                }

                setCurrentImage(nextImage);
                setCurrentImageId(nextImageId);
            } catch (innerError) {
                console.warn("Failed to rotate image:", innerError);
            }
        }, 10000);

        return () => {
            clearInterval(interval);
        };
    }, [trendingGames]);


    return (
        <Layout>
            <div className="flex flex-col items-center justify-center h-full gap-12">
                <h1 className="md:text-6xl text-3xl font-normal text-white">Discover Videogames!</h1>
                <Link to={currentImageId ? `/game/${currentImageId}` : null} className="w-full md:w-auto">
                    {currentImage ? (
                        <img
                            src={currentImage}
                            alt="Trending Game Background"
                            className="w-full md:h-180 h-60 rounded-lg shadow-lg object-cover"
                        />
                    ) : null}
                </Link>
            </div>
            <div className="p-4 flex flex-col items-center justify-center gap-12">
                <h2 className="text-4xl font-bold text-white mb-4">Trending Games</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {trendingGames && split ? trendingGames.map((el) => (
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
                    )) : trendingGames && !split ? trendingGames.slice(0, trendingGames.length / 2).map((el) => (
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
                    )) : <p className="text-gray-300">Loading trending games...</p>}
                </div>
                <div className="text-white font-3xl border border-white px-8 py-2 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-colors duration-300" onClick={() => setSplit((s) => !s)}>
                    {split ? "LESS" : "MORE"}
                </div>
            </div>
            <div className="p-4 flex flex-col items-center justify-center gap-12">
                <h2 className="text-4xl font-bold text-white mb-4">Explore</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {randomGames && splitRandom ? randomGames.map((el) => (
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
                    )) : randomGames && !splitRandom ? randomGames.slice(0, randomGames.length / 2).map((el) => (
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
                    )) : <p className="text-gray-300">Loading random games...</p>}
                </div>
                <div className="text-white font-3xl border border-white px-8 py-2 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-colors duration-300" onClick={() => setSplitRandom((s) => !s)}>
                    {splitRandom ? "LESS" : "MORE"}
                </div>
            </div>
            <div className="p-4 flex flex-col items-center justify-center gap-12">
                <h2 className="text-4xl font-bold text-white mb-4">Upcoming Games</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {futureGames && split ? futureGames.map((el) => (
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
                    )) : futureGames && !split ? futureGames.slice(0, futureGames.length / 2).map((el) => (
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
                    )) : <p className="text-gray-300">Loading future games...</p>}
                </div>
                <div className="text-white font-3xl border border-white px-8 py-2 rounded-lg cursor-pointer hover:bg-white hover:text-black transition-colors duration-300" onClick={() => setSplit((s) => !s)}>
                    {split ? "LESS" : "MORE"}
                </div>
            </div>
        </Layout>
    )
}


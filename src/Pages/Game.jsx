import Layout from "../components/Layout"
import { useParams, Link } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { GameContext } from "../Context/GameContext"

export default function Game() {
    const { id } = useParams();
    const { apiKey } = useContext(GameContext);
    const [details, setDetails] = useState(null);
    const [screenshots, setScreenshots] = useState([]);
    const [trailers, setTrailers] = useState([]);
    const [related, setRelated] = useState([]);
    const youtubeKey = import.meta.env.VITE_YOUTUBE_API_KEY;

    useEffect(() => {
        async function fetchGameDetails() {
            if (!apiKey) return;

            try {
                const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${apiKey}`);
                const data = await response.json();
                console.log("Game details:", data);
                setDetails(data);
            } catch (err) {
                console.error("Failed to fetch game details", err);
            }
        }
        fetchGameDetails();
    }, [id, apiKey]);



    useEffect(() => {
        async function fetchOnlyImages() {
            if (!apiKey) return;

            try {
                const response = await fetch(
                    `https://api.rawg.io/api/games/${id}/screenshots?key=${apiKey}`
                );
                const data = await response.json();
                setScreenshots(data.results);
                console.log("Screenshots pulled:", data.results);
            } catch (err) {
                console.error("Image fetch failed", err);
            }
        }

        fetchOnlyImages();
    }, [id, apiKey]);

    useEffect(() => {
        async function fetchTrailers() {
            if (!details?.name || !youtubeKey) return;

            try {
                const query = encodeURIComponent(`${details.name} official trailer`);
                const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=8&q=${query}&type=video&key=${youtubeKey}`;

                const response = await fetch(url);
                const data = await response.json();

                if (data.items) {
                    setTrailers(data.items);
                }
            } catch (err) {
                console.error("YouTube fetch error:", err);
            }
        }

        fetchTrailers();
    }, [details, youtubeKey]);


    useEffect(() => {
        async function fetchRelatedGames() {
            if (!id || !apiKey || !details) return;

            try {
                console.log("Fetching related games for ID:", id);

                // Use genre-based search (works for free API accounts)
                if (details?.genres?.length > 0) {
                    const genreId = details.genres[0].id;
                    console.log("Genre ID:", genreId);

                    const genreRes = await fetch(
                        `https://api.rawg.io/api/games?key=${apiKey}&genres=${genreId}&exclude=${id}&page_size=10`
                    );
                    const genreData = await genreRes.json();
                    console.log("Genre-based games response:", genreData);

                    if (genreData.results && genreData.results.length > 0) {
                        console.log("Setting related games:", genreData.results.length);
                        setRelated(genreData.results);
                    }
                } else {
                    console.log("No genres available");
                }
            } catch (err) {
                console.error("Failed to fetch related games", err);
            }
        }

        fetchRelatedGames();
    }, [id, apiKey, details]);

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center w-full gap-6 text-white text-center lg:text-start">
                <div className="lg:w-[70%] w-full p-4 flex justify-evenly gap-12 items-center flex-col ">
                    <img src={details?.background_image} alt="" className="rounded-lg w-xl" />
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-bold">{details?.name}</h1>
                        <h2 className="text-2xl md:text-xl"><span className="font-bold">Developer:</span> {details?.developers.length > 0 ? details?.developers[0].name : "N/A"}</h2>
                        <h2 className="text-2xl md:text-xl"><span className="font-bold">Publisher:</span> {details?.publishers.length > 0 ? details?.publishers[0].name : "N/A"}</h2>
                        <h2 className="text-2xl md:text-xl"><span className="font-bold">Platforms:</span> {details?.platforms?.map((p) => p.platform.name).join(", ")}</h2>
                        <h2 className="text-2xl md:text-xl"><span className="font-bold">Released:</span> {details?.released ? details.released : "Upcoming"}</h2>
                        <h2 className="text-2xl md:text-xl"><span className="font-bold">Game Type:</span> {details?.tags.length > 0 ? details?.tags[0]?.name : "N/A"}</h2>
                        <h2 className="text-2xl md:text-xl"><span className="font-bold">Genre:</span> {details?.genres.length > 0 ? details?.genres[0]?.name : "N/A"}</h2>
                        <h2 className="text-2xl md:text-xl"><span className="font-bold">Description:</span> {details?.description_raw}</h2>
                        <h2 className="text-2xl md:text-xl">
                            {details?.metacritic ? <><span className="font-bold">Metacritic:</span> <span className={`text-4xl font-bold ${details?.metacritic >= 70 ? 'text-green-500' : details?.metacritic >= 40 ? 'text-yellow-500' : 'text-red-500'} `}>{details?.metacritic}</span></> : <><span className="font-bold">Rating:</span> <span className={`text-4xl font-bold ${details?.rating >= 4 ? 'text-green-500' : details?.rating >= 2 ? 'text-yellow-500' : 'text-red-500'} `}>{details?.rating}</span></>}
                        </h2>
                        <p className="text-gray-300">Game ID: {id}</p>
                    </div>
                </div>
                <div className="lg:w-[70%] w-full p-4 flex flex-col gap-4 lg:grid lg:grod-cols-2 items-center">
                    <h2 className="text-2xl font-bold mb-4">Images</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {screenshots.map((el) => (
                            <img
                                key={el.id}
                                src={el.image}
                                alt="Game Screenshot"
                                className="rounded-lg w-full h-auto"
                            />
                        ))}
                    </div>
                </div>
                <div className="lg:w-[70%] w-full p-4 flex flex-col gap-4 lg:grid lg:grod-cols-2 items-center">
                    <h2 className="text-2xl font-bold mb-4">Videos</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
                        {trailers.map((video) => (
                            <div key={video.id.videoId} className="flex flex-col gap-2">
                                <iframe
                                    className="w-full rounded-lg aspect-video"
                                    src={`https://www.youtube.com/embed/${video.id.videoId}`}
                                    title={video.snippet.title}
                                    allowFullScreen
                                ></iframe>
                                <p className="text-sm text-gray-300 font-medium line-clamp-2">
                                    {video.snippet.title}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="lg:w-[70%] w-full p-4">
                    <h2 className="text-2xl font-bold mb-4">You Might Also Like</h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {related && related.length > 0 ? (
                            related.map((el) => (
                                <Link
                                    to={`/game/${el.id}`}
                                    key={el.id}
                                    className="flex flex-col gap-2 cursor-pointer hover:scale-105 transition-transform"
                                >
                                    <img
                                        src={el.background_image}
                                        className="rounded-lg aspect-video object-cover"
                                        alt={el.name}
                                    />
                                    <p className="text-sm font-medium truncate">{el.name}</p>
                                </Link>
                            ))
                        ) : (
                            <p className="text-gray-400">Loading related games...</p>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
}
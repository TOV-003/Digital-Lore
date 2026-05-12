import Layout from "../components/Layout"
import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { GameContext } from "../Context/GameContext"

export default function Game() {
    const { id } = useParams();
    const { apiKey } = useContext(GameContext);
    const [details, setDetails] = useState(null);
    const [screenshots, setScreenshots] = useState([]);
    const [trailers, setTrailers] = useState([]);
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


    return (
        <Layout>
            <div className="flex flex-col items-center justify-center w-full gap-6 text-white text-center lg:text-start">
                <div className="lg:w-[70%] w-full p-4 flex justify-evenly gap-12 items-center flex-col ">
                    <img src={details?.background_image} alt="" className="rounded-lg w-xl" />
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-bold">{details?.name}</h1>
                        <h2 className="text-2xl md:text-xl"><span className="font-bold">Developer:</span> {details?.developers[0].name}</h2>
                        <h2 className="text-2xl md:text-xl"><span className="font-bold">Publisher:</span> {details?.publishers[0].name}</h2>
                        <h2 className="text-2xl md:text-xl"><span className="font-bold">Platforms:</span> {details?.platforms?.map((p) => p.platform.name).join(", ")}</h2>
                        <h2 className="text-2xl md:text-xl"><span className="font-bold">Released:</span> {details?.released ? details.released : "Upcoming"}</h2>
                        <h2 className="text-2xl md:text-xl"><span className="font-bold">Game Type:</span> {details?.tags[0]?.name}</h2>
                        <h2 className="text-2xl md:text-xl"><span className="font-bold">Genre:</span> {details?.genres[0]?.name}</h2>
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
            </div>
        </Layout>
    );
}
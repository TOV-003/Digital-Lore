import Layout from "../components/Layout"
import { useParams } from "react-router-dom"
import { useContext, useEffect, useState } from "react"
import { GameContext } from "../Context/GameContext"

export default function Game() {
    const { id } = useParams();
    const { apiKey } = useContext(GameContext);
    const [details, setDetails] = useState(null);

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

    return (
        <Layout>
            <div className="flex flex-col items-center justify-center w-full gap-6 text-white text-center lg:text-start">
                <div className="lg:w-[70%] w-full p-4 flex justify-evenly gap-12 items-center flex-col lg:flex-row">
                    <img src={details?.background_image} alt="" className="rounded-lg w-xl" />
                    <div className="flex flex-col gap-4">
                        <h1 className="text-4xl font-bold">{details?.name}</h1>
                        <h2 className="text-2xl"><span className="font-bold">Developer:</span> {details?.developers[0].name}</h2>
                        <h2 className="text-2xl"><span className="font-bold">Platforms:</span> {details?.platforms?.map((p) => p.platform.name).join(", ")}</h2>
                        <h2 className="text-2xl"><span className="font-bold">Released:</span> {details?.released ? details.released : "Upcoming"}</h2>
                        <p className="text-gray-300">Game ID: {id}</p>
                    </div>
                </div>
            </div>
        </Layout>
    );
}
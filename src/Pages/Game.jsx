import Layout from "../components/Layout"
import { useParams, Link } from "react-router-dom"

export default function Game() {
    const { id } = useParams();

    return (
        <Layout>
            <div className="p-4">
                <Link to="/" className="text-blue-500 hover:underline">
                    &larr; Back to Home Y
                </Link>
                <h1 className="text-3xl font-bold text-white">Game Details</h1>
                <p className="text-gray-300">Game ID: {id}</p>
            </div>
        </Layout>
    );
}
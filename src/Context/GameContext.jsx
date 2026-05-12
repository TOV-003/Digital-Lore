import { createContext, useState, useEffect } from "react";

const GameContext = createContext();

export function GameProvider({ children }) {
    const [trendingGames, setTrendingGames] = useState([
        {
            id: 1,
            background_image: "https://via.placeholder.com/1200x400",
            name: "Loading..."
        }
    ]);
    const [randomGames, setRandomGames] = useState([]);
    const [futureGames, setFutureGames] = useState([]);
    const [exploreGames, setExploreGames] = useState([]);
    const [upcomingGames, setUpcomingGames] = useState([]);
    const [explorePage, setExplorePage] = useState(1);
    const [genre, setGenre] = useState("");
    const [sort, setSort] = useState("-added");
    const apiKey = import.meta.env.VITE_RAWG_API_KEY;



    useEffect(() => {
        async function loadTrendingGames() {
            try {
                const today = new Date();
                const threeMonthsAgo = new Date();
                threeMonthsAgo.setMonth(today.getMonth() - 3);

                const start = threeMonthsAgo.toISOString().split("T")[0];
                const end = today.toISOString().split("T")[0];

                const response = await fetch(
                    `https://api.rawg.io/api/games?key=${apiKey}&dates=${start},${end}&ordering=-added&page_size=24`
                );

                const data = await response.json();
                setTrendingGames(data.results);
            } catch (err) {
                console.error("Archive Load Failed", err);
            }
        }

        loadTrendingGames();
    }, [apiKey]);

    useEffect(() => {
        async function loadRandomGames() {
            try {
                const response = await fetch(
                    `https://api.rawg.io/api/games?key=${apiKey}&ordering=-added&page_size=24`
                );
                const data = await response.json();
                setRandomGames(data.results);
            } catch (err) {
                console.error("Random Games Load Failed", err);
            }
        }

        loadRandomGames();
    }, [apiKey]);

    useEffect(() => {
        async function loadFutureGames() {
            try {
                const today = new Date();
                const sixMonthsLater = new Date();
                sixMonthsLater.setMonth(today.getMonth() + 6);

                const response = await fetch(
                    `https://api.rawg.io/api/games?key=${apiKey}&dates=${today.toISOString().split("T")[0]},${sixMonthsLater.toISOString().split("T")[0]}&ordering=-added&page_size=24`
                );

                const data = await response.json();
                setFutureGames(data.results);
            } catch (err) {
                console.error("Future Games Load Failed", err);
            }
        }

        loadFutureGames();
    }, [apiKey]);

    useEffect(() => {
        async function loadExploreGames() {
            if (!apiKey) return;

            if (genre) {
                try {
                    const response = await fetch(
                        `https://api.rawg.io/api/games?key=${apiKey}&genres=${genre}&page=${explorePage}&page_size=20&ordering=${sort}`
                    );
                    const rawdata = await response.json();
                    const data = rawdata.results.filter(game =>
                        game.background_image !== null && game.background_image !== ""
                    );



                    setExploreGames((prev) => {
                        const existingIds = new Set(prev.map(g => g.id));
                        const newGames = data.filter(g => !existingIds.has(g.id));
                        return [...prev, ...newGames];
                    });



                } catch (err) {
                    console.error("Fetch failed", err);
                }
            }
            else {
                try {
                    const response = await fetch(
                        `https://api.rawg.io/api/games?key=${apiKey}&page=${explorePage}&page_size=20&ordering=${sort}`
                    );
                    const rawdata = await response.json();
                    const data = rawdata.results.filter(game =>
                        game.background_image !== null && game.background_image !== ""
                    );


                    setExploreGames((prev) => {
                        const existingIds = new Set(prev.map(g => g.id));
                        const newGames = data.filter(g => !existingIds.has(g.id));
                        return [...prev, ...newGames];
                    });;
                } catch (err) {
                    console.error("Fetch failed", err);
                }
            }
        }

        loadExploreGames();
    }, [apiKey, explorePage, genre, sort]);

    useEffect(() => {
        async function loadUpcomingGames() {
            if (!apiKey) return;

            if (genre) {
                try {
                    const today = new Date();
                    const sixMonthsLater = new Date();
                    sixMonthsLater.setMonth(today.getMonth() + 12);

                    const response = await fetch(
                        `https://api.rawg.io/api/games?key=${apiKey}&dates=${today.toISOString().split("T")[0]},${sixMonthsLater.toISOString().split("T")[0]}&genres=${genre}&page=${explorePage}&page_size=20&ordering=${sort}`
                    );
                    const rawdata = await response.json();
                    const data = rawdata.results.filter(game =>
                        game.background_image !== null && game.background_image !== ""
                    );

                    setUpcomingGames((prev) => {
                        const existingIds = new Set(prev.map(g => g.id));
                        const newGames = data.filter(g => !existingIds.has(g.id));
                        return [...prev, ...newGames];
                    });
                } catch (err) {
                    console.error("Fetch failed", err);
                }
            }
            else {
                try {
                    const today = new Date();
                    const sixMonthsLater = new Date();
                    sixMonthsLater.setMonth(today.getMonth() + 12);

                    const response = await fetch(
                        `https://api.rawg.io/api/games?key=${apiKey}&dates=${today.toISOString().split("T")[0]},${sixMonthsLater.toISOString().split("T")[0]}&page=${explorePage}&page_size=20&ordering=${sort}`
                    );
                    const rawdata = await response.json();
                    const data = rawdata.results.filter(game =>
                        game.background_image !== null && game.background_image !== ""
                    );

                    setUpcomingGames((prev) => {
                        const existingIds = new Set(prev.map(g => g.id));
                        const newGames = data.filter(g => !existingIds.has(g.id));
                        return [...prev, ...newGames];
                    });
                } catch (err) {
                    console.error("Fetch failed", err);
                }
            }
        }

        loadUpcomingGames();
    }, [apiKey, explorePage, genre, sort]);

    return (
        <GameContext.Provider value={{ apiKey, trendingGames, randomGames, futureGames, exploreGames, setExploreGames, setExplorePage, genre, setGenre, sort, setSort, upcomingGames, setUpcomingGames }}>{children}</GameContext.Provider>
    )
}

export { GameContext };
export default function Footer() {
    return (
        <footer className=" text-white p-2.5 text-center">
            <p className="text-lg">This site is a project by <br></br>
                Victor Toba - Ogunleye</p>
            <p>
                <a href="https://github.com/TOV-003" target="_blank" rel="noopener noreferrer" className="text-digilore-secondary hover:underline">
                    github.com/TOV-003
                </a>
            </p>

            <p>
                <a href="mailto:victortoba03@gmail.com" className="text-digilore-secondary hover:underline">
                    victortoba03@gmail.com
                </a>
            </p>
            <p className="text-lg">All videogame data is gotten from rawg.io</p>
        </footer>
    );
}
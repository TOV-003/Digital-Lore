import Footer from "./Footer.jsx";
import Navbar from "./Navbar.jsx";

export default function Layout({ children }) {
    return (
        <div className="flex flex-col gap-12" >
            <Navbar />
            {children}
            <Footer />
        </div>
    )
};
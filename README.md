### Project Description: Title Stack

**Title Stack** is a high-performance web application designed for comprehensive video game discovery and database exploration. Built with **React** and **Tailwind CSS**, the platform interfaces with the **RAWG.io API** to provide real-time access to a massive library of gaming data.

The application serves as a central hub for gamers to track industry trends, upcoming releases, and historical archives. It features a sophisticated filtering system that allows users to navigate through dozens of genres and sort results by critical metrics such as Metacritic scores, user ratings, and release timelines.

---

### Key Capabilities

* **Multidimensional Discovery**: Separate data streams for trending titles, future releases, and random discovery to ensure a diverse user experience.
* **Granular Filtering**: Deep-link integration with the RAWG slug system for precise genre-based results.
* **Dynamic Sorting**: Real-time re-ordering of data based on popularity, alphabetical order, or database updates.
* **State-Synchronized Pagination**: An optimized infinite loading system that maintains filter and sort integrity across multiple pages of data.
* **Global Context Architecture**: A centralized state management system that prevents redundant API calls and ensures data consistency throughout the application lifecycle.

---

### Technical Architecture

The project is architected as a Single Page Application (SPA) using **Vite** for rapid development and optimized production builds. It utilizes the **React Context API** for global state management, ensuring that user preferences—such as selected genres or sort orders—persist across navigation. The styling is handled via a utility-first approach with **Tailwind CSS**, allowing for a responsive, dark-themed aesthetic that aligns with modern gaming UI standards. Deployment is optimized for **Vercel**.

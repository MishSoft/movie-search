import { useState, useEffect } from "react";
import axios from "axios";
import { RiMovie2Line } from "react-icons/ri";
import { motion } from "framer-motion"; // Import motion
import Movie from "../types/Movie";

export default function MovieSearch() {
  const [query, setQuery] = useState<string>(""); // Add type for query
  const [movies, setMovies] = useState<Movie[]>([]); // Add Movie type to state
  const [coverImage, setCoverImage] = useState<string>("");

  // Accessing the API key from environment variables
  const apiKey = import.meta.env.VITE_API_KEY;

  // Fetch movies based on search query
  useEffect(() => {
    if (query.length > 2) {
      const fetchMovies = async () => {
        try {
          const response = await axios.get(
            `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
          );
          setMovies(response.data.results); // TypeScript now knows the structure
        } catch (error) {
          console.error("Error fetching movies:", error);
        }
      };

      fetchMovies();
    }
  }, [query, apiKey]);

  // Get value from Input
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  // When hover image item and you'll see bg image this is for that function.
  const handleMovieBgImage = (backdropPath: string | null) => {
    if (backdropPath) {
      // Debugging: Log the backdrop path
      console.log(
        `Setting background to: https://image.tmdb.org/t/p/original${backdropPath}`
      );
      setCoverImage(`https://image.tmdb.org/t/p/original${backdropPath}`); // Update background image URL
    } else {
      setCoverImage(""); // Reset background image
    }
  };

  return (
    <motion.div
      className={`${
        coverImage ? `bg-[url('${coverImage}')]` : "bg-slate-900"
      } flex flex-col justify-center items-center w-full h-screen bg-cover bg-center`}
      style={{
        backgroundImage: `url('${coverImage}')`,
        backgroundSize: "cover", // Ensure background covers the entire div
        backgroundPosition: "center", // Center the background image
        backdropFilter: coverImage ? "blur(10px)" : "none", // Apply blur when backdrop is set
      }}
      initial={{ opacity: 0 }} // Initial state
      animate={{ opacity: 1 }} // Animate to visible
      transition={{ duration: 0.5 }} // Transition duration
    >
      <motion.div
        className="w-[90%] sm:w-[50%] max-w-[100%] flex items-center border p-2 rounded-md bg-slate-700 bg-opacity-70"
        initial={{ scale: 0 }} // Initial scale
        animate={{ scale: 1 }} // Animate to scale 1
        transition={{ duration: 0.3 }} // Transition duration
      >
        <RiMovie2Line className="text-white" size={25} />
        <input
          onChange={handleInputChange}
          className="bg-transparent pl-5 w-full outline-none text-white"
          type="text"
          placeholder="Search movie.."
          value={query}
        />
      </motion.div>

      {movies.length > 0 && (
        <motion.div
          className="w-[90%] overflow-x-hidden max-h-[50%] sm:w-[50%] p-5 bg-white rounded-md mt-5"
          initial={{ opacity: 0 }} // Initial state
          animate={{ opacity: 1 }} // Animate to visible
          transition={{ duration: 0.3 }} // Transition duration
        >
          {movies.map((movie) => (
            <motion.div
              onMouseEnter={() => handleMovieBgImage(movie.backdrop_path)} // Use onMouseEnter for better UX
              onMouseLeave={() => handleMovieBgImage(null)} // Reset on mouse leave
              key={movie.id}
              className="flex items-start justify-start gap-5 mb-5"
              initial={{ scale: 0.95 }} // Scale down
              whileHover={{ scale: 1.05 }} // Scale up on hover
              transition={{ type: "spring", stiffness: 300 }} // Spring animation for hover effect
            >
              <img
                className="w-[30%] md:w-[15%]"
                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                alt={movie.title}
              />
              <div className="flex flex-col jus gap-2">
                <h2 className="font-bold text-gray-800">{movie.title}</h2>
                <h3>Year: {new Date(movie.release_date).getFullYear()}</h3>
                <p className="max-w-[100%] overflow-y-auto max-h-[90px]">
                  {movie.overview}
                </p>
                <a
                  href={`https://www.themoviedb.org/movie/${movie.id}`}
                  target="_blank" // Opens link in a new tab
                  rel="noopener noreferrer" // Security measure
                  className="p-1 w-[150px] mt-5 bg-blue-500 text-center rounded-full text-white font-semibold"
                >
                  Watch
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </motion.div>
  );
}

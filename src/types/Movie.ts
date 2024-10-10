// Define the Movie type
interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  overview: string;
  backdrop_path: string | null; // Allow null for movies without a backdrop
}

export default Movie;

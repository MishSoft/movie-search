import BackgroundAnimation from "./BackgroundAnimation";
import { Link } from "react-router-dom";
export default function Hero() {
  return (
    <BackgroundAnimation>
      <section className="text-center p-5">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to the Movie Search App
        </h1>
        <p className="mb-6">
          Here, you can find any movie you want. Start exploring now!
        </p>
        <Link
          to="pages/search"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Get started
        </Link>
      </section>
    </BackgroundAnimation>
  );
}

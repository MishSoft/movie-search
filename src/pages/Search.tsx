import { useState } from "react";
import { RiMovie2Line } from "react-icons/ri";
import { motion } from "framer-motion"; // Import framer-motion

export default function Search() {
  const [activeInput, setActiveInput] = useState<boolean>(false);

  const handleInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== "") {
      setActiveInput(true);
    } else {
      setActiveInput(false);
    }
  };

  return (
    <div className="bg-slate-900 flex flex-col justify-center items-center w-full h-screen">
      <div className="w-[90%] sm:w-[50%] max-w-[100%] flex items-center border p-2 rounded-md bg-slate-700">
        <RiMovie2Line size={25} className="text-white" />
        <input
          onChange={handleInputValue}
          className="bg-transparent pl-5 w-full outline-none text-white"
          type="text"
          placeholder="Search movie.."
        />
      </div>

      {activeInput && (
        <motion.div
          className="w-[90%] sm:w-[50%] p-5 bg-white rounded-md mt-5"
          initial={{ opacity: 0, y: 20 }} // Initial animation state
          animate={{ opacity: 1, y: 0 }} // Animation when activeInput becomes true
          transition={{ duration: 0.5 }} // Animation duration
        >
          <div className="flex items-center justify-around md:justify-start md:gap-10">
            <img
              className="w-[30%] md:w-[15%]"
              src="https://cdn.marvel.com/content/1x/deadpoolandwolverine_lob_crd_03.jpg"
              alt="Movie Image"
            />
            <div className="flex flex-col gap-2">
              <h2 className="font-bold text-gray-800">Deadpool & Wolverine</h2>
              <h3>Year: 2024</h3>
              <h4>Movie Time: 2h 8m</h4>
              <a
                className="p-1 w-[50%] bg-blue-600 rounded-md text-white text-center font-semibold"
                href="#"
              >
                Watch
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

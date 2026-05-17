import { useEffect, useState } from "react";
import apiInstance from "../utils/axios";

import Contents from "./Contents";

function Homepage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem("theme");
    return saved ? saved === "dark" : true;
  });

  const navItems = ["Home", "Features", "Pricing", "Blog", "About"];

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  const request = async () => {
    try {
      await apiInstance.get("generate");
    } catch (error) {
      console.error("API request failed:", error);
    }
  }

  useEffect(() => {
    request();
  }, []);

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-300 ${
      isDarkMode
        ? "bg-black text-white"
        : "bg-white text-black"
    }`}>

      {/* MAIN BACKGROUND GRADIENT */}
      <div className={`absolute inset-0 transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-br from-black via-zinc-900 to-black"
          : "bg-gradient-to-br from-white via-zinc-100 to-white"
      }`}></div>

      {/* TOP CENTER GLOW */}
      {/* <div className="absolute top-[-250px] left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-white/[0.12] blur-3xl rounded-full"></div> */}

      {/* RIGHT GLOW */}
      <div className={`absolute top-20 right-[-150px] w-[600px] h-[600px] blur-3xl rounded-full transition-colors duration-300 ${
        isDarkMode ? "bg-white/[0.06]" : "bg-black/[0.06]"
      }`}></div>

      {/* LEFT BOTTOM GLOW */}
      <div className={`absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] blur-3xl rounded-full transition-colors duration-300 ${
        isDarkMode ? "bg-zinc-400/[0.08]" : "bg-zinc-600/[0.08]"
      }`}></div>

      {/* EXTRA ATMOSPHERIC OVERLAY */}
      <div className={`absolute inset-0 transition-colors duration-300 ${
        isDarkMode
          ? "bg-gradient-to-b from-white/[0.03] via-transparent to-black"
          : "bg-gradient-to-b from-black/[0.03] via-transparent to-white"
      }`}></div>

      {/* GRID OVERLAY */}
      <div
        className={`absolute inset-0 transition-colors duration-300 ${
          isDarkMode ? "opacity-[0.03]" : "opacity-[0.05]"
        }`}
        style={{
          backgroundImage: isDarkMode
            ? "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)"
            : "linear-gradient(to right, black 1px, transparent 1px), linear-gradient(to bottom, black 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      ></div>

      {/* CONTENT */}
      <Contents  isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} navItems={navItems} menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

    </div>
  );
}

export default Homepage;
import { useState, useEffect } from "react";
import apiInstance from "../utils/axios";
import { Menu, Send, X, Sun, Moon, Sparkles } from "lucide-react";

function Contents({
  isDarkMode,
  setIsDarkMode,
  navItems,
  menuOpen,
  setMenuOpen,
}) {
  const [jobTitle, setJobTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const texts = [
    "Generate thoughtful, role-specific interview questions instantly using AI.",
    "Practice smarter, prepare faster, and stand out with confidence.",
  ];

  const [displayText, setDisplayText] = useState("");
  const [textIndex, setTextIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentText = texts[textIndex];
    let timeout;

    if (!isDeleting) {
      // Typing
      if (charIndex < currentText.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);
        }, 50);
      } else {
        // Pause before deleting
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 1500);
      }
    } else {
      // Deleting
      if (charIndex > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentText.slice(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);
        }, 30);
      } else {
        // Move to next text ONLY after fully cleared
        setIsDeleting(false);
        setTextIndex((prev) => (prev + 1) % texts.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, textIndex]);

  const generateQuestions = async () => {
    if (!jobTitle.trim()) return;

    try {
      setLoading(true);
      setError("");
      setQuestions([]);

      const response = await apiInstance.post("generate/", {
        job_title: jobTitle,
      });

      setQuestions(response.data.questions);
    } catch (err) {
      console.error(err);
      setError("Failed to generate interview questions.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative z-10">
      {/* HEADER */}
      <nav className="relative z-40 flex items-center justify-between bg-transparent px-4 py-4 sm:px-6 lg:px-8 lg:py-6 gap-4">
        {/* LOGO */}
        <div className="text-xl sm:text-2xl font-bold tracking-tight">
          ✦ PrepWise
        </div>

        {/* NAV LINKS */}
        <div
          className={`hidden md:flex items-center gap-8 text-sm transition-colors duration-300 ${
            isDarkMode
              ? "text-zinc-400 bg-white/[0.03] border border-white/[0.08]"
              : "text-zinc-600 bg-black/[0.03] border border-black/[0.08]"
          } backdrop-blur-xl px-6 py-3 rounded-full`}
        >
          {navItems.map((item) => (
            <a
              key={item}
              href="#"
              className={`transition ${
                isDarkMode ? "hover:text-white" : "hover:text-black"
              }`}
            >
              {item}
            </a>
          ))}
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex items-center gap-4">
          <button
            type="button"
            className={`inline-flex h-10 w-10 items-center justify-center rounded-full transition ${
              isDarkMode
                ? "bg-white/[0.1] hover:bg-white/[0.15]"
                : "bg-black/[0.1] hover:bg-black/[0.15]"
            }`}
            onClick={() => setIsDarkMode(!isDarkMode)}
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            className={`transition px-6 py-3 rounded-full font-medium ${
              isDarkMode
                ? "bg-zinc-900 text-white hover:bg-zinc-700"
                : "bg-zinc-200 text-black hover:bg-zinc-300"
            } shadow-lg`}
          >
            Contact Us
          </button>
        </div>

        {/* MOBILE MENU BUTTON */}
        <button
          type="button"
          className={`md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-xl transition ${
            isDarkMode
              ? "border border-white/[0.08] bg-white/[0.03] text-white hover:bg-white/[0.06]"
              : "border border-black/[0.08] bg-black/[0.03] text-black hover:bg-black/[0.06]"
          }`}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {/* MOBILE MENU */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ${
            menuOpen
              ? "pointer-events-auto opacity-100"
              : "pointer-events-none opacity-0"
          }`}
        >
          <div
            className={`absolute inset-0 backdrop-blur-2xl ${
              isDarkMode ? "bg-black/90" : "bg-white/90"
            }`}
            onClick={() => setMenuOpen(false)}
          />

          <div
            className={`relative flex h-full flex-col px-4 pt-4 pb-8 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="text-xl font-bold tracking-tight">
                ✦ PrepWise
              </div>

              <button
                className={`inline-flex h-11 w-11 items-center justify-center rounded-full ${
                  isDarkMode
                    ? "border border-white/[0.08] bg-white/[0.03]"
                    : "border border-black/[0.08] bg-black/[0.03]"
                }`}
                onClick={() => setMenuOpen(false)}
              >
                <X size={20} />
              </button>
            </div>

            <div
              className={`mt-10 flex-1 overflow-y-auto p-4 shadow-2xl backdrop-blur-xl rounded-[2rem] border ${
                isDarkMode
                  ? "border-white/[0.08] bg-white/[0.03]"
                  : "border-black/[0.08] bg-black/[0.03]"
              }`}
            >
              <div className="flex flex-col gap-3">
                {navItems.map((item) => (
                  <a
                    key={item}
                    href="#"
                    className={`px-5 py-4 text-base font-medium transition rounded-2xl ${
                      isDarkMode
                        ? "text-zinc-100 hover:bg-white/[0.08]"
                        : "text-zinc-900 hover:bg-black/[0.08]"
                    }`}
                  >
                    {item}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <div className="flex flex-col items-center justify-center px-6 pt-10 pb-20 sm:pt-16 transition-colors duration-300">
        {/* BADGE */}
        <div
          className={`mb-8 px-4 py-2 rounded-full backdrop-blur-xl text-sm ${
            isDarkMode
              ? "border border-white/[0.08] bg-white/[0.03] text-zinc-300"
              : "border border-black/[0.08] bg-black/[0.03] text-zinc-700"
          }`}
        >
          ✦ AI-Powered Interview Preparation
        </div>

        {/* HEADING */}
        <div className="text-center max-w-5xl">
          <h1
            className={`text-5xl md:text-7xl font-semibold leading-[1.1] tracking-tight mb-8 ${
              isDarkMode ? "text-white" : "text-black"
            }`}
          >
            AI-Powered Interview Preparation
            <br />
            <span
              className={`${isDarkMode ? "text-zinc-400" : "text-zinc-600"}`}
            >
              for Modern Professionals
            </span>
          </h1>

          {/* SUBTEXT */}
          <p
            className={`text-lg md:text-xl leading-relaxed max-w-2xl mx-auto min-h-[60px] ${
              isDarkMode ? "text-zinc-400" : "text-zinc-600"
            }`}
          >
            {displayText}
            <span className="animate-pulse">|</span>
          </p>
        </div>

        {/* INPUT CONTAINER */}
        <div className="w-full max-w-4xl mt-16">
          <div
            className={`backdrop-blur-2xl rounded-[2rem] p-6 shadow-2xl ${
              isDarkMode
                ? "bg-white/[0.04] border border-white/[0.08]"
                : "bg-black/[0.04] border border-black/[0.08]"
            }`}
          >
            {/* INPUT */}
            <div className="mb-6">
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    generateQuestions();
                  }
                }}
                placeholder="e.g. Customer Success Manager"
                className={`w-full bg-transparent text-lg outline-none ${
                  isDarkMode
                    ? "text-white placeholder:text-zinc-500"
                    : "text-black placeholder:text-zinc-400"
                }`}
              />
            </div>

            {/* CONTROLS */}
            <div className="flex items-center justify-between flex-wrap gap-4">
              {/* LEFT */}
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm ${
                    isDarkMode
                      ? "bg-white/[0.03] border border-white/[0.08] text-zinc-300"
                      : "bg-black/[0.03] border border-black/[0.08] text-zinc-700"
                  }`}
                >
                  <Sparkles size={16} />
                  AI Powered
                </div>
              </div>

              {/* SEND BUTTON */}
              <button
                onClick={generateQuestions}
                disabled={loading}
                className={`w-12 h-12 rounded-full transition flex items-center justify-center shadow-xl ${
                  isDarkMode
                    ? "bg-white text-black hover:bg-zinc-200"
                    : "bg-black text-white hover:bg-zinc-800"
                } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* LOADING */}
        {loading && (
          <div className="mt-10">
            <p
              className={`text-lg ${
                isDarkMode ? "text-zinc-400" : "text-zinc-600"
              }`}
            >
              Generating thoughtful interview questions...
            </p>
          </div>
        )}

        {/* ERROR */}
        {error && (
          <div className="mt-8">
            <p className="text-red-500 text-lg">{error}</p>
          </div>
        )}

        {/* QUESTIONS */}
        {questions.length > 0 && (
          <div className="mt-16 w-full max-w-4xl">
            <div
              className={`backdrop-blur-2xl rounded-[2rem] p-8 shadow-2xl ${
                isDarkMode
                  ? "bg-white/[0.04] border border-white/[0.08]"
                  : "bg-black/[0.04] border border-black/[0.08]"
              }`}
            >
              <h2
                className={`text-2xl font-semibold mb-8 ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                AI-Generated Interview Questions
              </h2>

              <div className="space-y-6">
                {questions.map((question, index) => (
                  <div
                    key={index}
                    className={`p-5 rounded-2xl ${
                      isDarkMode
                        ? "bg-white/[0.03] border border-white/[0.06]"
                        : "bg-black/[0.03] border border-black/[0.06]"
                    }`}
                  >
                    <p
                      className={`text-lg leading-relaxed ${
                        isDarkMode ? "text-zinc-200" : "text-zinc-800"
                      }`}
                    >
                      {index + 1}. {question}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Contents;

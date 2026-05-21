function Footer({ isDarkMode }) {
  const contactCards = [
    {
      label: "Email",
      value: "akinniranoluwatosin22@gmail.com",
      href: "mailto:akinniranoluwatosin22@gmail.com",
    },
    {
      label: "LinkedIn",
      value: "https://linkedin.com/in/akinniran-oluwatosin",
      href: "https://www.linkedin.com/in/akinniran-oluwatosin/",
    },
    {
      label: "GitHub",
      value: "https://github.com/Akinniran",
      href: "https://github.com/Akinniran",
    },
    {
      label: "Location",
      value: "Remote / Open to opportunities",
      href: null,
    },
  ];

  return (
    <footer id="contact-footer" className="relative z-10 scroll-mt-32 px-6 pb-16 sm:px-8 lg:px-12">
      <div
        className={`mx-auto w-full max-w-6xl overflow-hidden rounded-[2.25rem] border backdrop-blur-2xl shadow-2xl ${
          isDarkMode
            ? "border-white/[0.08] bg-white/[0.04]"
            : "border-black/[0.08] bg-black/[0.04]"
        }`}
      >
        <div className="grid gap-10 px-6 py-8 sm:px-8 md:grid-cols-[1.25fr_1fr] md:gap-12 md:px-10 md:py-10">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-current/10 px-4 py-2 text-sm font-medium tracking-wide">
              <span className="h-2 w-2 rounded-full bg-current" />
              Let&apos;s connect
            </div>

            <h2
              className={`mt-5 text-3xl font-semibold tracking-tight sm:text-4xl ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Have a role, project, or opportunity in mind?
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {contactCards.map((item) => {
              const CardTag = item.href ? "a" : "div";

              return (
                <CardTag
                  key={item.label}
                  href={item.href || undefined}
                  target={item.href && !item.href.startsWith("mailto:") ? "_blank" : undefined}
                  rel={item.href && !item.href.startsWith("mailto:") ? "noreferrer" : undefined}
                  className={`group rounded-[1.5rem] border p-4 transition duration-300 hover:-translate-y-1 ${
                    isDarkMode
                      ? "border-white/[0.08] bg-black/[0.2] hover:bg-white/[0.06]"
                      : "border-black/[0.08] bg-white/[0.35] hover:bg-black/[0.06]"
                  }`}
                >
                  <div
                    className={`text-xs font-semibold uppercase tracking-[0.2em] ${
                      isDarkMode ? "text-zinc-500" : "text-zinc-500"
                    }`}
                  >
                    {item.label}
                  </div>
                  <div
                    className={`mt-3 text-sm font-medium leading-6 break-words ${
                      isDarkMode ? "text-zinc-100" : "text-zinc-900"
                    }`}
                  >
                    {item.value}
                  </div>
                  {item.href && (
                    <div
                      className={`mt-4 text-sm font-medium transition ${
                        isDarkMode
                          ? "text-zinc-400 group-hover:text-white"
                          : "text-zinc-600 group-hover:text-black"
                      }`}
                    >
                      Open contact
                    </div>
                  )}
                </CardTag>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

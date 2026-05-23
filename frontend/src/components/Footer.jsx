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
    <footer
      id="contact-footer"
      className="relative scroll-mt-32 px-4 pb-12 sm:px-8 sm:pb-16 lg:px-12"
    >
      <div
        className={`mx-auto w-full max-w-6xl overflow-hidden rounded-3xl border backdrop-blur-2xl shadow-2xl sm:rounded-[2.25rem] ${
          isDarkMode
            ? "border-white/8 bg-white/4"
            : "border-black/8 bg-black/4"
        }`}
      >
        <div className="grid gap-8 px-5 py-6 sm:px-8 sm:py-8 md:grid-cols-[1.25fr_1fr] md:gap-12 md:px-10 md:py-10">
          <div className="text-center md:text-left">
            <div className="mx-auto inline-flex items-center gap-2 rounded-full border border-current/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] md:mx-0">
              <span className="h-2 w-2 rounded-full bg-current" />
              Let&apos;s connect
            </div>

            <h2
              className={`mt-5 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl ${
                isDarkMode ? "text-white" : "text-black"
              }`}
            >
              Have a role, project, or opportunity in mind?
            </h2>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
            {contactCards.map((item) => {
              const CardTag = item.href ? "a" : "div";

              return (
                <CardTag
                  key={item.label}
                  href={item.href || undefined}
                  target={item.href && !item.href.startsWith("mailto:") ? "_blank" : undefined}
                  rel={item.href && !item.href.startsWith("mailto:") ? "noreferrer" : undefined}
                  className={`group rounded-3xl border p-5 transition duration-300 active:scale-[0.99] md:hover:-translate-y-1 sm:p-4 ${
                    isDarkMode
                      ? "border-white/8 bg-black/20 hover:bg-white/6"
                      : "border-black/8 bg-white/35 hover:bg-black/6"
                  }`}
                >
                  <div
                    className={`text-[0.7rem] font-semibold uppercase tracking-[0.22em] ${
                      isDarkMode ? "text-zinc-500" : "text-zinc-500"
                    }`}
                  >
                    {item.label}
                  </div>
                  <div
                    className={`mt-3 wrap-break-word text-sm font-medium leading-6 sm:text-[0.95rem] ${
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

function Footer({ isDarkMode }) {
  const contactCards = [
    {
      label: "Email",
      value: "akinniranoluwatosin22@gmail.com",
      href: "mailto:akinniranoluwatosin22@gmail.com",
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/akinniran-oluwatosin",
      href: "https://www.linkedin.com/in/akinniran-oluwatosin/",
    },
    {
      label: "GitHub",
      value: "github.com/Akinniran",
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
      className="relative scroll-mt-32 px-4 pb-14 sm:px-6 lg:px-10"
    >
      <div
        className={`mx-auto w-full max-w-6xl overflow-hidden rounded-[2rem] border backdrop-blur-2xl shadow-[0_10px_60px_rgba(0,0,0,0.15)] ${
          isDarkMode
            ? "border-white/[0.08] bg-white/[0.04]"
            : "border-black/[0.08] bg-white/60"
        }`}
      >
        <div className="flex flex-col gap-10 px-5 py-8 sm:px-8 sm:py-10 md:grid md:grid-cols-[1.1fr_1fr] md:gap-12 md:px-10">
          
          {/* LEFT CONTENT */}
          <div className="flex flex-col justify-between">
            <div>
              <div
                className={`inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium tracking-[0.18em] uppercase ${
                  isDarkMode
                    ? "border-white/10 text-zinc-300"
                    : "border-black/10 text-zinc-700"
                }`}
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400" />
                Let&apos;s connect
              </div>

              <h2
                className={`mt-5 text-2xl font-semibold leading-tight tracking-tight sm:text-3xl lg:text-4xl ${
                  isDarkMode ? "text-white" : "text-black"
                }`}
              >
                Have a role, project, or opportunity in mind?
              </h2>

              <p
                className={`mt-4 max-w-xl text-sm leading-7 sm:text-base ${
                  isDarkMode ? "text-zinc-400" : "text-zinc-600"
                }`}
              >
                I&apos;m open to collaborating on innovative products,
                full-stack engineering roles, and impactful software
                solutions.
              </p>
            </div>
          </div>

          {/* RIGHT CONTENT */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {contactCards.map((item) => {
              const CardTag = item.href ? "a" : "div";

              return (
                <CardTag
                  key={item.label}
                  href={item.href || undefined}
                  target={
                    item.href && !item.href.startsWith("mailto:")
                      ? "_blank"
                      : undefined
                  }
                  rel={
                    item.href && !item.href.startsWith("mailto:")
                      ? "noreferrer"
                      : undefined
                  }
                  className={`group flex min-h-[150px] flex-col justify-between rounded-[1.5rem] border p-5 transition-all duration-300 hover:-translate-y-1 ${
                    isDarkMode
                      ? "border-white/[0.08] bg-black/[0.25] hover:bg-white/[0.06]"
                      : "border-black/[0.08] bg-white/70 hover:bg-black/[0.04]"
                  }`}
                >
                  <div>
                    <div
                      className={`text-[11px] font-semibold uppercase tracking-[0.22em] ${
                        isDarkMode ? "text-zinc-500" : "text-zinc-500"
                      }`}
                    >
                      {item.label}
                    </div>

                    <div
                      className={`mt-4 text-sm font-medium leading-6 break-words sm:text-[15px] ${
                        isDarkMode ? "text-zinc-100" : "text-zinc-900"
                      }`}
                    >
                      {item.value}
                    </div>
                  </div>

                  {item.href && (
                    <div
                      className={`mt-6 flex items-center gap-2 text-sm font-medium transition-all ${
                        isDarkMode
                          ? "text-zinc-400 group-hover:text-white"
                          : "text-zinc-600 group-hover:text-black"
                      }`}
                    >
                      Open contact
                      <span className="transition-transform duration-300 group-hover:translate-x-1">
                        →
                      </span>
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
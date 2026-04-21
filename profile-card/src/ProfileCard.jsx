import { useState, useEffect, useRef } from "react";

/* ─── profile data ─────────────────────────────────────────── */
const PROFILE = {
  name: "Jordan Avery",
  bio: "Product designer & creative technologist crafting interfaces that balance beauty with function. I believe good design is invisible — it just feels right.",
  avatarUrl: "https://api.dicebear.com/9.x/lorelei/svg?seed=JordanAvery&backgroundColor=1a1a2e",
  social: [
    { network: "twitter",  label: "Twitter / X",  href: "https://twitter.com",   icon: TwitterIcon  },
    { network: "github",   label: "GitHub",        href: "https://github.com",    icon: GitHubIcon   },
    { network: "linkedin", label: "LinkedIn",      href: "https://linkedin.com",  icon: LinkedInIcon },
    { network: "dribbble", label: "Dribbble",      href: "https://dribbble.com",  icon: DribbbleIcon },
  ],
  hobbies: ["Generative art", "Mechanical keyboards", "Specialty coffee", "Film photography", "Trail running"],
  dislikes: ["Dark patterns", "Infinite scroll", "Sans-serif overuse", "Modal abuse", "Slow feedback loops"],
};

/* ─── icons ───────────────────────────────────────────────── */
function TwitterIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.257 5.628 5.907-5.628Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  );
}
function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  );
}
function DribbbleIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 24C5.385 24 0 18.615 0 12S5.385 0 12 0s12 5.385 12 12-5.385 12-12 12zm10.12-10.358c-.35-.11-3.17-.953-6.384-.438 1.34 3.684 1.887 6.684 1.992 7.308 2.304-1.555 3.936-4.02 4.395-6.87zm-6.115 7.808c-.153-.9-.75-4.032-2.19-7.77l-.066.02c-5.79 2.015-7.86 6.025-8.04 6.4 1.73 1.358 3.92 2.166 6.29 2.166 1.42 0 2.77-.29 4.01-.816zm-11.62-2.073c.232-.472 3.025-5.558 8.333-7.288.138-.045.278-.084.418-.12-.27-.615-.57-1.227-.888-1.83-5.236 1.568-10.322 1.503-10.77 1.494-.003.09-.006.18-.006.27 0 2.893 1.098 5.54 2.91 7.474zM2.1 9.67c.457.006 4.818.044 9.758-1.315-1.75-3.11-3.64-5.727-3.922-6.1-2.95 1.392-5.124 4.05-5.836 7.415zm7.81-8.165c.294.38 2.22 2.994 3.952 6.19 3.77-1.415 5.365-3.56 5.553-3.82C17.595 2.2 15.005 1.016 12.094 1.016c-.8 0-1.578.1-2.326.283zm9.75 4.28c-.214.29-1.97 2.58-5.88 4.19.244.502.477 1.01.695 1.522.077.185.15.373.224.56 3.407-.43 6.79.258 7.128.33-.035-2.573-.95-4.94-2.168-6.602z"/>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════
   COMPONENT
══════════════════════════════════════════════════════════════ */
export default function ProfileCard() {
  const [now, setNow] = useState(Date.now());
  const [imgSrc, setImgSrc] = useState(PROFILE.avatarUrl);
  const fileRef = useRef(null);

  /* live clock — updates every 1000ms */
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setImgSrc(url);
  };

  return (
    <>
      <style>{css}</style>
      <div className="page-bg">
        <div className="noise" aria-hidden="true" />
        <div className="grid-lines" aria-hidden="true" />

        <main className="page-wrap">
          <header className="page-eyebrow">
            <span className="dot" aria-hidden="true" />
            <span>Frontend Wizards · Stage 1B</span>
          </header>

          <article
            className="profile-card"
            data-testid="test-profile-card"
            aria-label={`Profile card for ${PROFILE.name}`}
          >
            {/* ── LEFT COLUMN ── */}
            <div className="col-left">

              {/* avatar */}
              <figure className="avatar-figure">
                <button
                  className="avatar-wrap"
                  onClick={() => fileRef.current?.click()}
                  aria-label="Click to upload a new avatar photo"
                  title="Upload avatar"
                >
                  <img
                    src={imgSrc}
                    alt={`Avatar of ${PROFILE.name}`}
                    data-testid="test-user-avatar"
                    className="avatar-img"
                    onError={() => setImgSrc(`https://api.dicebear.com/9.x/initials/svg?seed=${encodeURIComponent(PROFILE.name)}`)}
                  />
                  <span className="avatar-overlay" aria-hidden="true">
                    <CameraIcon />
                  </span>
                </button>
                <figcaption className="avatar-caption">
                  <span className="avatar-name" data-testid="test-user-name">{PROFILE.name}</span>
                  <span className="avatar-role">Product Designer</span>
                </figcaption>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  style={{ display: "none" }}
                  onChange={handleFileChange}
                  aria-label="Upload avatar image"
                />
              </figure>

              {/* time */}
              <div className="time-block" aria-live="polite" aria-atomic="true" aria-label="Current epoch time in milliseconds">
                <span className="time-label">EPOCH · MS</span>
                <span className="time-value" data-testid="test-user-time">{now}</span>
              </div>

              {/* social */}
              <nav aria-label="Social media links">
                <ul className="social-list" data-testid="test-user-social-links">
                  {PROFILE.social.map(({ network, label, href, icon: Icon }) => (
                    <li key={network}>
                      <a
                        href={href}
                        className="social-link"
                        data-testid={`test-user-social-${network}`}
                        aria-label={`${label} — opens in new tab`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Icon />
                        <span>{label}</span>
                        <span className="link-arrow" aria-hidden="true">↗</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="col-right">

              {/* bio */}
              <section aria-labelledby="bio-heading">
                <h2 id="bio-heading" className="section-heading">About</h2>
                <p className="bio-text" data-testid="test-user-bio">{PROFILE.bio}</p>
              </section>

              <div className="lists-row">
                {/* hobbies */}
                <section aria-labelledby="hobbies-heading">
                  <h2 id="hobbies-heading" className="section-heading">
                    <span className="heading-dot like" aria-hidden="true" />
                    Hobbies
                  </h2>
                  <ul className="tag-list" data-testid="test-user-hobbies">
                    {PROFILE.hobbies.map((h) => (
                      <li key={h} className="tag tag--like">{h}</li>
                    ))}
                  </ul>
                </section>

                {/* dislikes */}
                <section aria-labelledby="dislikes-heading">
                  <h2 id="dislikes-heading" className="section-heading">
                    <span className="heading-dot dislike" aria-hidden="true" />
                    Dislikes
                  </h2>
                  <ul className="tag-list" data-testid="test-user-dislikes">
                    {PROFILE.dislikes.map((d) => (
                      <li key={d} className="tag tag--dislike">{d}</li>
                    ))}
                  </ul>
                </section>
              </div>

            </div>
          </article>

          <footer className="page-footer">
            <span>Frontend Wizards © 2026</span>
          </footer>
        </main>
      </div>
    </>
  );
}

/* ─── camera icon ─────────────────────────────────────────── */
function CameraIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/>
      <circle cx="12" cy="13" r="4"/>
    </svg>
  );
}

/* ─── styles ──────────────────────────────────────────────── */
const css = `
/* ── reset & tokens ── */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:        #0a0a0f;
  --surf:      #111118;
  --surf2:     #18181f;
  --surf3:     #22222c;
  --bdr:       rgba(255,255,255,.07);
  --bdr2:      rgba(255,255,255,.12);
  --txt:       #eeeef5;
  --txt2:      #9191a8;
  --txt3:      #55556a;
  --accent:    #c8f060;
  --accent2:   #7b6ef6;
  --like:      #4ade80;
  --like-bg:   rgba(74,222,128,.1);
  --dislike:   #f87171;
  --dislike-bg:rgba(248,113,113,.1);
  --r:         20px;
  --rs:        10px;
  --ff:        'Syne', sans-serif;
  --fm:        'DM Mono', monospace;
  --ease:      .2s ease;
}

body {
  background: var(--bg);
  color: var(--txt);
  font-family: var(--ff);
  -webkit-font-smoothing: antialiased;
}

/* ── background ── */
.page-bg {
  min-height: 100vh;
  position: relative;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 48px 16px;
}

.noise {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
  opacity: .5;
}
.grid-lines {
  position: fixed; inset: 0; z-index: 0; pointer-events: none;
  background-image:
    linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px);
  background-size: 48px 48px;
}

/* ── page layout ── */
.page-wrap {
  position: relative; z-index: 1;
  width: 100%; max-width: 920px;
  display: flex; flex-direction: column; gap: 20px;
}

.page-eyebrow {
  display: flex; align-items: center; gap: 8px;
  font-family: var(--fm); font-size: 10.5px;
  color: var(--txt3); letter-spacing: .15em; text-transform: uppercase;
}
.dot {
  width: 6px; height: 6px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 8px var(--accent);
  animation: pulse 2s ease-in-out infinite;
}
@keyframes pulse {
  0%,100% { opacity: 1; transform: scale(1); }
  50%      { opacity: .5; transform: scale(.8); }
}

/* ── card ── */
.profile-card {
  background: var(--surf);
  border: 1px solid var(--bdr);
  border-radius: var(--r);
  display: grid;
  grid-template-columns: 260px 1fr;
  gap: 0;
  overflow: hidden;
  box-shadow: 0 40px 80px rgba(0,0,0,.5), 0 0 0 1px var(--bdr);
  animation: fadeUp .5s ease both;
}
@keyframes fadeUp {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* ── left column ── */
.col-left {
  background: var(--surf2);
  border-right: 1px solid var(--bdr);
  padding: 32px 24px;
  display: flex; flex-direction: column; gap: 28px;
}

/* avatar */
.avatar-figure { display: flex; flex-direction: column; align-items: center; gap: 12px; }

.avatar-wrap {
  position: relative; display: block;
  width: 96px; height: 96px; border-radius: 50%;
  border: 2px solid var(--bdr2);
  overflow: hidden; cursor: pointer;
  background: var(--surf3);
  transition: border-color var(--ease), transform var(--ease);
  flex-shrink: 0;
}
.avatar-wrap:hover { border-color: var(--accent); transform: scale(1.04); }
.avatar-wrap:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
.avatar-img { width: 100%; height: 100%; object-fit: cover; display: block; }
.avatar-overlay {
  position: absolute; inset: 0;
  background: rgba(0,0,0,.55);
  display: flex; align-items: center; justify-content: center;
  color: #fff; opacity: 0; transition: opacity var(--ease);
}
.avatar-wrap:hover .avatar-overlay { opacity: 1; }

.avatar-caption { text-align: center; }
.avatar-name {
  display: block; font-size: 17px; font-weight: 700;
  color: var(--txt); letter-spacing: -.02em;
}
.avatar-role {
  display: block; margin-top: 3px;
  font-family: var(--fm); font-size: 10px;
  color: var(--txt3); letter-spacing: .1em; text-transform: uppercase;
}

/* time */
.time-block {
  background: var(--surf3);
  border: 1px solid var(--bdr);
  border-radius: var(--rs);
  padding: 12px 14px;
}
.time-label {
  display: block; font-family: var(--fm); font-size: 9px;
  color: var(--txt3); letter-spacing: .15em; margin-bottom: 6px;
}
.time-value {
  display: block; font-family: var(--fm); font-size: 12.5px;
  color: var(--accent); word-break: break-all; line-height: 1.4;
}

/* social */
.social-list { list-style: none; display: flex; flex-direction: column; gap: 4px; }
.social-link {
  display: flex; align-items: center; gap: 9px;
  padding: 9px 12px; border-radius: var(--rs);
  border: 1px solid transparent;
  color: var(--txt2); font-family: var(--fm);
  font-size: 11.5px; text-decoration: none;
  transition: all var(--ease);
}
.social-link:hover {
  background: var(--surf3); border-color: var(--bdr2); color: var(--txt);
}
.social-link:focus-visible { outline: 2px solid var(--accent); outline-offset: 2px; }
.link-arrow { margin-left: auto; font-size: 12px; opacity: .4; transition: opacity var(--ease); }
.social-link:hover .link-arrow { opacity: 1; color: var(--accent); }

/* ── right column ── */
.col-right {
  padding: 32px 28px;
  display: flex; flex-direction: column; gap: 28px;
}

/* section heading */
.section-heading {
  display: flex; align-items: center; gap: 7px;
  font-size: 10px; font-weight: 600; letter-spacing: .14em;
  text-transform: uppercase; color: var(--txt3);
  margin-bottom: 12px;
}
.heading-dot {
  width: 7px; height: 7px; border-radius: 50%; flex-shrink: 0;
}
.heading-dot.like    { background: var(--like); }
.heading-dot.dislike { background: var(--dislike); }

/* bio */
.bio-text {
  font-family: var(--fm); font-size: 13px; font-weight: 300;
  font-style: italic; color: var(--txt2);
  line-height: 1.8; word-break: break-word;
}

/* lists */
.lists-row {
  display: grid; grid-template-columns: 1fr 1fr; gap: 24px;
}
.tag-list { list-style: none; display: flex; flex-wrap: wrap; gap: 6px; }
.tag {
  padding: 4px 11px; border-radius: 99px;
  font-family: var(--fm); font-size: 10.5px;
  border: 1px solid transparent;
}
.tag--like    { background: var(--like-bg);    color: var(--like);    border-color: rgba(74,222,128,.2); }
.tag--dislike { background: var(--dislike-bg); color: var(--dislike); border-color: rgba(248,113,113,.2); }

/* ── footer ── */
.page-footer {
  text-align: center;
  font-family: var(--fm); font-size: 9.5px;
  color: var(--txt3); letter-spacing: .1em;
}

/* ── responsive ── */
@media (max-width: 680px) {
  .profile-card {
    grid-template-columns: 1fr;
  }
  .col-left {
    border-right: none;
    border-bottom: 1px solid var(--bdr);
    padding: 24px 20px;
  }
  .col-right { padding: 24px 20px; }
  .lists-row { grid-template-columns: 1fr; }
}

@media (min-width: 681px) and (max-width: 860px) {
  .profile-card { grid-template-columns: 220px 1fr; }
}

/* ── skip link for a11y ── */
.sr-only {
  position: absolute; width: 1px; height: 1px;
  padding: 0; margin: -1px; overflow: hidden;
  clip: rect(0,0,0,0); white-space: nowrap; border: 0;
}
`;

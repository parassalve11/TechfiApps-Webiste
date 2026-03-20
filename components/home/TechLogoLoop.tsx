"use client";

import { useReducedMotion } from "framer-motion";

const techStack = [
  { name: "Next.js", src: "https://api.iconify.design/simple-icons/nextdotjs.svg?color=%23111111" },
  { name: "TypeScript", src: "https://api.iconify.design/simple-icons/typescript.svg?color=%233178c6" },
  { name: "Docker", src: "https://api.iconify.design/simple-icons/docker.svg?color=%232496ed" },
  { name: "AWS CLI", src: "https://api.iconify.design/simple-icons/amazonaws.svg?color=%23ff9900" },
  { name: "FastAPI", src: "https://api.iconify.design/simple-icons/fastapi.svg?color=%23009688" },
  { name: "PostgreSQL", src: "https://api.iconify.design/simple-icons/postgresql.svg?color=%23336791" },
  { name: "Knex.js", src: "https://api.iconify.design/simple-icons/knexdotjs.svg?color=%238d5c2d" },
  { name: "React", src: "https://api.iconify.design/simple-icons/react.svg?color=%2361dafb" },
  { name: "React Native", src: "https://api.iconify.design/simple-icons/react.svg?color=%2361dafb" },
  { name: "Node.js", src: "https://api.iconify.design/simple-icons/nodedotjs.svg?color=%233c873a" },
  { name: "Prisma", src: "https://api.iconify.design/simple-icons/prisma.svg?color=%230c344b" },
  { name: "Emergent", src: "https://worldvectorlogo.com/logos/emergent-1.svg" },
  { name: "Codex", src: "https://api.iconify.design/simple-icons/openai.svg?color=%23111111" },
  { name: "Flutter", src: "https://api.iconify.design/simple-icons/flutter.svg?color=%2302569B" },
];

export default function TechLogoLoop() {
  const reduceMotion = useReducedMotion();
  const logos = [...techStack, ...techStack];

  return (
    <section className="bg-[#fff9f1] py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="logo-loop" aria-label="Technology logos">
          <div className={`logo-track ${reduceMotion ? "logo-track-still" : ""}`}>
            {logos.map((logo, index) => (
              <div key={`${logo.name}-${index}`} className="logo-item">
                <img className="logo-icon" src={logo.src} alt={`${logo.name} logo`} loading="lazy" />
                <span className="logo-text">{logo.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

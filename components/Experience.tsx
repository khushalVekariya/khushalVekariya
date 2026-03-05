"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import TextReveal from "./TextReveal";

const experiences = [
  {
    period: "July 2021 — Present",
    role: "Freelancer Full Stack Developer",
    company: "Freelancer",
    description:
      "Building scalable SaaS platforms and web applications for global clients. Achieved Top Rated Plus status on Upwork (Top 3% of talent). Specializing in Laravel, Vue.js, and AI integrations.",
    tags: ["Laravel", "Vue.js", "Nuxt.js", "React", "AI Integration", "Stripe"],
    current: true,
  },
  {
    period: "October 2019 — June 2021",
    role: "Software Engineer",
    company: "Logix Built Infotech",
    description:
      "Developed and maintained full-stack web applications. Collaborated with cross-functional teams to deliver scalable solutions and improve existing systems.",
    tags: ["Laravel", "Vue.js", "MySQL", "REST API", "JavaScript"],
    current: false,
  },
  {
    period: "June 2018 — September 2019",
    role: "Web Developer",
    company: "Settings Infotech",
    description:
      "Built responsive web applications and contributed to frontend and backend development. Gained foundational experience in modern web technologies and best practices.",
    tags: ["PHP", "JavaScript", "HTML/CSS", "MySQL", "jQuery"],
    current: false,
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 sm:py-28 relative overflow-x-hidden"
    >
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Parallax background glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-accent/[0.04] blur-[120px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div>
          <p className="text-accent font-mono text-sm mb-3 tracking-wider">
            02 / Experience
          </p>
          <TextReveal
            as="h2"
            className="text-3xl sm:text-5xl font-bold mb-4 block"
          >
            Career Journey
          </TextReveal>
          <div className="glow-line mb-12" style={{ width: 80 }} />
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div
            className="absolute left-[5px] md:left-8 top-0 w-px bg-gradient-to-b from-accent via-accent/30 to-transparent"
          />

          <div className="space-y-12">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ x: -20 }}
                whileInView={{ x: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.08,
                  ease: [0.25, 0.4, 0.25, 1],
                }}
                className="relative pl-8 md:pl-20"
              >
                {/* Timeline dot */}
                <div
                  className={`absolute left-0 md:left-[28px] top-1.5 w-3 h-3 rounded-full border-2 ${
                    exp.current
                      ? "border-accent bg-accent shadow-[0_0_12px_rgba(108,99,255,0.6)]"
                      : "border-white/20 bg-background"
                  }`}
                >
                  {exp.current && (
                    <span className="absolute inset-0 rounded-full bg-accent animate-ping opacity-30" />
                  )}
                </div>

                {/* Content */}
                <motion.div
                  whileHover={{ x: 6 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-xs font-mono text-accent/60 tracking-wider">
                      {exp.period}
                    </span>
                    {exp.current && (
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent/70">
                        Current
                      </span>
                    )}
                  </div>
                  <h3 className="text-xl font-semibold text-white/90 mb-1">
                    {exp.role}
                  </h3>
                  <p className="text-sm text-accent/50 font-medium mb-3">
                    {exp.company}
                  </p>
                  <p className="text-sm text-white/40 leading-relaxed mb-4 max-w-2xl">
                    {exp.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag, tagIndex) => (
                      <span
                        key={tag}
                        className="text-xs font-mono px-3 py-1 rounded-lg bg-white/[0.04] text-white/40 border border-white/[0.06] hover:border-accent/30 hover:text-accent/70 transition-all duration-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

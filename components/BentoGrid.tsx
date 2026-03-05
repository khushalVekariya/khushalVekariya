"use client";

import { useRef, useState, ReactNode } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import CountUp from "./CountUp";

// 3D Tilt + Spotlight card for bento cells
function BentoCard({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    setTilt({ x: (y - cy) / 25, y: (cx - x) / 25 });
    setMousePos({ x, y });
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40, scale: 0.92, filter: "blur(10px)" }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.06] bg-[#0a0a12]/80 backdrop-blur-xl group ${className}`}
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
        transition: "transform 0.15s ease-out",
      }}
    >
      {/* Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px, rgba(108, 99, 255, 0.08), transparent 40%)`,
        }}
      />
      {/* Border glow */}
      <div
        className="pointer-events-none absolute -inset-px rounded-[inherit] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `radial-gradient(300px circle at ${mousePos.x}px ${mousePos.y}px, rgba(108, 99, 255, 0.2), transparent 40%)`,
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "exclude",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />
      <div className="relative z-10 h-full">{children}</div>
    </motion.div>
  );
}

// Tech data
const techRow1 = [
  { name: "PHP", color: "#777BB4" },
  { name: "Laravel", color: "#FF2D20" },
  { name: "Vue.js", color: "#4FC08D" },
  { name: "Nuxt.js", color: "#00DC82" },
  { name: "React", color: "#61DAFB" },
  { name: "Next.js", color: "#ffffff" },
  { name: "TypeScript", color: "#3178C6" },
  { name: "JavaScript", color: "#F7DF1E" },
  { name: "Tailwind CSS", color: "#06B6D4" },
];

const techRow2 = [
  { name: "MySQL", color: "#4479A1" },
  { name: "PostgreSQL", color: "#4169E1" },
  { name: "MongoDB", color: "#47A248" },
  { name: "Redis", color: "#DC382D" },
  { name: "AWS", color: "#FF9900" },
  { name: "Docker", color: "#2496ED" },
  { name: "OpenAI", color: "#412991" },
  { name: "Stripe", color: "#635BFF" },
  { name: "Git", color: "#F05032" },
];

function TechMarquee({
  items,
  reverse = false,
}: {
  items: typeof techRow1;
  reverse?: boolean;
}) {
  const doubled = [...items, ...items];
  return (
    <div className="flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]">
      <div
        className={`flex gap-3 shrink-0 will-change-transform ${
          reverse ? "animate-marquee-reverse" : "animate-marquee"
        }`}
      >
        {doubled.map((tech, i) => (
          <div
            key={i}
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.04] border border-white/[0.06] hover:border-accent/30 transition-colors duration-300 shrink-0"
          >
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: tech.color }}
            />
            <span className="text-xs text-white/60 font-mono whitespace-nowrap">
              {tech.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Terminal code display
function TerminalCode() {
  const lines = [
    {
      indent: 0,
      content: (
        <>
          <span className="text-purple-400">const</span>{" "}
          <span className="text-blue-300">khushal</span>{" "}
          <span className="text-white/40">=</span> {"{"}
        </>
      ),
    },
    {
      indent: 1,
      content: (
        <>
          <span className="text-white/40">role:</span>{" "}
          <span className="text-emerald-400">
            &quot;Senior Full Stack Dev&quot;
          </span>
          ,
        </>
      ),
    },
    {
      indent: 1,
      content: (
        <>
          <span className="text-white/40">focus:</span>{" "}
          <span className="text-emerald-400">
            &quot;SaaS &amp; AI Integration&quot;
          </span>
          ,
        </>
      ),
    },
    {
      indent: 1,
      content: (
        <>
          <span className="text-white/40">stack:</span> [
          <span className="text-amber-300">&quot;Laravel&quot;</span>,{" "}
          <span className="text-amber-300">&quot;Vue&quot;</span>,{" "}
          <span className="text-amber-300">&quot;React&quot;</span>],
        </>
      ),
    },
    {
      indent: 1,
      content: (
        <>
          <span className="text-white/40">upwork:</span>{" "}
          <span className="text-emerald-400">
            &quot;Top Rated Plus&quot;
          </span>
          ,
        </>
      ),
    },
    {
      indent: 0,
      content: (
        <>
          {"}"}<span className="text-white/40">;</span>
        </>
      ),
    },
  ];

  return (
    <div className="font-mono text-xs leading-relaxed">
      {lines.map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 + i * 0.1 }}
          className="flex"
        >
          <span className="text-white/15 w-6 text-right mr-4 select-none">
            {i + 1}
          </span>
          <span style={{ paddingLeft: `${line.indent * 20}px` }}>
            {line.content}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

// Stat data
const stats = [
  {
    value: "6+",
    label: "Years Experience",
    gradient: "from-accent to-purple-400",
  },
  {
    value: "50+",
    label: "Projects Delivered",
    gradient: "from-blue-400 to-accent",
  },
  {
    value: "Top 3%",
    label: "Upwork Talent",
    gradient: "from-accent to-emerald-400",
  },
  {
    value: "100%",
    label: "Client Satisfaction",
    gradient: "from-purple-400 to-accent",
  },
];

export default function BentoGrid() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  return (
    <section id="about" ref={sectionRef} className="py-20 sm:py-28 relative overflow-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Parallax background glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-blue-500/[0.03] blur-[120px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <motion.p
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="text-accent font-mono text-sm mb-3 tracking-wider"
          >
            01 / About
          </motion.p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4">
          {/* Intro Card - Large */}
          <BentoCard
            className="md:col-span-2 lg:row-span-2 p-8 lg:p-10"
            delay={0}
          >
            <div className="flex flex-col justify-between h-full">
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
                  Building products,
                  <br />
                  <span className="gradient-text">not just code</span>
                </h2>
                <p className="text-white/40 text-[15px] leading-relaxed max-w-md">
                  Senior Full Stack Developer with 6+ years building scalable
                  SaaS applications. I combine solid engineering with AI
                  capabilities to ship high-impact digital products.
                </p>
              </div>
              <div className="flex gap-3 mt-6">
                <a
                  href="#projects"
                  className="px-5 py-2.5 bg-accent hover:bg-accent-light text-white text-sm font-medium rounded-xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(108,99,255,0.3)]"
                >
                  View Work
                </a>
                <a
                  href="#contact"
                  className="px-5 py-2.5 border border-white/10 hover:border-accent/30 text-white/60 hover:text-white text-sm font-medium rounded-xl transition-all duration-300"
                >
                  Contact
                </a>
              </div>
            </div>
          </BentoCard>

          {/* Stat Cards */}
          {stats.map((stat, i) => (
            <BentoCard
              key={stat.label}
              className="p-6 flex flex-col items-center justify-center text-center"
              delay={0.1 + i * 0.05}
            >
              <CountUp
                value={stat.value}
                className={`text-3xl lg:text-4xl font-bold bg-gradient-to-r ${stat.gradient} bg-clip-text text-transparent mb-2 block`}
              />
              <p className="text-[11px] text-white/30 uppercase tracking-widest font-mono">
                {stat.label}
              </p>
            </BentoCard>
          ))}

          {/* Tech Stack Marquee - Full width */}
          <BentoCard className="col-span-full p-6" delay={0.3}>
            <p className="text-xs text-white/30 uppercase tracking-widest font-mono mb-4">
              Tech Stack
            </p>
            <div className="space-y-3">
              <TechMarquee items={techRow1} />
              <TechMarquee items={techRow2} reverse />
            </div>
          </BentoCard>

          {/* Terminal Code Card */}
          <BentoCard className="md:col-span-2 p-6" delay={0.35}>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
              </div>
              <span className="text-[10px] text-white/20 font-mono ml-2">
                whoami.ts
              </span>
            </div>
            <TerminalCode />
          </BentoCard>

          {/* Location Card */}
          <BentoCard
            className="p-6 flex flex-col justify-center"
            delay={0.4}
          >
            <div className="text-2xl mb-2">&#x1F4CD;</div>
            <p className="text-white/80 font-medium text-sm">
              Gujarat, India
            </p>
            <p className="text-white/30 text-xs mt-1">UTC +5:30</p>
          </BentoCard>

          {/* Available Card */}
          <BentoCard
            className="p-6 flex flex-col justify-center"
            delay={0.45}
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <span className="text-emerald-400 text-xs font-mono">
                Available
              </span>
            </div>
            <p className="text-white/80 font-medium text-sm">
              Open for projects
            </p>
            <p className="text-white/30 text-xs mt-1">Freelance & Contract</p>
          </BentoCard>
        </div>
      </div>
    </section>
  );
}

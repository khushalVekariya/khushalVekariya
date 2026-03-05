"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import MagneticButton from "./MagneticButton";

const roles = [
  "Senior Full Stack Developer",
  "SaaS Architect",
  "Vue.js & Laravel Expert",
  "AI Integration Specialist",
];

const stats = [
  { value: "6+", label: "Years Experience" },
  { value: "50+", label: "Projects Delivered" },
  { value: "30+", label: "Happy Clients" },
];

const staggerContainer = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.03, delayChildren: 0.3 },
  },
};

const letterAnim = {
  hidden: { y: 30, opacity: 0, scale: 0.7, rotateX: -90 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.7, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, delay, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const slideIn = {
  hidden: { opacity: 0, x: -40, filter: "blur(8px)" },
  show: (delay: number) => ({
    opacity: 1,
    x: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

export default function HeroNoImage() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const smoothY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacityFade = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const scaleDown = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  const shape1Y = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const shape2Y = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const shape3Y = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const ringRotate = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const ringScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.2]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX.set((e.clientX - innerWidth / 2) * 0.02);
      mouseY.set((e.clientY - innerHeight / 2) * 0.02);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const current = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(() => setText(current.slice(0, text.length + 1)), 80);
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), 2000);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 40);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  const nameChars = "Khushal Vekariya".split("");

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 hero-gradient" />

      {/* Mouse-reactive gradient orb */}
      <motion.div
        style={{ x: smoothX, y: smoothY }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-gradient-to-br from-accent/[0.08] via-purple-500/[0.04] to-transparent blur-3xl pointer-events-none"
      />

      {/* Parallax floating shapes */}
      <motion.div style={{ y: shape1Y }} className="absolute top-[12%] left-[5%] w-72 h-72 rounded-full border border-accent/[0.07]" />
      <motion.div style={{ y: shape2Y }} className="absolute top-[55%] right-[8%] w-48 h-48 rounded-full border border-purple-500/[0.06]" />
      <motion.div style={{ y: shape3Y }} className="absolute top-[25%] right-[20%] w-3 h-3 rounded-full bg-accent/20" />
      <motion.div style={{ y: shape1Y }} className="absolute bottom-[20%] left-[15%] w-2 h-2 rounded-full bg-purple-400/20" />
      <motion.div style={{ y: shape2Y }} className="absolute top-[18%] right-[12%] w-1.5 h-1.5 rounded-full bg-blue-400/30" />
      <motion.div
        style={{ y: shape3Y }}
        className="absolute top-[70%] left-[8%] w-4 h-4 rounded-full bg-accent/10"
        animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        style={{ y: shape1Y }}
        className="absolute top-[40%] right-[5%] w-2.5 h-2.5 rounded-full bg-purple-400/15"
        animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />

      {/* Rotating rings */}
      <motion.div style={{ y: shape3Y, rotate: ringRotate, scale: ringScale }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full border border-accent/[0.05] border-dashed"
        />
      </motion.div>
      <motion.div style={{ y: shape2Y, rotate: ringRotate, scale: ringScale }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px]">
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full border border-purple-500/[0.04]"
        />
      </motion.div>
      <motion.div style={{ y: shape1Y, rotate: ringRotate }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
          className="w-full h-full rounded-full border border-blue-500/[0.04]"
        />
      </motion.div>

      {/* Main content */}
      <motion.div
        style={{ y: yParallax, opacity: opacityFade, scale: scaleDown }}
        className="relative max-w-6xl mx-auto px-6 py-32 text-center z-10"
      >
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
          className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-accent/15 bg-accent/[0.04] backdrop-blur-sm mb-10"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
          </span>
          <span className="text-xs text-white/60 font-mono tracking-wider uppercase">
            Available for projects
          </span>
        </motion.div>

        {/* "Hi, I'm" */}
        <motion.div variants={fadeUp} custom={0.2} initial="hidden" animate="show">
          <span className="block text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-white/80 mb-2">
            Hi, I&apos;m
          </span>
        </motion.div>

        {/* Name - per-character stagger with 3D flip */}
        <motion.h1
          variants={staggerContainer}
          initial="hidden"
          animate="show"
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight mb-4 leading-[1.15]"
          style={{ perspective: 600 }}
        >
          {nameChars.map((char, i) => (
            <span key={i} className="inline-block">
              <motion.span
                variants={letterAnim}
                className={`inline-block ${char === " " ? "w-4 sm:w-6 md:w-8" : "gradient-text"}`}
                style={{ transformOrigin: "bottom" }}
              >
                {char === " " ? "\u00A0" : char}
              </motion.span>
            </span>
          ))}
        </motion.h1>

        {/* Typing animation */}
        <motion.div variants={fadeUp} custom={0.8} initial="hidden" animate="show" className="h-10 mb-8">
          <p className="text-lg sm:text-xl md:text-2xl text-white/40 font-mono tracking-wide">
            {text}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
              className="inline-block w-0.5 h-6 bg-accent ml-0.5"
            />
          </p>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={fadeUp}
          custom={1}
          initial="hidden"
          animate="show"
          className="max-w-2xl mx-auto text-base sm:text-lg text-white/35 leading-relaxed mb-12"
        >
          6+ years building scalable SaaS applications with Laravel, Vue.js, and Nuxt.js.
          Experienced in integrating LLM APIs, AI-powered search, and RAG pipelines into production.
        </motion.p>

        {/* Stats row */}
        <motion.div
          variants={fadeUp}
          custom={1.1}
          initial="hidden"
          animate="show"
          className="flex items-center justify-center gap-8 sm:gap-12 mb-12"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={slideIn}
              custom={1.2 + i * 0.15}
              initial="hidden"
              animate="show"
              className="text-center"
            >
              <motion.span
                className="block text-2xl sm:text-3xl font-bold gradient-text"
                whileHover={{ scale: 1.1 }}
              >
                {stat.value}
              </motion.span>
              <span className="text-xs sm:text-sm text-white/30 font-mono">{stat.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* CTAs */}
        <motion.div
          variants={fadeUp}
          custom={1.5}
          initial="hidden"
          animate="show"
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <MagneticButton
            href="#projects"
            className="group relative px-8 py-3.5 bg-accent hover:bg-accent-light text-white text-sm font-medium rounded-xl transition-all duration-300 hover:shadow-[0_0_50px_rgba(108,99,255,0.35)] inline-block"
          >
            <span className="relative z-10 flex items-center gap-2">
              View My Work
              <svg className="w-4 h-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
          </MagneticButton>
          <MagneticButton
            href="#contact"
            className="px-8 py-3.5 border border-white/10 hover:border-accent/40 text-white/70 hover:text-white text-sm font-medium rounded-xl transition-all duration-300 backdrop-blur-sm hover:bg-accent/5 inline-block"
          >
            Get In Touch
          </MagneticButton>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-6 h-10 rounded-full border-2 border-white/10 flex items-start justify-center p-1.5"
          >
            <motion.div
              animate={{ height: [6, 12, 6], opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 rounded-full bg-accent/60"
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}

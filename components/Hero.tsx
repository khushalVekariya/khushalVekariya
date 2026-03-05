"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import Image from "next/image";
import MagneticButton from "./MagneticButton";

const roles = [
  "Senior Full Stack Developer",
  "SaaS Architect",
  "React & Vue.js Expert",
  "Laravel & AI Specialist",
];

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay, ease: [0.25, 0.4, 0.25, 1] },
  }),
};

const letterContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.03, delayChildren: 0.3 } },
};

const letterAnim = {
  hidden: { y: 30, opacity: 0, scale: 0.6, rotateX: -90 },
  show: {
    y: 0,
    opacity: 1,
    scale: 1,
    rotateX: 0,
    transition: { duration: 0.5, ease: [0.25, 0.4, 0.25, 1] },
  },
};

const techBadges = [
  { label: "Vue.js", top: "-12%", left: "5%", delay: 0.8, color: "text-emerald-400", border: "border-emerald-400/25", bg: "bg-emerald-400/5" },
  { label: "Laravel", top: "-5%", right: "-5%", delay: 1.0, color: "text-red-400", border: "border-red-400/25", bg: "bg-red-400/5" },
  { label: "React", bottom: "-5%", left: "0%", delay: 1.2, color: "text-cyan-400", border: "border-cyan-400/25", bg: "bg-cyan-400/5" },
  { label: "AI / LLMs", bottom: "-12%", right: "0%", delay: 1.4, color: "text-yellow-400", border: "border-yellow-400/25", bg: "bg-yellow-400/5" },
];

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 50, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 50, damping: 20 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const yParallax = useTransform(scrollYProgress, [0, 1], [0, -60]);

  const shape1Y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const shape2Y = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const shape3Y = useTransform(scrollYProgress, [0, 1], [0, -60]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!imageRef.current) return;
      const rect = imageRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseX.set((e.clientX - centerX) * 0.02);
      mouseY.set((e.clientY - centerY) * 0.02);
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
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      <div className="absolute inset-0 hero-gradient" />

      {/* Animated parallax shapes */}
      <motion.div
        style={{ y: shape1Y }}
        animate={{ scale: [1, 1.1, 1], opacity: [0.07, 0.12, 0.07] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[15%] left-[8%] w-64 h-64 rounded-full border border-accent/[0.07]"
      />
      <motion.div
        style={{ y: shape2Y }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.1, 0.06] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute top-[60%] right-[10%] w-40 h-40 rounded-full border border-purple-500/[0.06]"
      />
      <motion.div
        style={{ y: shape3Y }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[30%] right-[25%] w-3 h-3 rounded-full bg-accent/20"
      />
      <motion.div
        style={{ y: shape1Y }}
        animate={{ scale: [1, 1.8, 1], opacity: [0.2, 0.5, 0.2] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-[25%] left-[20%] w-2 h-2 rounded-full bg-purple-400/20"
      />
      <motion.div
        style={{ y: shape2Y }}
        animate={{ x: [0, 10, 0], y: [0, -8, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[20%] right-[15%] w-1.5 h-1.5 rounded-full bg-blue-400/30"
      />
      {/* Extra floating particles */}
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 8, 0], opacity: [0, 0.4, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-[45%] left-[12%] w-1 h-1 rounded-full bg-accent/40"
      />
      <motion.div
        animate={{ y: [0, 15, 0], x: [0, -10, 0], opacity: [0, 0.3, 0] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        className="absolute top-[70%] right-[30%] w-1.5 h-1.5 rounded-full bg-purple-400/30"
      />

      {/* Main content - split layout */}
      <motion.div
        style={{ y: yParallax }}
        className="relative w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-32 sm:pt-24 pb-24 z-10 flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16"
      >
        {/* Left side - Text content */}
        <div className="flex-1 text-center lg:text-left">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.25, 0.4, 0.25, 1] }}
            className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-accent/15 bg-accent/[0.04] backdrop-blur-sm mb-8"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            <span className="text-xs text-white/80 font-mono tracking-wider uppercase">
              Available for projects
            </span>
          </motion.div>

          {/* "Hi, I'm" with blur-in */}
          <motion.div variants={fadeUp} custom={0.2} initial="hidden" animate="show">
            <span className="block text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white mb-2">
              Hi, I&apos;m
            </span>
          </motion.div>

          {/* Name - per-character 3D flip animation */}
          <motion.h1
            variants={letterContainer}
            initial="hidden"
            animate="show"
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-5 leading-[1.1] sm:whitespace-nowrap"
            style={{ perspective: 600 }}
          >
            {nameChars.map((char, i) => (
              <span key={i} className="inline-block">
                <motion.span
                  variants={letterAnim}
                  className={`inline-block ${char === " " ? "w-3 sm:w-4" : "gradient-text"}`}
                  style={{ transformOrigin: "bottom center" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              </span>
            ))}
          </motion.h1>

          {/* Typing animation */}
          <motion.div variants={fadeUp} custom={0.8} initial="hidden" animate="show" className="h-10 mb-8">
            <p className="text-lg sm:text-xl text-white/60 font-mono tracking-wide">
              {text}
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
                className="inline-block w-0.5 h-5 bg-accent ml-0.5"
              />
            </p>
          </motion.div>

          {/* Description */}
          <motion.p
            variants={fadeUp}
            custom={1}
            initial="hidden"
            animate="show"
            className="max-w-xl text-base sm:text-lg text-white/55 leading-relaxed mb-10"
          >
            6+ years building scalable SaaS applications with Laravel, Vue.js, and Nuxt.js.
            Experienced in integrating LLM APIs, AI-powered search, and RAG pipelines into production.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={fadeUp}
            custom={1.2}
            initial="hidden"
            animate="show"
            className="flex flex-col sm:flex-row items-center lg:items-start gap-4"
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
        </div>

        {/* Right side - Profile image with magical effects */}
        <motion.div
          ref={imageRef}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.4, 0.25, 1] }}
          className="relative flex-shrink-0 w-[220px] h-[220px] sm:w-[300px] sm:h-[300px] lg:w-[340px] lg:h-[340px]"
        >
          {/* Pulsing glow */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.15, 0.3, 0.15] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[-15px] rounded-full bg-gradient-to-br from-accent/30 via-purple-500/20 to-blue-500/10 blur-2xl"
          />

          {/* Outer rings */}
          <motion.div
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-[-20px] rounded-full border border-accent/10"
          />
          <div className="absolute inset-[-50px] rounded-full border border-purple-500/[0.06]" />

          {/* Rotating dashed ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-35px] rounded-full border border-accent/[0.1] border-dashed"
          />

          {/* Counter-rotating ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-55px] rounded-full border border-purple-400/[0.06] border-dotted"
          />

          {/* Profile image circle - follows mouse slightly */}
          <motion.div
            style={{ x: springX, y: springY }}
            className="relative w-full h-full rounded-full overflow-hidden border-2 border-accent/30 shadow-[0_0_60px_rgba(108,99,255,0.2)]"
          >
            <Image
              src="/khushal.png"
              alt="Khushal Vekariya"
              fill
              className="object-cover object-top scale-105"
              priority
            />
          </motion.div>

          {/* Floating tech badges - hidden on very small screens */}
          {techBadges.map((badge) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: badge.delay, type: "spring", bounce: 0.4 }}
              className="absolute z-10"
              style={{
                top: badge.top,
                left: badge.left,
                right: badge.right,
                bottom: badge.bottom,
              }}
            >
              <motion.div
                animate={{ y: [0, -5, 0], x: [0, 2, 0] }}
                transition={{ duration: 3 + badge.delay, repeat: Infinity, ease: "easeInOut" }}
                className={`px-3 py-1.5 rounded-lg bg-black/80 backdrop-blur-md border ${badge.border} ${badge.bg} text-xs font-mono ${badge.color} whitespace-nowrap shadow-lg`}
              >
                {badge.label}
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
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
    </section>
  );
}

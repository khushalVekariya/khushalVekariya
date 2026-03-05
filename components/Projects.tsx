"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { ExternalLink, Github } from "lucide-react";
import TextReveal from "./TextReveal";
import SpotlightCard from "./SpotlightCard";

const featured = {
  title: "MantisHub",
  subtitle: "Bug Tracking & Project Management SaaS",
  description:
    "Full-stack development and DevOps for a hosted MantisBT platform. Classic UI built on core PHP, modern interface powered by PHP and Vue.js. Managing the entire server infrastructure on DigitalOcean, domain management via AWS Route 53, handling deployments, performance optimization, and scaling for enterprise clients.",
  tags: ["PHP", "Vue.js", "DigitalOcean", "AWS Route 53", "MySQL", "Docker"],
  link: "https://mantishub.com/",
  github: "#",
  logo: "/logos/mantishub-icon.png",
  gradient: "from-emerald-500/20 to-accent/20",
  accentColor: "from-emerald-500 to-accent",
};

const projects = [
  {
    title: "Mintbird",
    subtitle: "Funnel Builder SaaS Platform",
    description:
      "Real-time drag-and-drop page and cart builder with Stripe, PayPal integrations. Custom domain (CNAME) system supporting 100+ domains with analytics dashboard.",
    tags: ["Vue.js", "Laravel", "Stripe", "PayPal", "MySQL"],
    link: "https://app.mintbird.com/",
    github: "#",
    logo: "/logos/mintbird.png",
    gradient: "from-accent/20 to-blue-500/20",
    accentColor: "from-accent to-blue-500",
  },
  {
    title: "Quizforma",
    subtitle: "AI Quiz Generation Platform",
    description:
      "AI-powered quiz creation with drag-and-drop builder, branching logic for personalized results, lead capture with CRM integrations, and engagement analytics.",
    tags: ["Vue.js", "Laravel", "OpenAI", "REST API", "Tailwind CSS"],
    link: "https://app.quizforma.com/",
    github: "#",
    logo: "/logos/quizforma.png",
    gradient: "from-purple-500/20 to-accent/20",
    accentColor: "from-purple-500 to-accent",
  },
  {
    title: "CourseSprout",
    subtitle: "Online Course Management System",
    description:
      "Scalable platform for online courses with structured lessons, video handling, centralized resource library, and admin dashboard for content management.",
    tags: ["Nuxt.js", "Laravel", "REST API", "MySQL", "Tailwind CSS"],
    link: "https://app.coursesprout.com/",
    github: "#",
    logo: "/logos/coursesprout.png",
    gradient: "from-accent/20 to-emerald-500/20",
    accentColor: "from-accent to-emerald-500",
  },
  {
    title: "PopLinks",
    subtitle: "Bio Link & Mini Page Builder",
    description:
      "Link-in-bio platform with customizable mini pages, social media integration, click analytics, and custom domain support for personal branding.",
    tags: ["Vue.js", "Laravel", "REST API", "Analytics", "Tailwind CSS"],
    link: "https://app.poplinks.io/",
    github: "#",
    logo: "/logos/poplinks.png",
    gradient: "from-green-500/20 to-accent/20",
    accentColor: "from-green-500 to-accent",
  },
  {
    title: "Taskick",
    subtitle: "Task & Project Management Tool",
    description:
      "Streamlined project management with task tracking, team collaboration, progress dashboards, and workflow automation for productive teams.",
    tags: ["Vue.js", "Laravel", "REST API", "MySQL", "Tailwind CSS"],
    link: "https://taskick.net",
    github: "#",
    logo: "/logos/taskick.png",
    gradient: "from-pink-500/20 to-purple-500/20",
    accentColor: "from-pink-500 to-purple-500",
  },
  {
    title: "Servervy",
    subtitle: "Server Monitoring & Management Platform",
    description:
      "Real-time server monitoring with automated alerts, performance analytics, and customizable dashboards. Supports multiple infrastructures with seamless integrations for optimal uptime and reliability.",
    tags: ["React", "Nuxt", "Tailwind CSS", "Tailwind UI", "Figma"],
    link: "#",
    github: "#",
    logo: "/logos/servervy.svg",
    gradient: "from-blue-500/20 to-cyan-500/20",
    accentColor: "from-blue-500 to-cyan-500",
  },
];

function ProjectCard({
  project,
  index,
  isFeatured = false,
}: {
  project: (typeof projects)[number] & { logo?: string };
  index: number;
  isFeatured?: boolean;
}) {
  return (
    <SpotlightCard className="group gradient-border h-full border border-white/[0.04]">
      <div className={`${isFeatured ? "p-8 sm:p-10" : "p-6 sm:p-8"} h-full flex flex-col relative`}>
        <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-[inherit]`} />

        <div className="relative z-10 flex flex-col h-full">
          <motion.div
            className={`h-0.5 rounded-full bg-gradient-to-r ${project.accentColor} mb-6`}
            initial={{ width: 48 }}
            whileInView={{ width: isFeatured ? 80 : 48 }}
            whileHover={{ width: isFeatured ? 120 : 80 }}
            transition={{ duration: 0.5 }}
          />

          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              {project.logo && (
                <div
                  className={`${isFeatured ? "w-10 h-10" : "w-8 h-8"} rounded-lg bg-white/[0.06] border border-white/[0.08] flex items-center justify-center p-1.5 group-hover:border-accent/20 transition-colors duration-300`}
                >
                  <Image src={project.logo} alt={project.title} width={32} height={32} className="object-contain" />
                </div>
              )}
              <span className="font-mono text-accent/40 text-sm">
                {String(index + 1).padStart(2, "0")}
              </span>
              {isFeatured && (
                <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-accent/10 border border-accent/20 text-accent/70">
                  Featured
                </span>
              )}
            </div>
            <div className="flex gap-3">
              {project.github !== "#" && (
                <motion.a href={project.github} whileHover={{ scale: 1.2, y: -2 }} className="text-white/30 hover:text-accent transition-colors duration-300" aria-label="GitHub" target="_blank" rel="noopener noreferrer">
                  <Github size={18} />
                </motion.a>
              )}
              {project.link !== "#" && (
                <motion.a href={project.link} whileHover={{ scale: 1.2, y: -2 }} className="text-white/30 hover:text-accent transition-colors duration-300" aria-label="Live link" target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={18} />
                </motion.a>
              )}
            </div>
          </div>

          <h3 className={`${isFeatured ? "text-2xl sm:text-3xl" : "text-xl"} font-semibold mb-1 text-white/90 group-hover:text-white transition-colors duration-300`}>
            {project.title}
          </h3>
          <p className="text-xs font-mono text-accent/50 mb-3">{project.subtitle}</p>
          <p className={`${isFeatured ? "text-[15px]" : "text-sm"} text-white/40 leading-relaxed mb-6 flex-grow group-hover:text-white/50 transition-colors duration-300`}>
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, tagIndex) => (
              <span
                key={tag}
                className="text-xs font-mono px-3 py-1 rounded-lg bg-white/[0.04] text-white/40 border border-white/[0.06] hover:border-accent/30 hover:text-accent/70 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </SpotlightCard>
  );
}

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [80, -80]);

  return (
    <section id="projects" ref={sectionRef} className="py-20 sm:py-28 relative overflow-x-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      {/* Parallax background glow */}
      <motion.div
        style={{ y: bgY }}
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full bg-purple-500/[0.03] blur-[100px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div>
          <p className="text-accent font-mono text-sm mb-3 tracking-wider">
            03 / Projects
          </p>
          <TextReveal as="h2" className="text-3xl sm:text-5xl font-bold mb-4 block">
            Selected work
          </TextReveal>
          <div className="glow-line mb-12" style={{ width: 80 }} />
        </div>

        {/* Featured project - full width */}
        <motion.div
          initial={{ y: 20 }}
          whileInView={{ y: 0 }}
          viewport={{ once: true, margin: "-20px" }}
          transition={{ duration: 0.5, ease: [0.25, 0.4, 0.25, 1] }}
          className="mb-6"
        >
          <ProjectCard project={featured} index={0} isFeatured />
        </motion.div>

        {/* Other projects - 2 column grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ y: 20 }}
              whileInView={{ y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{
                duration: 0.5,
                delay: i * 0.06,
                ease: [0.25, 0.4, 0.25, 1],
              }}
            >
              <ProjectCard project={project} index={i + 1} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

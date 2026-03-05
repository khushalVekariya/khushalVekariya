"use client";

import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Github, href: "https://github.com/khushalVekariya", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/khushal-vekariya/", label: "LinkedIn" },
  {
    icon: ({ size = 16 }: { size?: number }) => (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703 0 1.491-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"/>
      </svg>
    ),
    href: "https://www.upwork.com/freelancers/~01d2581528ac697aeb",
    label: "Upwork",
  },
  { icon: Mail, href: "mailto:i.khushalvekariya@gmail.com", label: "Email" },
];

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="relative border-t border-white/[0.06]"
    >
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8">
          {/* Brand & Description */}
          <div className="md:col-span-1">
            <motion.a
              href="#"
              className="font-mono text-lg font-medium tracking-wide group inline-block mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <span className="text-accent">&lt;</span>
              <span className="text-white/80">KV</span>
              <span className="text-accent">/&gt;</span>
            </motion.a>
            <p className="text-sm text-white/35 leading-relaxed max-w-xs">
              Senior Full Stack Developer specializing in scalable SaaS applications, AI integration, and modern web technologies.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4">
              Navigation
            </h4>
            <ul className="space-y-2.5">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-sm text-white/35 hover:text-accent transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/50 mb-4">
              Connect
            </h4>
            <div className="flex flex-wrap gap-2 mb-4">
              {socials.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-white/30 hover:text-accent border border-white/[0.06] hover:border-accent/30 hover:bg-accent/10 transition-all duration-300"
                  aria-label={social.label}
                >
                  <social.icon size={16} />
                </motion.a>
              ))}
            </div>
            <a
              href="mailto:i.khushalvekariya@gmail.com"
              className="text-sm text-white/35 hover:text-accent transition-colors duration-200"
            >
              i.khushalvekariya@gmail.com
            </a>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/20">
            &copy; {new Date().getFullYear()} Khushal Vekariya. All rights reserved.
          </p>
          <p className="text-xs text-white/20">
            {/* Built with Next.js & Tailwind CSS */}
          </p>
        </div>
      </div>
    </motion.footer>
  );
}

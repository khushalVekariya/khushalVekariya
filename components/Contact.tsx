"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Mail, MapPin, Send, CheckCircle, AlertCircle } from "lucide-react";
import TextReveal from "./TextReveal";
import MagneticButton from "./MagneticButton";
import SpotlightCard from "./SpotlightCard";

function FloatingLabelInput({
  label,
  name,
  type = "text",
  isTextarea = false,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  isTextarea?: boolean;
  value: string;
  onChange: (val: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const isActive = focused || value.length > 0;

  const inputClasses =
    "w-full px-4 pt-6 pb-2 rounded-xl bg-white/[0.03] border border-white/[0.06] text-sm text-white/80 focus:outline-none focus:border-accent/40 transition-all duration-300 peer";

  return (
    <div className="relative group">
      {isTextarea ? (
        <textarea
          name={name}
          rows={4}
          className={`${inputClasses} resize-none`}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      ) : (
        <input
          name={name}
          type={type}
          className={inputClasses}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          onChange={(e) => onChange(e.target.value)}
          value={value}
        />
      )}
      <motion.label
        animate={{
          y: isActive ? -8 : 0,
          scale: isActive ? 0.75 : 1,
          color: focused ? "rgba(108, 99, 255, 0.8)" : "rgba(255, 255, 255, 0.2)",
        }}
        transition={{ duration: 0.2 }}
        className="absolute left-4 top-4 text-sm origin-left pointer-events-none"
      >
        {label}
      </motion.label>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: focused ? 1 : 0 }}
        className="absolute bottom-0 left-4 right-4 h-px bg-gradient-to-r from-accent/50 via-accent to-accent/50 origin-left"
      />
    </div>
  );
}

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], [60, -60]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed");

      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 sm:py-28 relative overflow-x-hidden">
      <div className="section-divider absolute top-0 left-0 right-0" />

      <motion.div
        style={{ y: bgY }}
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-accent/[0.03] blur-[100px] pointer-events-none"
      />

      <div className="max-w-6xl mx-auto px-6 relative">
        <div>
          <p className="text-accent font-mono text-sm mb-3 tracking-wider">
            04 / Contact
          </p>
          <TextReveal as="h2" className="text-3xl sm:text-5xl font-bold mb-4 block">
            Let&apos;s build something worth launching
          </TextReveal>
          <div className="glow-line mb-8" style={{ width: 80 }} />
          <p
            className="text-white/40 max-w-xl mb-12 text-[15px] leading-relaxed"
          >
            Have a SaaS idea or need a developer who can own it end-to-end?
            I&apos;d love to hear about your project.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            {[
              {
                icon: <Mail size={18} />,
                label: "Email",
                content: (
                  <a href="mailto:i.khushalvekariya@gmail.com" className="text-sm text-white/70 hover:text-accent transition-colors">
                    i.khushalvekariya@gmail.com
                  </a>
                ),
              },
              {
                icon: <MapPin size={18} />,
                label: "Location",
                content: <p className="text-sm text-white/70">Gujarat, India</p>,
              },
              {
                icon: <Send size={18} />,
                label: "Upwork",
                content: (
                  <p className="text-sm text-white/70">
                    <span className="text-accent font-medium">Top Rated Plus</span> &mdash; Available for hire
                  </p>
                ),
                highlight: true,
              },
            ].map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ y: 15 }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: [0.25, 0.4, 0.25, 1] }}
              >
                <SpotlightCard
                  className={`rounded-2xl border ${
                    item.highlight ? "border-accent/20 bg-accent/[0.03]" : "border-white/[0.06] bg-white/[0.02]"
                  }`}
                >
                  <div className="flex items-center gap-4 p-5">
                    <motion.div
                      whileHover={{ rotate: 10, scale: 1.1 }}
                      className="w-11 h-11 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-accent"
                    >
                      {item.icon}
                    </motion.div>
                    <div>
                      <p className="text-xs text-white/30 mb-0.5 uppercase tracking-wider">{item.label}</p>
                      {item.content}
                    </div>
                  </div>
                </SpotlightCard>
              </motion.div>
            ))}
          </div>

          <motion.form
            initial={{ y: 15 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.4, delay: 0.24, ease: [0.25, 0.4, 0.25, 1] }}
            className="space-y-4"
            onSubmit={handleSubmit}
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <FloatingLabelInput
                label="Name"
                name="name"
                value={form.name}
                onChange={(val) => setForm((p) => ({ ...p, name: val }))}
              />
              <FloatingLabelInput
                label="Email"
                name="email"
                type="email"
                value={form.email}
                onChange={(val) => setForm((p) => ({ ...p, email: val }))}
              />
            </div>
            <FloatingLabelInput
              label="Subject"
              name="subject"
              value={form.subject}
              onChange={(val) => setForm((p) => ({ ...p, subject: val }))}
            />
            <FloatingLabelInput
              label="Tell me about your project..."
              name="message"
              isTextarea
              value={form.message}
              onChange={(val) => setForm((p) => ({ ...p, message: val }))}
            />

            <div className="flex items-center gap-4">
              <MagneticButton
                type="submit"
                className={`group px-8 py-3.5 text-white text-sm font-medium rounded-xl transition-all duration-300 inline-flex items-center gap-2 ${
                  status === "sending"
                    ? "bg-accent/50 cursor-wait"
                    : "bg-accent hover:bg-accent-light hover:shadow-[0_0_50px_rgba(108,99,255,0.3)]"
                }`}
              >
                {status === "sending" ? (
                  <>
                    Sending...
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                    />
                  </>
                ) : (
                  <>
                    Send Message
                    <motion.svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2}
                      whileHover={{ x: 4 }}
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </motion.svg>
                  </>
                )}
              </MagneticButton>

              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-emerald-400 text-sm"
                >
                  <CheckCircle size={16} />
                  Message sent!
                </motion.div>
              )}
              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 text-red-400 text-sm"
                >
                  <AlertCircle size={16} />
                  Failed to send. Try again.
                </motion.div>
              )}
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}

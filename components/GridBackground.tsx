"use client";

export default function GridBackground() {
  return (
    <div className="fixed inset-0 -z-20 overflow-hidden">
      {/* Base aurora gradient - more visible */}
      <div className="absolute inset-0 aurora-bg" />

      {/* Fading grid pattern */}
      <div className="absolute inset-0 grid-bg opacity-40" />

      {/* Larger, brighter ambient orbs */}
      <div className="absolute -top-32 -left-32 w-[800px] h-[800px] rounded-full bg-accent/[0.07] blur-[150px] animate-orb" />
      <div className="absolute top-1/3 -right-32 w-[600px] h-[600px] rounded-full bg-purple-500/[0.05] blur-[120px] animate-orb-reverse" />
      <div className="absolute -bottom-32 left-1/3 w-[700px] h-[700px] rounded-full bg-blue-500/[0.04] blur-[130px] animate-orb" />
    </div>
  );
}

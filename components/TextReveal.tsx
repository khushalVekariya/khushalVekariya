"use client";

interface Props {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
}

export default function TextReveal({ children, className = "", as: Tag = "span" }: Props) {
  return (
    <Tag className={className}>
      {children}
    </Tag>
  );
}

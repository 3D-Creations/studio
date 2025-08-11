"use client";

export function SplinePlaceholder() {
  return (
    <div className="absolute inset-0 -z-10 h-full w-full">
      <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-background via-primary/5 to-background" />
      <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,hsl(var(--primary)/0.05)_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--primary)/0.05)_1px,transparent_1px)] bg-[size:36px_36px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_70%,transparent_110%)]" />
      <div className="absolute inset-0 h-full w-full bg-gradient-to-br from-primary/10 via-accent/10 to-transparent bg-[length:200%_200%] animate-gradient-move opacity-50" />
    </div>
  );
}

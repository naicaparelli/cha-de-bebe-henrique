// Decorative floating sea elements (emoji-based for crisp, lightweight rendering)

export function FloatingDecor() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* Bubbles */}
      <span className="absolute left-[8%] bottom-0 text-2xl opacity-60 animate-bubble" style={{ animationDelay: "0s" }}>
        🫧
      </span>
      <span className="absolute left-[22%] bottom-0 text-xl opacity-50 animate-bubble" style={{ animationDelay: "2s" }}>
        🫧
      </span>
      <span className="absolute left-[55%] bottom-0 text-3xl opacity-50 animate-bubble" style={{ animationDelay: "4s" }}>
        🫧
      </span>
      <span className="absolute left-[78%] bottom-0 text-xl opacity-60 animate-bubble" style={{ animationDelay: "1s" }}>
        🫧
      </span>
      <span className="absolute left-[90%] bottom-0 text-2xl opacity-40 animate-bubble" style={{ animationDelay: "3s" }}>
        🫧
      </span>

      {/* Floating sea creatures */}
      <span className="absolute left-[6%] top-[20%] text-4xl animate-float-slow">🐠</span>
      <span className="absolute right-[8%] top-[30%] text-4xl animate-float-medium">🪼</span>
      <span className="absolute left-[12%] top-[65%] text-3xl animate-float-fast">🐟</span>
      <span className="absolute right-[10%] bottom-[20%] text-4xl animate-float-slow">🐡</span>
    </div>
  );
}

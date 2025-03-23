export const BackgroundDecoration = () => {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
      <div className="absolute -top-16 -left-16 w-64 h-64 rounded-full bg-primary opacity-20 blur-xl animate-pulse-slow"></div>
      <div className="absolute top-1/3 -right-32 w-96 h-96 rounded-full bg-cyan-200 opacity-20 blur-xl"></div>
      <div className="absolute -bottom-16 left-1/4 w-80 h-80 rounded-full bg-purple-500 opacity-20 blur-xl"></div>
      <div className="absolute top-2/3 left-16 w-24 h-24 rounded-full bg-rose-300 opacity-20 blur-lg"></div>
      <div className="absolute top-1/4 left-1/3 w-16 h-16 rounded-full bg-primary/30 opacity-20 blur-md"></div>
      <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="currentColor" strokeWidth="0.5" strokeOpacity="0.05" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#smallGrid)" />
      </svg>
    </div>
  )
}


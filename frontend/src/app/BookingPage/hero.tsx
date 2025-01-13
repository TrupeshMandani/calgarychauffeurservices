export function Hero() {
  return (
    <div className="relative h-[600px] flex items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/carbg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
      </div>
      <div className="relative text-center space-y-6 max-w-4xl mx-auto px-4">
        <h2 className="text-amber-500 text-xl font-medium tracking-wide">
          Welcome to Calgary Chauffeur Servieces
        </h2>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-widest leading-tight">
          BOOK <span className="text-amber-500 glow">A LUXURY</span> FOR YOUR
          RIDE
        </h1>
        <p className="text-lg md:text-xl leading-relaxed">
          Enjoy seamless, reliable transportation wherever you go. Experience
          convenience like never before with Calgary chauffeur Servieces.
        </p>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <div className="relative h-[600px] flex items-center justify-center text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/carbg.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      <div className="relative text-center space-y-6 max-w-4xl mx-auto px-4">
        <h2 className="text-amber-500 text-xl font-medium">
          Welcome to Taxi Nidderau
        </h2>
        <h1 className="text-4xl md:text-6xl font-bold">
          BOOK <span className="text-amber-500">TAXI</span> FOR YOUR RIDE
        </h1>
        <p className="text-lg md:text-xl">
          Enjoy seamless, reliable transportation wherever you go. Experience
          convenience like never before with Taxi Nidderau.
        </p>
        <div className="flex gap-4 justify-center">
          <button className="bg-amber-500 hover:bg-amber-600 px-6 py-3 rounded-md font-medium">
            About Us
          </button>
          <button className="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-md font-medium">
            Learn More
          </button>
        </div>
      </div>
    </div>
  );
}

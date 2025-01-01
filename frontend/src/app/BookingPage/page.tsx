import NavBar from "../Components/NavBar";
import { BookingForm } from "./BookingForm";
import { Hero } from "./hero";

export default function Home() {
  return (
    <main>
      <NavBar />
      <Hero />
      <div className="px-4 pb-20 bg-gray-50">
        <BookingForm />
      </div>
    </main>
  );
}

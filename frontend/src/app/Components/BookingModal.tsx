interface BookingData {
  name: string;
  email: string;
  phone: string;
  pickupDate: string;
  returnDate: string;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: BookingData) => void;
}

const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  if (!isOpen) return null;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;

    const data: BookingData = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      email: (form.elements.namedItem("email") as HTMLInputElement).value,
      phone: (form.elements.namedItem("phone") as HTMLInputElement).value,
      pickupDate: (form.elements.namedItem("pickupDate") as HTMLInputElement)
        .value,
      returnDate: (form.elements.namedItem("returnDate") as HTMLInputElement)
        .value,
    };

    onSubmit(data);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full flex justify-center items-center">
      <div className="relative p-5 border w-96 shadow-lg rounded-md bg-white">
        <h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
          Book Your Car
        </h3>
        <form onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Full Name"
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <input
            name="phone"
            type="tel"
            placeholder="Phone"
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <input
            name="pickupDate"
            type="date"
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <input
            name="returnDate"
            type="date"
            className="w-full mb-4 p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md w-full hover:bg-blue-700"
          >
            Book Now
          </button>
          <button
            type="button"
            onClick={onClose}
            className="mt-2 bg-gray-300 text-gray-700 px-4 py-2 rounded-md w-full"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;

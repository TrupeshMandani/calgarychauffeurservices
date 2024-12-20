/**
 * The BookingModal component is a modal in a React application that allows users to book a car by
 * providing their information and dates.
 * @param  - The `BookingModal` component is a modal component used for booking a car. It takes three
 * props:
 * @returns The BookingModal component is being returned. It is a modal component that allows users to
 * book a car by providing their name, email, phone number, pickup date, and return date. The modal
 * includes input fields for user information and buttons to submit the booking or cancel the
 * operation.
 */
import React from "react";
interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
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
    const data = {
      name: form.name.valueOf,
      email: form.email.value,
      phone: form.phone.value,
      pickupDate: form.pickupDate.value,
      returnDate: form.returnDate.value,
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

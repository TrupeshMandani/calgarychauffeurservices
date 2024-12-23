/* This code snippet is a TypeScript React component for a navigation bar (`NavBar`). Here's a
breakdown of what the code does: */
"use client";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { firebaseApp } from "../_utils/Firebase";
import { useRouter } from "next/navigation";

const NavBar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);
  const auth = getAuth(firebaseApp);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  const handleSignOut = async () => {
    await signOut(auth);
    setShowModal(false);
    router.replace("/"); // Replace the current entry in the history stack
  };

  const handleProfileClick = () => {
    setShowModal(true);
  };

  return (
    <nav className="bg-white shadow-lg relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex-shrink-0 flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Chauffeur</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <a href="/" className="text-gray-700 hover:text-blue-600">
              Home
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              Vehicles
            </a>
            <a
              href="/BookingPage"
              className="text-gray-700 hover:text-blue-600"
            >
              Services
            </a>
            <a href="/AboutUs" className="text-gray-700 hover:text-blue-600">
              About
            </a>
            <a href="/ContactUs" className="text-gray-700 hover:text-blue-600">
              Contact
            </a>
            <a
              href="/BookingPage"
              className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
            >
              Book Now
            </a>

            {user ? (
              <img
                src={user.photoURL || "/default-user.png"}
                alt="User"
                className="w-8 h-8 rounded-full cursor-pointer"
                onClick={handleProfileClick}
              />
            ) : (
              <a
                href="/LogInPage"
                className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700"
              >
                Sign In
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Stylish Logout Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-semibold mb-4">Confirm Logout</h2>
            <p className="mb-6 text-gray-700">
              Are you sure you want to log out?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOut}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Yes, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

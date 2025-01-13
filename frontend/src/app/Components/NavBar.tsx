"use client";

import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { firebaseApp } from "../_utils/Firebase";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image"; // Import Image from next/image
import { motion } from "framer-motion"; // Import motion from Framer Motion
import { slideInFromTop2 } from "../_utils/motion";

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
    <motion.nav
      className="absolute z-20 w-full border-b border-gray-300"
      initial="hidden" // Initial state for animation
      animate="visible" // Final state for animation
      variants={slideInFromTop2} // Animation variants
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-yellow-400">Chauffeur</h1>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-white hover:text-yellow-400">
              Home
            </Link>
            <Link
              href="/ServiecePage"
              className="text-white hover:text-yellow-400"
            >
              Services
            </Link>
            <Link href="/AboutUs" className="text-white hover:text-yellow-400">
              About
            </Link>
            <Link
              href="/ContactUs"
              className="text-white hover:text-yellow-400"
            >
              Contact
            </Link>
            <Link
              href="/BookingPage"
              className="bg-yellow-400 rounded-full text-black px-6 py-2 hover:bg-yellow-500 transition-all duration-300"
            >
              Book Now
            </Link>
            {user ? (
              <div
                className="cursor-pointer"
                onClick={handleProfileClick}
                title="Profile"
              >
                <Image
                  src={user.photoURL || "/default-user.png"}
                  alt="User"
                  width={32}
                  height={32}
                  className="rounded-full border-2 border-yellow-400"
                />
              </div>
            ) : (
              <Link
                href="/LogInPage"
                className="bg-yellow-400 text-black px-6 py-2 rounded-full hover:bg-yellow-500 transition-all duration-300"
              >
                Sign In
              </Link>
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
    </motion.nav>
  );
};

export default NavBar;

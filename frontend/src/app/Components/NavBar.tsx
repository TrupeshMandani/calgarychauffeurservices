"use client";
import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { firebaseApp } from "../_utils/Firebase";
import { useRouter } from "next/navigation";

const NavBar: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
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
    router.push("/"); // Redirect to home after logout
  };

  return (
    <nav className="bg-white shadow-lg">
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
            {user ? (
              <div className="flex items-center space-x-4">
                <img
                  src={user.photoURL || "/default-user.png"}
                  alt="User"
                  className="w-8 h-8 rounded-full"
                />
                <button
                  onClick={handleSignOut}
                  className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-600"
                >
                  Sign Out
                </button>
              </div>
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
    </nav>
  );
};

export default NavBar;

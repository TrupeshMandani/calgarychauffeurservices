/**
 * The App component renders the HomePage component within a div element in a TypeScript React
 * application.
 * @returns The App component is being returned, which contains the HomePage component wrapped inside a
 * div.
 */
import "bootstrap-icons/font/bootstrap-icons.css";
import HomePage from "@/pages/HomePage";
import React from "react";

const App: React.FC = () => {
  return (
    <div>
      <HomePage />
    </div>
  );
};

export default App;

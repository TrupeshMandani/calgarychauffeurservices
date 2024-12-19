"use client";
aseApp } from "../_utils/Firebase";
import {
  getAuth,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,

} from "firebase/auth";
import "tailwindcss/tailwind.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");

  const auth = getAuth(firebaseApp);
  const googleProvider = new GoogleAuthProvider();

    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      alert("Login successful!");

    } catch (err) {
      console.error("Email login error: ", err);
      setError("Failed to log in. Please check your credentials.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      await signInWithPopup(auth, googleProvider);
      alert("Login successful with Google!");

    } catch (err) {
      console.error("Google login error: ", err);
      setError("Failed to log in with Google.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">

            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Log in"}
          </button>
        </form>


        </div>
      </div>
    </div>
  );
};

export default LoginPage;
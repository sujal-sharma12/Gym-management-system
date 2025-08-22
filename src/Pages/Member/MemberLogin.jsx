import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

export default function MemberLogin() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
 
     try {
       const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
 
       const docRef = doc(db, "Members", user.uid);
        const docSnap = await getDoc(docRef);
 
       if (docSnap.exists()) {
          navigate("/member/dashboard");
       } else {
         setError("Member not found in database.");
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
       <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img src="/logo/2.png" alt="Gym Logo" className="h-16 rounded-full object-cover" />
         </div>
         <h2 className="text-white text-2xl font-bold text-center mb-2">
          MEMBER LOGIN
         </h2>
         {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
  
         <form onSubmit={handleLogin} className="space-y-4">
            <div>
             <label className="block text-gray-300 text-sm mb-1">Email</label>
            <input
               type="email"
              placeholder="member@gmail.com"
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
              value={email}
               onChange={(e) => setEmail(e.target.value)}
               required
              />
          </div>

          <div>
             <label className="block text-gray-300 text-sm mb-1">Password (Phone Number)</label>
              <input
               type="password"
                placeholder="••••••••"
               className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
                value={password}
              onChange={(e) => setPassword(e.target.value)}
               required
             />
           </div>

          <button
            type="submit"
             className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

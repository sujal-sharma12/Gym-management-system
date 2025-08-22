import { Outlet, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { useState, useEffect } from "react";
import { BsPerson } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { RiBillLine } from "react-icons/ri";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { doc, getDoc } from "firebase/firestore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function MemberLayout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [memberName, setMemberName] = useState("Member");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "Members", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setMemberName(docSnap.data().fullName || docSnap.data().name || "Member");
        }
      } else {
        setMemberName("Member");
        navigate("/member/login");
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/member/login");
  };

if (loading)
  return (
    <div className="w-full flex flex-col items-center justify-center mt-80">
      <AiOutlineLoading3Quarters className="text-4xl animate-spin" />
      <p className="mt-4 text-center text-gray-700">Loading...</p>
    </div>
  );
  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-lg">
        <div className="p-5 text-2xl font-bold tracking-wide border-b border-gray-700 h-16">
          Hanover Fitness
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => navigate("/member/dashboard")}
            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <RxDashboard /> Dashboard
          </button>
          <button
            onClick={() => navigate("/member/bill")}
            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <RiBillLine /> My Bills
          </button>
          <button
            onClick={() => navigate("/member/viewnotifications")}
            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <HiOutlineDocumentReport /> Notifications
          </button>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="flex justify-between items-center px-6 bg-gradient-to-b from-gray-900 to-gray-800 h-16 shadow-md relative">
          <h1 className="text-xl text-white font-semibold">Member Panel</h1>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="text-white">Welcome, {memberName}</span>
            <BsPerson className="text-white w-7 h-7" />
            <IoChevronDown className="text-white w-5 h-5" />
          </div>

          {menuOpen && (
            <div className="absolute right-6 top-14 bg-white text-gray-700 rounded-lg shadow-lg w-40 border border-gray-200">
              <button
                onClick={()=>navigate("/member/profile")}
                className="block w-full text-left px-4 py-2  rounded-t-lg"
              >
                Profile
              </button>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-red-500 hover:text-white rounded-t-lg"
              >
                Logout
              </button>
            </div>
          )}
        </div>

        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

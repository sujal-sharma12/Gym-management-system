import { Outlet, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../config/firebase";
import { useState } from "react";
import { BsPerson } from "react-icons/bs";
import { IoChevronDown } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { FaUserPlus, FaBoxOpen, FaPills, FaLeaf } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { RiBillLine } from "react-icons/ri";
import { MdMessage } from "react-icons/md";
import { use } from "react";

export default function AdminLayout() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [editmember, setEditmember] = useState(false);
  const [supplemets, setSupplements] = useState(false);
   const [dietplan, setDietplan] = useState(false);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/admin/login");
  };

  return (
    <div className="flex h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col shadow-lg">
        <div className="p-5 text-2xl font-bold tracking-wide border-b border-gray-700 h-16">
          Hanover Fitness
        </div>
        <nav className="flex-1 p-4 space-y-2">
          <button
            onClick={() => navigate("/admin/dashboard")}
            className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-700 transition"
          >
            <RxDashboard /> Dashboard
          </button>
           <div>
          <button
            onClick={() => setEditmember(!editmember)}
            className="flex items-center justify-between gap-3 w-full p-2 rounded-lg hover:bg-gray-700 transition"
          >
             <span className="flex items-center gap-3">
                <FaUserPlus /> Add Member
              </span>
              <IoChevronDown
                className={`w-5 h-5 transition-transform ${
                  editmember ? "rotate-180" : ""
                }`}
                />
          </button>
                {editmember && (
                   <div className="ml-8 mt-1 space-y-1">
                <button
                  onClick={() => navigate("/admin/addmember")}
                  className="block w-full text-left p-2 rounded-lg hover:bg-gray-700 transition text-sm"
                >
                  ➕ Add New
                </button>
                <button
                  onClick={() => navigate("/admin/vieweditmember")}
                  className="block w-full text-left p-2 rounded-lg hover:bg-gray-700 transition text-sm"
                >
                  ✏️ View / Edit
                </button>
                <button
                  onClick={() => navigate("/admin/deletemember")}
                  className="block w-full text-left p-2 rounded-lg hover:bg-gray-700 transition text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
                )}
              </div>
        
          <button
          onClick={()=>navigate("/admin/createbill")}
           className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-700 transition">
            <RiBillLine /> Create Bill
          </button>
          <button 
          onClick={()=>navigate("/admin/assignpackages")}
          className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-700 transition">
            <FaBoxOpen /> Assign Fee Package
          </button>
           <button 
          onClick={()=>navigate("/admin/notifications")}
          className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-700 transition">
            <MdMessage /> Assign Notifications
          </button>
          <button
            onClick={() => navigate("/admin/report")}
          className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-gray-700 transition">
            <HiOutlineDocumentReport /> Reports
          </button>
          <button
            onClick={() => setSupplements(!supplemets)}
            className="flex items-center justify-between gap-3 w-full p-2 rounded-lg hover:bg-gray-700 transition"
          >
             <span className="flex items-center gap-3">
                <FaUserPlus /> Supplements
              </span>
              <IoChevronDown
                className={`w-5 h-5 transition-transform ${
                  supplemets ? "rotate-180" : ""
                }`}
                />
            </button>
            {supplemets && (
                   <div className="ml-8 mt-1 space-y-1">
                <button
                  onClick={() => navigate("/admin/supplements")}
                  className="block w-full text-left p-2 rounded-lg hover:bg-gray-700 transition text-sm"
                >
                  ➕ Add New
                </button>
                <button
                  onClick={() => navigate("/admin/editsupplements")}
                  className="block w-full text-left p-2 rounded-lg hover:bg-gray-700 transition text-sm"
                >
                  ✏️ View / Edit
                </button>
                <button
                  onClick={() => navigate("/admin/deletesupplements")}
                  className="block w-full text-left p-2 rounded-lg hover:bg-gray-700 transition text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
                )}
          
          <button
            onClick={() => setDietplan(!dietplan)}
            className="flex items-center justify-between gap-3 w-full p-2 rounded-lg hover:bg-gray-700 transition"
          >
             <span className="flex items-center gap-3">
                <FaUserPlus /> Diet Plans
              </span>
              <IoChevronDown
                className={`w-5 h-5 transition-transform ${
                  dietplan ? "rotate-180" : ""
                }`}
                />
            </button>
            {dietplan && (
                   <div className="ml-8 mt-1 space-y-1">
                <button
                  onClick={() => navigate("/admin/adddietplan")}
                  className="block w-full text-left p-2 rounded-lg hover:bg-gray-700 transition text-sm"
                >
                  ➕ Add New
                </button>
                <button
                  onClick={() => navigate("/admin/viewdietplan")}
                  className="block w-full text-left p-2 rounded-lg hover:bg-gray-700 transition text-sm"
                >
                  ✏️ View / Edit
                </button>
                <button
                  onClick={() => navigate("/admin/deletedietplan")}
                  className="block w-full text-left p-2 rounded-lg hover:bg-gray-700 transition text-sm"
                >
                  🗑️ Delete
                </button>
              </div>
                )}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col">
        <div className="flex justify-between items-center px-6 bg-gradient-to-b from-gray-900 to-gray-800 h-16 shadow-md relative">
          <h1 className="text-xl text-white font-semibold">Dashboard</h1>
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span className="text-white">Welcome, Admin</span>
            <BsPerson className="text-white w-7 h-7" />
            <IoChevronDown className="text-white w-5 h-5" />
          </div>
          {menuOpen && (
            <div className="absolute right-6 top-14 bg-white text-gray-700 rounded-lg shadow-lg w-40 border border-gray-200">
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

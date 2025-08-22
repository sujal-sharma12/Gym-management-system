import { useEffect, useState } from "react";
import { auth, db } from "../../config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { AiOutlineUser } from "react-icons/ai";

export default function MyProfile() {
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
       const user = auth.currentUser;
      if (user) {
         const docRef = doc(db, "Members", user.uid);
         const docSnap = await getDoc(docRef);
         if (docSnap.exists()) {
          setMemberData(docSnap.data());
         }
      }
      setLoading(false);
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
       <div className="w-full flex flex-col items-center justify-center mt-10">
         <AiOutlineUser className="text-4xl animate-pulse text-gray-600" />
         <p className="mt-4 text-center text-gray-700">Loading profile...</p>
      </div>
    );
  }

  if (!memberData) {
    return <p className="text-center text-red-500 mt-10">Failed to load profile data.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white rounded-lg shadow-md p-8 ">
      <div className="flex items-center space-x-4 mb-6">
        <AiOutlineUser className="text-5xl text-gray-700" />
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{memberData.fullName || "Member"}</h2>
          <p className="text-gray-500">{memberData.email}</p>
        </div>
      </div>

      <div className="border-t pt-4 space-y-2">
         <p><span className="font-semibold">Gender:</span> {memberData.gender || "N/A"}</p>
         <p><span className="font-semibold">date Of Birth:</span> {memberData.dob || "N/A"}</p>
        <p><span className="font-semibold">Phone:</span> {memberData.phone || "Not provided"}</p>
          <p><span className="font-semibold">Membership Plan:</span> {memberData.package || "N/A"}</p>
         <p><span className="font-semibold">Joined On:</span> {memberData.joiningDate ? new Date(memberData.createdAt.seconds * 1000).toLocaleDateString() : "N/A"}</p>
        <p><span className="font-semibold">ExpiryDate:</span> {memberData.expiryDate || "N/A"}</p>

      </div>
    </div>
  );
}

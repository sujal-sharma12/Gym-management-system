import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function DeleteMember() {
     const [members, setMembers] = useState([]);

  const fetchMembers = async () => {
    const querySnapshot = await getDocs(collection(db, "Members"));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setMembers(data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);
  const handleDelete = async ()=>{
      if (window.confirm("Are you sure you want to delete this member?")) {
      await deleteDoc(doc(db, "members", id));
      fetchMembers();
    }

  }

  return (
     <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Delete Members</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td className="p-2 border">{member.fullName}</td>
              <td className="p-2 border">{member.email}</td>
              <td className="p-2 border">{member.phone}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(member.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded w-full"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

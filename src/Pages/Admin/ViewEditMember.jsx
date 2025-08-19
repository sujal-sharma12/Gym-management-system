import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function ViewEditMember() {
  const [members, setMembers] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchMembers = async () => {
    const querySnapshot = await getDocs(collection(db, "Members"));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setMembers(data);
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const handleEdit = (member) => {
    setEditingId(member.id);
    setEditData(member);
  };

  const handleSave = async () => {
    await updateDoc(doc(db, "Members", editingId), editData);
    setEditingId(null);
    fetchMembers();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">View & Edit Members</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Email</th>
            <th className="p-2 border">Phone</th>
            <th className="p-2 border">JoiningDate</th>
            <th className="p-2 border">ExpiryDate</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member.id}>
              <td className="p-2 border">
                {editingId === member.id ? (
                  <input
                    value={editData.fullName}
                    onChange={(e) =>
                      setEditData({ ...editData, fullName: e.target.value })
                    }
                    className="border p-1"
                  />
                ) : (
                  member.fullName
                )}
              </td>
              <td className="p-2 border">
                {editingId === member.id ? (
                  <input
                    value={editData.email}
                    onChange={(e) =>
                      setEditData({ ...editData, email: e.target.value })
                    }
                    className="border p-1"
                  />
                ) : (
                  member.email
                )}
              </td>
              <td className="p-2 border">
                {editingId === member.id ? (
                  <input
                    value={editData.phone}
                    onChange={(e) =>
                      setEditData({ ...editData, phone: e.target.value })
                    }
                    className="border p-1"
                  />
                ) : (
                  member.phone
                )}
              </td>
               <td className="p-2 border">
                {editingId === member.id ? (
                  <input
                    value={editData.joiningDate}
                    onChange={(e) =>
                      setEditData({ ...editData, joiningDate: e.target.value })
                    }
                    className="border p-1"
                  />
                ) : (
                  member.joiningDate
                )}
              </td>
               <td className="p-2 border">
                {editingId === member.id ? (
                  <input
                    value={editData.expiryDate}
                    onChange={(e) =>
                      setEditData({ ...editData, expiryDate: e.target.value })
                    }
                    className="border p-1"
                  />
                ) : (
                  member.expiryDate
                )}
              </td>
              <td className="p-2 border">
                {editingId === member.id ? (
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-3 py-1 rounded w-full"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(member)}
                    className="bg-blue-500 text-white px-3 py-1 rounded w-full"
                  >
                    Edit
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

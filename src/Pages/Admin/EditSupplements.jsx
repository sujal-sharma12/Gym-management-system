import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function ViewEditSupplements() {
  const [supplements, setSupplements] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchSupplements = async () => {
    const querySnapshot = await getDocs(collection(db, "Supplements"));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setSupplements(data);
  };

  useEffect(() => {
    fetchSupplements();
  }, []);

  const handleEdit = (supplement) => {
    setEditingId(supplement.id);
    setEditData(supplement);
  };

  const handleSave = async () => {
    await updateDoc(doc(db, "Supplements", editingId), editData);
    setEditingId(null);
    fetchSupplements();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">View & Edit Supplements</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Brand</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Expiry Date</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {supplements.map((item) => (
            <tr key={item.id}>
              <td className="p-2 border">
                {editingId === item.id ? (
                  <input
                    value={editData.name}
                    onChange={(e) => setEditData({ ...editData, name: e.target.value })}
                    className="border p-1"
                  />
                ) : (
                  item.name
                )}
              </td>
              <td className="p-2 border">
                {editingId === item.id ? (
                  <input
                    value={editData.brand}
                    onChange={(e) => setEditData({ ...editData, brand: e.target.value })}
                    className="border p-1"
                  />
                ) : (
                  item.brand
                )}
              </td>
              <td className="p-2 border">
                {editingId === item.id ? (
                  <input
                    type="number"
                    value={editData.price}
                    onChange={(e) => setEditData({ ...editData, price: e.target.value })}
                    className="border p-1"
                  />
                ) : (
                  `₹${item.price}`
                )}
              </td>
              <td className="p-2 border">
                {editingId === item.id ? (
                  <input
                    type="number"
                    value={editData.quantity}
                    onChange={(e) => setEditData({ ...editData, quantity: e.target.value })}
                    className="border p-1"
                  />
                ) : (
                  item.quantity
                )}
              </td>
              <td className="p-2 border">
                {editingId === item.id ? (
                  <input
                    type="date"
                    value={editData.expiryDate}
                    onChange={(e) => setEditData({ ...editData, expiryDate: e.target.value })}
                    className="border p-1"
                  />
                ) : (
                  item.expiryDate
                )}
              </td>
              <td className="p-2 border">
                {editingId === item.id ? (
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-3 py-1 rounded w-full"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(item)}
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

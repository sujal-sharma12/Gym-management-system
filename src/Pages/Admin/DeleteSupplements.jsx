import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function DeleteSupplement() {
  const [supplements, setSupplements] = useState([]);

  const fetchSupplements = async () => {
    const querySnapshot = await getDocs(collection(db, "Supplements"));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setSupplements(data);
  };

  useEffect(() => {
    fetchSupplements();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this supplement?")) {
      await deleteDoc(doc(db, "Supplements", id));
      fetchSupplements();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Delete Supplements</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Brand</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {supplements.map((supp) => (
            <tr key={supp.id}>
              <td className="p-2 border">{supp.name}</td>
              <td className="p-2 border">{supp.brand}</td>
              <td className="p-2 border">₹{supp.price}</td>
              <td className="p-2 border">{supp.quantity}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(supp.id)}
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
  );
}

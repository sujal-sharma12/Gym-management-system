import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";

export default function DeleteDietPlans() {
  const [plans, setPlans] = useState([]);

  const fetchPlans = async () => {
    const querySnapshot = await getDocs(collection(db, "DietPlans"));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPlans(data);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this diet plan?")) {
      await deleteDoc(doc(db, "DietPlans", id));
      fetchPlans();
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Delete Diet Plans</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Plan Name</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id}>
              <td className="p-2 border">{plan.planName}</td>
              <td className="p-2 border">
                <button
                  onClick={() => handleDelete(plan.id)}
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

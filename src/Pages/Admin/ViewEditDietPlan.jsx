import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

export default function ViewEditDietPlans() {
  const [plans, setPlans] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const fetchPlans = async () => {
    const querySnapshot = await getDocs(collection(db, "DietPlans"));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setPlans(data);
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const handleEdit = (plan) => {
    setEditingId(plan.id);
    setEditData(plan);
  };

  const handleSave = async () => {
    await updateDoc(doc(db, "DietPlans", editingId), editData);
    setEditingId(null);
    fetchPlans();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">View & Edit Diet Plans</h2>
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Plan Name</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Calories</th>
            <th className="p-2 border">Duration</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {plans.map((plan) => (
            <tr key={plan.id}>
              <td className="p-2 border">
                {editingId === plan.id ? (
                  <input
                    value={editData.planName}
                    onChange={(e) =>
                      setEditData({ ...editData, planName: e.target.value })
                    }
                    className="border p-1"
                  />
                ) : (
                  plan.planName
                )}
              </td>
              <td className="p-2 border">
                {editingId === plan.id ? (
                  <input
                    value={editData.description}
                    onChange={(e) =>
                      setEditData({ ...editData, description: e.target.value })
                    }
                    className="border p-1"
                  />
                ) : (
                  plan.description
                )}
              </td>
              <td className="p-2 border">
                {editingId === plan.id ? (
                  <input
                    value={editData.calories}
                    onChange={(e) =>
                      setEditData({ ...editData, calories: e.target.value })
                    }
                    className="border p-1"
                  />
                ) : (
                  plan.calories
                )}
              </td>
              <td className="p-2 border">
                {editingId === plan.id ? (
                  <input
                    value={editData.duration}
                    onChange={(e) =>
                      setEditData({ ...editData, duration: e.target.value })
                    }
                    className="border p-1"
                  />
                ) : (
                  plan.duration
                )}
              </td>
              <td className="p-2 border">
                {editingId === plan.id ? (
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white px-3 py-1 rounded w-full"
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => handleEdit(plan)}
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

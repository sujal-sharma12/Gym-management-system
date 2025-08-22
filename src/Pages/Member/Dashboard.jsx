import { useEffect, useState } from "react";
import { db, auth } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export default function MemberDashboard() {
  const [dietPlans, setDietPlans] = useState([]);
  const [supplements, setSupplements] = useState([]);

  useEffect(() => {
    const fetchDietPlans = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const q = query(collection(db, "DietPlans"));
      const snapshot = await getDocs(q);
      setDietPlans(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    const fetchSupplements = async () => {
      const snapshot = await getDocs(collection(db, "Supplements"));
      setSupplements(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    };

    fetchDietPlans();
    fetchSupplements();
  }, []);

  return (
    <div className="p-6 space-y-8">
      <div>
        <h2 className="text-xl font-bold mb-4">My Diet Plans</h2>
        {dietPlans.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-4">
            {dietPlans.map(plan => (
              <div key={plan.id} className="p-4 border rounded-xl shadow">
                <h3 className="text-lg font-semibold">{plan.planName}</h3>
                <p><b>Calories:</b> {plan.calories} / day</p>
                <p><b>Duration:</b> {plan.duration}</p>
                <p>{plan.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No diet plans assigned yet.</p>
        )}
      </div>

      <div>
        <h2 className="text-xl font-bold mb-4"> Available Supplements</h2>
        {supplements.length > 0 ? (
          <div className="grid md:grid-cols-3 gap-4">
            {supplements.map(s => (
              <div key={s.id} className="p-4 border rounded-xl shadow">
                <h3 className="text-lg font-semibold">{s.name}</h3>
                <p><b>Brand:</b> {s.brand}</p>
                <p><b>Price:</b> ₹{s.price}</p>
                <p><b>Expiry:</b> {s.expiryDate}</p>
                <p><b>Quantity:</b> {s.quantity}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No supplements available.</p>
        )}
      </div>
    </div>
  );
}

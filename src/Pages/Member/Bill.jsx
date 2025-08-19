import { useEffect, useState } from "react";
import { db, auth } from "../../config/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { AiOutlineFileText } from "react-icons/ai";

export default function Bills() {
  const [bills, setBills] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBills = async () => {
      try {
        const user = auth.currentUser;
        if (!user) return;

        const billsRef = collection(db, "Bills");
        const q = query(billsRef, where("memberId", "==", user.uid));
        const querySnapshot = await getDocs(q);

        const userBills = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));

        setBills(userBills);
      } catch (err) {
        console.error("Error fetching bills:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBills();
  }, []);

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center justify-center mt-10">
        <AiOutlineFileText className="text-4xl animate-pulse text-gray-600" />
        <p className="mt-4 text-center text-gray-700">Loading bills...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 bg-white rounded-lg shadow p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">My Bills</h2>

      {bills.length === 0 ? (
        <p className="text-gray-600 text-center">No bills found.</p>
      ) : (
        <div className="space-y-4">
          {bills.map(bill => (
            <div
              key={bill.id}
              className={`p-4 rounded-lg shadow border ${
                bill.paid ? "bg-green-100 border-green-300" : "bg-red-100 border-red-300"
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800">{bill.title || "Gym Bill"}</h3>
                  <p className="text-sm text-gray-600">Due: {new Date(bill.dueDate.seconds * 1000).toLocaleDateString()}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">₹{bill.amount}</p>
                  <span
                    className={`text-sm font-medium ${
                      bill.paid ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {bill.paid ? "Paid" : "Unpaid"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

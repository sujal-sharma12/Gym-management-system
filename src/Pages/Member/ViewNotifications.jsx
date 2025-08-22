import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db, auth } from "../../config/firebase";

export default function ViewNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
       const user = auth.currentUser;
        
        const q = query(
          collection(db, "Notifications"),
         where("memberId", "==", user.uid)
      );

      const snap = await getDocs(q);
         const data = snap.docs.map((doc) => ({
         id: doc.id,
 ...doc.data(),
      }));

       setNotifications(data);
    };

    fetchNotifications();
  }, []);

  return (
    <div className="w-full mx-auto bg-white p-6 rounded-xl shadow-lg text-black">
      <h2 className="text-xl font-bold mb-4 text-center">📩 My Notifications</h2>

       {notifications.length === 0 ? (
           <p className="text-gray-500 text-center">No notifications yet.</p>
      ) : (
        <ul className="space-y-3">
           {notifications.map((n) => (
            <li key={n.id} className="border rounded-lg p-3 shadow-sm">
                <h3 className="font-semibold text-blue-600">{n.title}</h3>
               <p className="text-gray-700">{n.message}</p>
               <span className="text-xs text-gray-500">
                 {n.createdAt?.toDate().toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

import { useEffect, useState } from "react";
import { db, auth } from "../../config/firebase";
import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { AiOutlineFileText } from "react-icons/ai";
import { FiDownload } from "react-icons/fi";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export default function Bills() {
  const [bills, setBills] = useState([]);
    const [memberData,setMemberData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [memberName, setMemberName] = useState("");

  useEffect(() => {
    const fetchBills = async () => {
      try {
         const user = auth.currentUser;
         const memberRef = doc(db, "Members", user.uid);
         const memberSnap = await getDoc(memberRef);
         const currentMember = { id: memberSnap.id, ...memberSnap.data() } ;
        
        setMemberData(currentMember);   
       setMemberName(currentMember?.name || "");

        if (memberSnap.exists()) {
           setMemberName(memberSnap.data().name || "");
         }
 
        const billsRef = collection(db, "Bills");
         const q = query(billsRef, where("memberId", "==", user.uid));
         const querySnapshot = await getDocs(q);
 
         const userBills = querySnapshot.docs.map((doc) => ({
           id: doc.id,
          ...doc.data(),
           member: currentMember,
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

const downloadReceipt = (bill) => {
  try {
    const pdf = new jsPDF();
  
      const logoUrl = "/logo.png";
    const imgWidth = 30;
     const imgHeight = 30;
    const xPos = 15;
     const yPos = 10;
 
     pdf.addImage("/logo/2.png", "PNG", xPos, yPos, imgWidth, imgHeight);
 
     pdf.setFontSize(20);
     pdf.setFont("helvetica", "bold");
    pdf.text("Hanover Fitness", 105, 20, { align: "center" });
 
     pdf.setFontSize(14);
     pdf.setFont("helvetica", "normal");
     pdf.text("GYM BILL RECEIPT", 105, 30, { align: "center" });

     const formatDate = (date) => {
      if (!date) return "N/A";
      if (date.seconds) return new Date(date.seconds * 1000).toLocaleDateString();
      return date;
    };

    autoTable(pdf, {
      startY: 40,
      head: [["Field", "Details"]],
       body: [
        ["Bill ID", bill.id],
          ["Name", bill.member?.fullName || "N/A"],
         ["Email", bill.member?.email || "N/A"],
          ["Phone", bill.member?.phone || "N/A"],
          ["DOB", formatDate(bill.member?.dob)],
          ["Gender", bill.member?.gender || "N/A"],
        ["Joining Date", formatDate(bill.member?.joiningDate)],
          ["Package", bill.member?.package || "N/A"],
          ["Amount", `₹${bill.amount}`],
        ["Status", bill.status],
        ["Due Date", formatDate(bill.dueDate)],
      ],
    });

    const pageHeight = pdf.internal.pageSize.height;
    pdf.setFontSize(10);
    pdf.text("Thank you for choosing Hanover Fitness!", 105, pageHeight - 15, { align: "center" });

    pdf.save(`Receipt_${bill.id}.pdf`);
  } catch (err) {
    console.error("Error generating PDF:", err);
  }
};




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
           {bills.map((bill) => (
            <div
               key={bill.id}
               className={`p-4 rounded-lg shadow border ${
                 bill.status === "Paid" ? "bg-green-100 border-green-300" : "bg-red-100 border-red-300"
              }`}
             >
               <div className="flex justify-between items-center">
                 <div>
                    <h3 className="text-lg font-semibold text-gray-800">{bill.title || "Gym Bill"}</h3>
                   <p className="text-sm text-gray-600">
                     Due:{" "}
                     {bill.dueDate
                       ? new Date(bill.dueDate.seconds * 1000).toLocaleDateString()
                       : "N/A"}
                   </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">₹{bill.amount}</p>
                   <span
                     className={`text-sm font-medium ${
                        bill.status === "Paid" ? "text-green-700" : "text-red-700"
                     }`}
                     >
                     {bill.status}
                    </span>
                </div>
              </div>
              {bill.status === "Paid" && (
                <div className="mt-3 flex justify-end">
                  <button
                    onClick={() => downloadReceipt(bill)}
                      className="flex items-center px-3 py-1 text-sm bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
                   >
                     <FiDownload className="mr-2" /> Download Receipt
                  </button>
                 </div>
               )}
             </div>
          ))}
        </div>
      )}
    </div>
  );
}

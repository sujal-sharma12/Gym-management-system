import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs } from "firebase/firestore";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

export default function Report() {
  const [bills, setBills] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [packageFilter, setPackageFilter] = useState("");

  useEffect(() => {
    const fetchBills = async () => {
      const querySnapshot = await getDocs(collection(db, "Bills"));
      const billList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBills(billList);
      setFilteredBills(billList);
    };
    fetchBills();
  }, []);

  const applyFilters = () => {
    let filtered = bills;

    if (fromDate && toDate) {
      filtered = filtered.filter((bill) => {
        const billDate = new Date(bill.billDate.seconds * 1000);
        return billDate >= new Date(fromDate) && billDate <= new Date(toDate);
      });
    }

    if (packageFilter) {
      filtered = filtered.filter((bill) => bill.package === packageFilter);
    }

    setFilteredBills(filtered);
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Billing Report", 14, 10);
    doc.autoTable({
      head: [["Member", "Package", "Amount", "Bill Date", "Due Date", "Status"]],
      body: filteredBills.map((bill) => [
        bill.memberName,
        bill.package,
        `₹${bill.amount}`,
        new Date(bill.billDate.seconds * 1000).toLocaleDateString(),
        new Date(bill.dueDate.seconds * 1000).toLocaleDateString(),
        bill.status,
      ]),
    });
    doc.save("billing-report.pdf");
  };

  const exportExcel = () => {
    let csv = "Member,Package,Amount,Bill Date,Due Date,Status\n";
    filteredBills.forEach((bill) => {
      csv += `${bill.memberName},${bill.package},₹${bill.amount},${new Date(
        bill.billDate.seconds * 1000
      ).toLocaleDateString()},${new Date(
        bill.dueDate.seconds * 1000
      ).toLocaleDateString()},${bill.status}\n`;
    });
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "billing-report.csv");
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Billing Report</h2>

      

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="p-2 border rounded"
        />
        <input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="p-2 border rounded"
        />
        <select
          value={packageFilter}
          onChange={(e) => setPackageFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">All Packages</option>
          <option value="Monthly">Monthly</option>
          <option value="Quarterly">Quarterly</option>
          <option value="Yearly">Yearly</option>
        </select>
      </div>

      <button
        onClick={applyFilters}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Apply Filters
      </button>
       <button
          onClick={exportExcel}
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 ml-2"
        >
          Export Excel
        </button>


      <table className="w-full border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="border p-2">Member</th>
            <th className="border p-2">Package</th>
            <th className="border p-2">Amount</th>
            <th className="border p-2">Bill Date</th>
            <th className="border p-2">Due Date</th>
            <th className="border p-2">Status</th>
          </tr>
        </thead>
        <tbody>
          {filteredBills.map((bill) => (
            <tr key={bill.id}>
              <td className="border p-2">{bill.memberName}</td>
              <td className="border p-2">{bill.package}</td>
              <td className="border p-2">₹{bill.amount}</td>
              <td className="border p-2">
                {new Date(bill.billDate.seconds * 1000).toLocaleDateString()}
              </td>
              <td className="border p-2">
                {new Date(bill.dueDate.seconds * 1000).toLocaleDateString()}
              </td>
              <td className="border p-2">{bill.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

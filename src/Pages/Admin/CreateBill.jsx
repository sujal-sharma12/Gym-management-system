import { useRef, useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { db } from "../../config/firebase";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CreateBill() {
  const pdfRef = useRef();
  const [pdfData, setPdfData] = useState(null);
  const [members, setMembers] = useState([]);

  useEffect(() => {
    const fetchMembers = async () => {
      const querySnapshot = await getDocs(collection(db, "Members"));
      const memberList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMembers(memberList);
    };
    fetchMembers();
  }, []);

  useEffect(() => {
    if (pdfData) {
      setTimeout(() => {
        const input = pdfRef.current;
        html2canvas(input, { scale: 2 }).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const imgWidth = 190;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
          pdf.save(`invoice-${pdfData.memberName}.pdf`);
          setPdfData(null);
        });
      }, 200);
    }
  }, [pdfData]);

  const validationSchema = Yup.object({
    memberName: Yup.string().required("Member is required"),
    package: Yup.string().required("Package is required"),
    amount: Yup.number().required("Amount is required").positive(),
    billDate: Yup.date().required("Bill date is required"),
    dueDate: Yup.date().required("Due date is required"),
    status: Yup.string().required("Status is required"),
  });

  const initialValues = {
    memberName: "",
    package: "",
    amount: "",
    billDate: "",
    dueDate: "",
    status: "Unpaid",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Bill</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const selectedMember = members.find(
              (m) => m.fullName === values.memberName
            );
            if (!selectedMember) return;

            const newBill = {
              memberId: selectedMember.id,
              ...values,
              billDate: Timestamp.fromDate(new Date(values.billDate)),
              dueDate: Timestamp.fromDate(new Date(values.dueDate)),
            };

            await addDoc(collection(db, "Bills"), newBill);
            setPdfData({ ...values, ...selectedMember });
            resetForm();
          } catch (error) {
            console.error("Error adding bill:", error);
          }
        }}
      >
        {({ setFieldValue }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Member Name</label>
              <Field
                as="select"
                name="memberName"
                className="w-full p-2 border rounded"
                onChange={(e) => {
                  const selectedName = e.target.value;
                  const selectedMember = members.find(
                    (m) => m.fullName === selectedName
                  );
                  setFieldValue("memberName", selectedName);
                  if (selectedMember) {
                    setFieldValue("package", selectedMember.package || "");
                    setFieldValue("amount", selectedMember.amount || "");
                  }
                }}
              >
                <option value="">Select Member</option>
                {members.map((member) => (
                  <option key={member.id} value={member.fullName}>
                    {member.fullName} ({member.email})
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="memberName"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Package</label>
              <Field
                name="package"
                className="w-full p-2 border rounded bg-gray-100"
                readOnly
              />
              <ErrorMessage
                name="package"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Amount</label>
              <Field
                type="number"
                name="amount"
                className="w-full p-2 border rounded bg-gray-100"
                readOnly
              />
              <ErrorMessage
                name="amount"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Bill Date</label>
              <Field
                type="date"
                name="billDate"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="billDate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Due Date</label>
              <Field
                type="date"
                name="dueDate"
                className="w-full p-2 border rounded"
              />
              <ErrorMessage
                name="dueDate"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div>
              <label className="block font-semibold mb-1">Status</label>
              <Field
                as="select"
                name="status"
                className="w-full p-2 border rounded"
              >
                <option value="Unpaid">Unpaid</option>
                <option value="Paid">Paid</option>
              </Field>
              <ErrorMessage
                name="status"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                Create & Download Bill
              </button>
            </div>
          </Form>
        )}
      </Formik>

      {pdfData && (
        <div ref={pdfRef} style={{ position: "absolute", left: "-9999px" }}>
          <div className="bg-white p-6 rounded-lg shadow-md max-w-lg border border-gray-200">
            <div className="flex flex-col items-center mb-6">
              <img
                src="logo/2.png"
                alt="Gym Logo"
                className="w-20 h-20 object-contain mb-2"
              />
              <h1 className="text-2xl font-bold">Hanover Fitness Center</h1>
              <p className="text-gray-500">Invoice</p>
            </div>

            <div className="space-y-2 text-gray-700">
              <p><strong>Member Name:</strong> {pdfData.memberName}</p>
              <p><strong>Email:</strong> {pdfData.email}</p>
              <p><strong>Member ID:</strong> {pdfData.id}</p>
              <p><strong>Package:</strong> {pdfData.package}</p>
              <p><strong>Amount:</strong> ₹{pdfData.amount}</p>
              <p><strong>Bill Date:</strong> {pdfData.billDate}</p>
              <p><strong>Due Date:</strong> {pdfData.dueDate}</p>
              <p><strong>Status:</strong> {pdfData.status}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

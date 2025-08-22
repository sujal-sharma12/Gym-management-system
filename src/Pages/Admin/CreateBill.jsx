import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { db } from "../../config/firebase";
import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";

export default function CreateBill() {
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

  const validationSchema = Yup.object({
    memberId: Yup.string().required("Member is required"),
    memberName: Yup.string().required("Member Name is required"),
    package: Yup.string().required("Package is required"),
    amount: Yup.number().required("Amount is required").positive(),
    billDate: Yup.date().required("Bill date is required"),
    dueDate: Yup.date().required("Due date is required"),
    status: Yup.string().required("Status is required"),
  });

  const initialValues = {
    memberId: "",
    memberName: "",
    package: "",
    amount: "",
    billDate: "",
    dueDate: "",
    status: "",
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Create Bill</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const newBill = {
              memberId: values.memberId, 
              memberName: values.memberName,
              package: values.package,
              amount: values.amount,
              billDate: Timestamp.fromDate(new Date(values.billDate)),
              dueDate: Timestamp.fromDate(new Date(values.dueDate)),
              status: values.status,
            };

            await addDoc(collection(db, "Bills"), newBill);
            resetForm();
            alert("Bill created successfully!");
          } catch (error) {
            console.error("Error adding bill:", error);
          }
        }}
      >
        {({ setFieldValue }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
         
            <div>
              <label className="block font-semibold mb-1">Member</label>
              <Field
                as="select"
                name="memberId"
                className="w-full p-2 border rounded"
                onChange={(e) => {
                  const selectedId = e.target.value;
                  const selectedMember = members.find(
                    (m) => m.id === selectedId
                  );
                  setFieldValue("memberId", selectedId);
                  if (selectedMember) {
                    setFieldValue("memberName", selectedMember.fullName || "");
                    setFieldValue("package", selectedMember.package || "");
                    setFieldValue("amount", selectedMember.amount || "");
                  }
                }}
              >
                <option value="">Select Member</option>
                {members.map((member) => (
                  <option key={member.id} value={member.id}>
                    {member.fullName} ({member.email})
                  </option>
                ))}
              </Field>
              <ErrorMessage
                name="memberId"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>

            {/* Package */}
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

            {/* Amount */}
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

            {/* Bill Date */}
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

            {/* Due Date */}
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

            {/* Status */}
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

            {/* Submit */}
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
              >
                Create Bill
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}

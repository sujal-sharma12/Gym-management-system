import { useEffect, useState } from "react";
import { db } from "../../config/firebase";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

export default function AssignPackages() {
  const [members, setMembers] = useState([]);

  
  useEffect(() => {
    const fetchMembers = async () => {
      const snapshot = await getDocs(collection(db, "Members"));
      const memberList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMembers(memberList);
    };
    fetchMembers();
  }, []);

  const validationSchema = Yup.object({
    memberId: Yup.string().required("Member is required"),
    package: Yup.string().required("Package is required"),
    amount: Yup.number().required("Amount is required").positive(),
  });

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Assign Fee Package</h2>

      <Formik
        initialValues={{ memberId: "", package: "", amount: "" }}
        validationSchema={validationSchema}
        onSubmit={async (values, { resetForm }) => {
          try {
            const memberRef = doc(db, "Members", values.memberId);
            await updateDoc(memberRef, {
              package: values.package,
              amount: values.amount,
              packageAssignedAt: new Date(),
            });
            alert("Package assigned successfully!");
            resetForm();
          } catch (error) {
            console.error("Error assigning package:", error);
          }
        }}
      >
        <Form className="space-y-4">
          <div>
            <label className="block mb-1">Select Member</label>
            <Field as="select" name="memberId" className="w-full border p-2 rounded">
              <option value="">Select</option>
             
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.fullName} ({m.email})
                </option>
              ))}
            </Field>
            <ErrorMessage name="memberId" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block mb-1">Package</label>
            <Field as="select" name="package" className="w-full border p-2 rounded">
              <option value="">Select</option>
              <option value="Monthly">Monthly</option>
              <option value="Quarterly">Quarterly</option>
              <option value="Yearly">Yearly</option>
            </Field>
            <ErrorMessage name="package" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block mb-1">Amount</label>
            <Field type="number" name="amount" className="w-full border p-2 rounded" />
            <ErrorMessage name="amount" component="div" className="text-red-500 text-sm" />
          </div>

          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Assign Package
          </button>
        </Form>
      </Formik>
    </div>
  );
}

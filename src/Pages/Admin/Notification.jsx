import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { collection, addDoc, getDocs, serverTimestamp,query,where } from "firebase/firestore";
import { db } from "../../config/firebase";

export default function Notification() {
  const [members, setMembers] = useState([]);
  const [success, setSuccess] = useState("");

  useEffect(() => {  
    const fetchMembers = async () => {
     const membersSnap = await getDocs(collection(db, "Members"));
      const allMembers = membersSnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const unpaidMembers = [];
      for (const member of allMembers) {
           const billsSnap = await getDocs(
          query(
            collection(db, "Bills"),
             where("memberId", "==", member.id),
             where("status", "==", "Unpaid")
          )
        );
           if (!billsSnap.empty) {
          unpaidMembers.push(member);
        }
       }
  
    setMembers(unpaidMembers);
  };
    fetchMembers();
  }, []);

  const validationSchema = Yup.object({
      memberId: Yup.string().required("Select a member"),
    title: Yup.string().required("Title is required"),
    message: Yup.string().required("Message is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await addDoc(collection(db, "Notifications"), {
         memberId: values.memberId,
        title: values.title,
         message: values.message,
        createdAt: serverTimestamp(),
      });
      setSuccess("Notification assigned successfully ✅");
      resetForm();
    } catch (err) {
      console.error("Error assigning notification:", err);
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg text-black">
      <h2 className="text-xl font-bold mb-4 text-center">Assign Notification</h2>

      {success && (
        <p className=" text-green-700 text-sm p-2 mb-3 ">
          {success}
        </p>
      )}

      <Formik
        initialValues={{ memberId: "", title: "", message: "" }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Select Member</label>
            <Field
              as="select"
              name="memberId"
              className="w-full border p-2 rounded"
            >
              <option value="">-- Select Member --</option>
              {members.map((m) => (
                <option key={m.id} value={m.id}>
                  { m.fullName}({m.email})
                </option>
              ))}
            </Field>
            <ErrorMessage
              name="memberId"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Title</label>
            <Field
              type="text"
              name="title"
              placeholder="Notification Title"
              className="w-full border p-2 rounded"
            />
            <ErrorMessage
              name="title"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">Message</label>
            <Field
              as="textarea"
              name="message"
              placeholder="Write message..."
              className="w-full border p-2 rounded"
            />
            <ErrorMessage
              name="message"
              component="div"
              className="text-red-500 text-sm mt-1"
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded w-full"
          >
            Send Notification
          </button>
        </Form>
      </Formik>
    </div>
  );
}

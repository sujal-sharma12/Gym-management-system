import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { db, auth } from "../../config/firebase";
import { collection, addDoc, Timestamp,setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function AddMember() {
  const [success, setSuccess] = useState("");

   const initialValues = {
    fullName: "",
     email: "",
     phone: "",
     gender: "",
    dob: "",
    package: "",
    joiningDate: "",
    expiryDate: "",
    address: ""
  };

  const validationSchema = Yup.object({
    fullName: Yup.string().required("Full Name is required"),
     email: Yup.string().email("Invalid email").required("Email is required"),
     phone: Yup.string().required("Phone number is required"),
    gender: Yup.string().required("Gender is required"),
     dob: Yup.date().required("Date of Birth is required"),
     package: Yup.string().required("Package type is required"),
     joiningDate: Yup.date().required("Joining date is required"),
    expiryDate: Yup.date().required("Expiry date is required"),
    address: Yup.string().required("Address is required")
  });



const handleSubmit = async (values, { resetForm }) => {
  try {
      const defaultPassword = values.phone;
     const userCredential = await createUserWithEmailAndPassword(
      auth,
        values.email,
      defaultPassword
    );
    const user = userCredential.user;

    await setDoc(doc(db, "Members", user.uid), {
       uid: user.uid,
      ...values,
      password: defaultPassword,
       role: "member",
       createdAt: Timestamp.now()
    });

    setSuccess(`Member added! Password is their phone number: ${defaultPassword}`);
     resetForm();
    setTimeout(() => setSuccess(""), 5000);
   } catch (error) {
    console.error("Error adding member: ", error);
    setSuccess(error.message);
  }
};


  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
       <h2 className="text-2xl font-bold mb-4">Add New Member</h2>
       {success && <p className="text-green-600 mb-4">{success}</p>}
 
       <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
           <div>
             <label className="block font-semibold mb-1">Full Name</label>
             <Field name="fullName" className="w-full p-2 border rounded" />
            <ErrorMessage name="fullName" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
             <label className="block font-semibold mb-1">Email</label>
            <Field type="email" name="email" className="w-full p-2 border rounded" />
             <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
           </div>
 
          <div>
             <label className="block font-semibold mb-1">Phone</label>
             <Field name="phone" className="w-full p-2 border rounded" />
             <ErrorMessage name="phone" component="div" className="text-red-500 text-sm" />
           </div>

           <div>
             <label className="block font-semibold mb-1">Gender</label>
             <Field as="select" name="gender" className="w-full p-2 border rounded">
                   <option value="">Select</option>
                  <option value="Male">Male</option>
               <option value="Female">Female</option>
             </Field>
            <ErrorMessage name="gender" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Date of Birth</label>
            <Field type="date" name="dob" className="w-full p-2 border rounded" />
             <ErrorMessage name="dob" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Package</label>
             <Field as="select" name="package" className="w-full p-2 border rounded">
              <option value="">Select</option>
               <option value="Monthly">Monthly</option>
               <option value="Quarterly">Quarterly</option>
               <option value="Yearly">Yearly</option>
            </Field>
            <ErrorMessage name="package" component="div" className="text-red-500 text-sm" />
           </div>

          <div>
            <label className="block font-semibold mb-1">Joining Date</label>
            <Field type="date" name="joiningDate" className="w-full p-2 border rounded" />
            <ErrorMessage name="joiningDate" component="div" className="text-red-500 text-sm" />
           </div>

           <div>
            <label className="block font-semibold mb-1">Expiry Date</label>
               <Field type="date" name="expiryDate" className="w-full p-2 border rounded" />
             <ErrorMessage name="expiryDate" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Address</label>
            <Field as="textarea" name="address" className="w-full p-2 border rounded" />
             <ErrorMessage name="address" component="div" className="text-red-500 text-sm" />
           </div>

          <div className="md:col-span-2">
              <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              Add Member
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

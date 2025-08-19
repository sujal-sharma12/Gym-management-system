import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { db } from "../../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function Supplements() {
  const [success, setSuccess] = useState("");

  const initialValues = {
    name: "",
    brand: "",
    price: "",
    quantity: "",
    expiryDate: "",
    description: ""
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Supplement name is required"),
    brand: Yup.string().required("Brand is required"),
    price: Yup.number().required("Price is required").positive(),
    quantity: Yup.number().required("Quantity is required").positive().integer(),
    expiryDate: Yup.date().required("Expiry date is required"),
    description: Yup.string().required("Description is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await addDoc(collection(db, "Supplements"), {
        ...values,
        createdAt: Timestamp.now(),
      });
      setSuccess("Supplement added successfully!");
      resetForm();
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error adding supplement: ", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Supplement</h2>
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-semibold mb-1">Name</label>
            <Field name="name" className="w-full p-2 border rounded" />
            <ErrorMessage name="name" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Brand</label>
            <Field name="brand" className="w-full p-2 border rounded" />
            <ErrorMessage name="brand" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Price</label>
            <Field type="number" name="price" className="w-full p-2 border rounded" />
            <ErrorMessage name="price" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Quantity</label>
            <Field type="number" name="quantity" className="w-full p-2 border rounded" />
            <ErrorMessage name="quantity" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Expiry Date</label>
            <Field type="date" name="expiryDate" className="w-full p-2 border rounded" />
            <ErrorMessage name="expiryDate" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Description</label>
            <Field as="textarea" name="description" className="w-full p-2 border rounded" />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              Add Supplement
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

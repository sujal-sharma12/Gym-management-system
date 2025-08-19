import { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { db } from "../../config/firebase";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export default function AddDietPlan() {
  const [success, setSuccess] = useState("");

  const initialValues = {
    planName: "",
    description: "",
    calories: "",
    duration: "",
  };

  const validationSchema = Yup.object({
    planName: Yup.string().required("Plan name is required"),
    description: Yup.string().required("Description is required"),
    calories: Yup.number().required("Calories is required").positive(),
    duration: Yup.string().required("Duration is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await addDoc(collection(db, "DietPlans"), {
        ...values,
        createdAt: Timestamp.now(),
      });
      setSuccess("Diet Plan added successfully!");
      resetForm();
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Error adding diet plan: ", error);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add Diet Plan</h2>
      {success && <p className="text-green-600 mb-4">{success}</p>}

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Plan Name</label>
            <Field name="planName" className="w-full p-2 border rounded" />
            <ErrorMessage name="planName" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="md:col-span-2">
            <label className="block font-semibold mb-1">Description</label>
            <Field as="textarea" name="description" className="w-full p-2 border rounded" />
            <ErrorMessage name="description" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Calories</label>
            <Field type="number" name="calories" className="w-full p-2 border rounded" />
            <ErrorMessage name="calories" component="div" className="text-red-500 text-sm" />
          </div>

          <div>
            <label className="block font-semibold mb-1">Duration</label>
            <Field name="duration" className="w-full p-2 border rounded" placeholder="e.g. 4 Weeks" />
            <ErrorMessage name="duration" component="div" className="text-red-500 text-sm" />
          </div>

          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              Add Diet Plan
            </button>
          </div>
        </Form>
      </Formik>
    </div>
  );
}

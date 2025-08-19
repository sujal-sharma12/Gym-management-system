import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { useState } from "react";

export default function AdminLogin() {
  const navigate = useNavigate();
  const [firebaseError, setFirebaseError] = useState("");

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email format").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  const handleLogin = async (values) => {
    setFirebaseError("");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      );

      const user = userCredential.user;
      const docRef = doc(db, "Users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists() && (docSnap.data().Role || docSnap.data().role) === "admin") {
        navigate("/admin/dashboard");
      } else {
        setFirebaseError("You are not authorized as admin.");
      }
    } catch (err) {
      setFirebaseError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-black">
      <div className="bg-gray-900 p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img src="/logo/2.png" alt="Gym Logo" className="h-16 rounded-full object-cover" />
        </div>
        <h2 className="text-white text-2xl font-bold text-center mb-2">ADMIN LOGIN</h2>

        {firebaseError && (
          <p className="text-red-500 text-sm text-center mb-4">{firebaseError}</p>
        )}

        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={validationSchema}
          onSubmit={handleLogin}
        >
          <Form className="space-y-4">
            <div>
              <label className="block text-gray-300 text-sm mb-1">Email</label>
              <Field
                type="email"
                name="email"
                placeholder="admin@gmail.com"
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
              />
              <ErrorMessage
                name="email"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <div>
              <label className="block text-gray-300 text-sm mb-1">Password</label>
              <Field
                type="password"
                name="password"
                placeholder="••••••••"
                className="w-full p-3 rounded bg-gray-800 text-white border border-gray-700"
              />
              <ErrorMessage
                name="password"
                component="p"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-blue-600 hover:bg-blue-700 text-white rounded font-semibold"
            >
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
}

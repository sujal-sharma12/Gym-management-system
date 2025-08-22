import React, { useEffect } from "react";
import gymImage from "../assets/gym.jpg";

export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = "smooth";
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="fixed top-0 left-0 w-full bg-black/80 backdrop-blur-md z-50 shadow-md">
        <div className="max-w-6xl mx-auto flex justify-between items-center py-4 px-6">
             <div className="flex items-center gap-4">
              <img
                 src="/logo/2.png"
                alt="Hanover Fitness Center"
                className="h-12 w-12 rounded-full object-cover shadow-lg"
              />
             <span className="text-xl font-bold">Hanover Fitness</span>
           </div>
           <nav className="flex gap-6">
            <a href="#packages" className="hover:text-blue-500 transition">
               Packages
             </a>
             <a href="#trainers" className="hover:text-blue-500 transition">
              Trainers
            </a>
             <a href="#contact" className="hover:text-blue-500 transition">
               Contact
            </a>
          </nav>
        </div>
      </header>

       <section className="relative h-screen flex items-center justify-center pt-20">
        <img
           src={gymImage}
          alt="Gym background"
           className="absolute inset-0 w-full h-full object-cover filter blur-sm brightness-75"
         />
        <div className="absolute inset-0 bg-black/60" />
         <div className="relative z-10 flex flex-col items-center text-center px-4">
           <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold mb-2">
             Hanover Fitness Center
           </h1>
           <p className="text-gray-300 max-w-2xl mb-6">
            Push Your Limits • Build Strength • Join the Family
           </p>
           <div className="flex flex-col sm:flex-row gap-4 mt-2">
              <a
              href="/Admin/login"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition transform hover:-translate-y-0.5 shadow-lg"
            >
              Admin Login
            </a>
            <a
              href="/Member/login"
              className="inline-flex items-center justify-center px-6 py-3 rounded-lg bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition transform hover:-translate-y-0.5 shadow-lg"
            >
              Member Login
            </a>
          </div>
        </div>
      </section>

      <section id="packages" className="py-16 px-6 max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-center">Our Packages</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Basic", price: 1000, desc: "Starter plan for beginners" },
             { name: "Standard", price: 2000, desc: "Most popular for regulars" },
             { name: "Premium", price: 3500, desc: "All features + personal training" },
           ].map((pkg) => (
            <div
              key={pkg.name}
               className="bg-gray-900 p-6 rounded-2xl shadow-lg transform transition duration-300 hover:scale-105 hover:shadow-2xl border border-white/5"
            >
               <h3 className="text-2xl font-semibold mb-2">{pkg.name} Plan</h3>
              <p className="text-gray-300 mb-4">{pkg.desc}</p>
               <p className="text-xl font-bold mb-4">₹{pkg.price}/month</p>
               <button className="px-4 py-2 bg-transparent border border-green-500 rounded hover:bg-green-600/20 transition">
                Join Now
               </button>
            </div>
          ))}
        </div>
      </section>

      <section id="trainers" className="py-16 px-6 bg-gray-900">
         <h2 className="text-3xl font-bold mb-8 text-center">Our Trainers</h2>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {["Amit Sharma", "Priya Singh", "Rahul Mehta"].map((t) => (
             <div
              key={t}
               className="bg-gray-800 p-6 rounded-2xl text-center transform transition hover:-translate-y-2 hover:shadow-xl border border-white/5"
             >
               <div className="w-28 h-28 bg-gray-700 rounded-full mx-auto mb-4 flex items-center justify-center text-xl font-semibold">
                 {t.split(" ").map((n) => n[0]).join("")}
                </div>
              <h3 className="text-xl font-semibold">{t}</h3>
               <p className="text-gray-400">Certified Fitness Trainer</p>
            </div>
          ))}
        </div>
      </section>

      <section id="contact" className="py-16 px-6 max-w-6xl mx-auto">
  <h2 className="text-3xl font-bold mb-8 text-center">Get In Touch</h2>
  <div className="flex flex-col md:flex-row gap-12">
    
    <div className="md:w-1/2 text-center md:text-left flex flex-col justify-center">
      <p className="text-gray-300 mb-4 text-lg">
        Have questions or want to join Hanover Fitness Center? Reach out to us and we'll get back to you as soon as possible.
      </p>
      <p className="text-gray-300 mb-2">📧 Email: hanoverfitness@gmail.com</p>
      <p className="text-gray-300 mb-2">📞 Phone: +91 12345 67890</p>
      <p className="text-gray-300">🏢 Address: 123 Fitness Street, Your City</p>
    </div>

    <div className="md:w-1/2 bg-gray-800 p-8 rounded-xl shadow-lg">
       <form className="flex flex-col gap-4">
        <input
           type="text"
          placeholder="Full Name"
           className="px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
         />
         <input
           type="email"
           placeholder="Email"
          className="px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
        />
        <textarea
          placeholder="Your Message"
          rows={5}
           className="px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none focus:border-blue-500"
         />
          <button
           type="submit"
            className="px-6 py-3 bg-red-600 hover:bg-red-700 rounded-lg text-white transition"
          >
          Send Message
        </button>
      </form>
    </div>
  </div>
</section>


      <footer className="py-6 text-center text-gray-500">
        © {new Date().getFullYear()} Hanover Fitness Center. All rights reserved.
      </footer>
    </div>
  );
}

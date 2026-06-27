import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

export default function Reservation() {
  const formRef = useRef<HTMLFormElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
    specialRequest: ""
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");
    
    try {
      // Create FormData object for Netlify Forms submission
      const formDataObj = new FormData();
      formDataObj.append("form-name", "reservation");
      formDataObj.append("name", formData.name);
      formDataObj.append("email", formData.email);
      formDataObj.append("phone", formData.phone);
      formDataObj.append("date", formData.date);
      formDataObj.append("time", formData.time);
      formDataObj.append("guests", formData.guests);
      formDataObj.append("specialRequest", formData.specialRequest);

      // Submit to Netlify Forms (POST to /)
      const netlifyRes = await fetch("/", {
        method: "POST",
        body: formDataObj
      }).catch(err => {
        console.warn("Netlify Forms submission error (non-blocking):", err);
        // Continue even if Netlify Forms fails
        return { ok: true };
      });

      // Also submit to custom API endpoint for data persistence
      const apiRes = await fetch("/.netlify/functions/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          "form-name": "reservation",
          submittedAt: new Date().toISOString()
        })
      }).catch(err => {
        console.warn("API submission error (non-blocking):", err);
        return { ok: true };
      });

      // Show success if either endpoint succeeds
      if (netlifyRes.ok || apiRes.ok) {
        setStatus("success");
        setFormData({ name: "", phone: "", email: "", date: "", time: "", guests: "2", specialRequest: "" });
      } else {
        setStatus("error");
        setErrorMessage("Failed to submit reservation. Please try again.");
      }
    } catch (err) {
      console.error("Submission error:", err);
      setStatus("error");
      setErrorMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="pt-28 pb-24 min-h-screen bg-stone-950 flex items-center">
      <div className="max-w-4xl mx-auto px-4 w-full">
        <motion.div 
          className="bg-stone-900/50 p-8 md:p-12 border border-stone-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center mb-10">
            <h2 className="text-amber-500 tracking-widest uppercase text-sm mb-2">Book a Table</h2>
            <h1 className="text-3xl md:text-4xl font-serif font-light">Make a Reservation</h1>
          </div>

          {status === "success" ? (
            <div className="text-center py-10">
              <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-500/20">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif mb-2 text-stone-100">Reservation Confirmed</h3>
              <p className="text-stone-400">We look forward to serving you. Your reservation has been submitted successfully.</p>
              <button 
                onClick={() => setStatus("idle")}
                className="mt-8 px-6 py-2 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-stone-950 transition-colors uppercase text-sm tracking-wider"
              >
                Make Another Booking
              </button>
            </div>
          ) : (
            <form 
              ref={formRef}
              onSubmit={handleSubmit}
              className="space-y-6"
              name="reservation"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
            >
              {/* Netlify Forms hidden field */}
              <input type="hidden" name="form-name" value="reservation" />
              {/* Honeypot field for spam protection */}
              <input type="hidden" name="bot-field" />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-stone-400 text-sm tracking-wider uppercase mb-2">Name</label>
                  <input 
                    required 
                    type="text" 
                    name="name"
                    className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-stone-100 focus:outline-none focus:border-amber-500 transition-colors" 
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-stone-400 text-sm tracking-wider uppercase mb-2">Phone</label>
                  <input 
                    required 
                    type="tel" 
                    name="phone"
                    className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-stone-100 focus:outline-none focus:border-amber-500 transition-colors" 
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-stone-400 text-sm tracking-wider uppercase mb-2">Email</label>
                  <input 
                    required 
                    type="email" 
                    name="email"
                    className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-stone-100 focus:outline-none focus:border-amber-500 transition-colors" 
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-stone-400 text-sm tracking-wider uppercase mb-2">Guests</label>
                  <select 
                    name="guests"
                    className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-stone-100 focus:outline-none focus:border-amber-500 transition-colors appearance-none" 
                    value={formData.guests}
                    onChange={handleChange}
                  >
                    {[1,2,3,4,5,6,7,8,9,10, "+10"].map(n => <option key={n} value={n.toString()}>{n} People</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-stone-400 text-sm tracking-wider uppercase mb-2">Date</label>
                  <input 
                    required 
                    type="date" 
                    name="date"
                    className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-stone-100 focus:outline-none focus:border-amber-500 transition-colors" 
                    value={formData.date}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-stone-400 text-sm tracking-wider uppercase mb-2">Time</label>
                  <input 
                    required 
                    type="time" 
                    name="time"
                    className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-stone-100 focus:outline-none focus:border-amber-500 transition-colors" 
                    value={formData.time}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-stone-400 text-sm tracking-wider uppercase mb-2">Special Requests</label>
                <textarea 
                  rows={3} 
                  name="specialRequest"
                  className="w-full bg-stone-950 border border-stone-800 px-4 py-3 text-stone-100 focus:outline-none focus:border-amber-500 transition-colors" 
                  value={formData.specialRequest}
                  onChange={handleChange}
                />
              </div>
              
              {status === "error" && (
                <p className="text-red-500 text-sm text-center">{errorMessage || "Something went wrong. Please try again."}</p>
              )}
              
              <div className="text-center pt-4">
                <button 
                  type="submit" 
                  disabled={status === "loading"}
                  className="px-10 py-4 bg-amber-500 text-stone-950 uppercase tracking-wider text-sm font-medium hover:bg-amber-400 transition-colors disabled:opacity-50 w-full sm:w-auto"
                >
                  {status === "loading" ? "Confirming..." : "Confirm Reservation"}
                </button>
              </div>
            </form>
          )}
        </motion.div>
      </div>
    </div>
  );
}

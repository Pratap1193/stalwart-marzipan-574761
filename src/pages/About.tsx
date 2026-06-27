import { motion } from "framer-motion";
import { useSiteData } from "../DataContext";

export default function About() {
  const { data } = useSiteData();

  if (!data) return null;

  return (
    <div className="pt-28 pb-24 min-h-screen bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-serif font-light mb-4">Our Story</h1>
          <p className="text-stone-400 max-w-2xl mx-auto">A legacy of culinary excellence spanning over two decades.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center mb-24">
          <img src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80" alt="Restaurant Interior" className="w-full h-[500px] object-cover rounded-sm opacity-90" />
          <div>
            <h2 className="text-3xl font-serif font-light mb-6 text-amber-500">The Vision</h2>
            <p className="text-stone-300 leading-relaxed mb-6">
              Founded in 2005, {data.website.restaurantName} was born from a passion for authentic flavors and modern culinary techniques. Our vision has always been to create a space where food is celebrated as an art form.
            </p>
            <p className="text-stone-300 leading-relaxed">
              We source our ingredients from local artisans and organic farms, ensuring that every dish tells a story of quality and sustainability.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

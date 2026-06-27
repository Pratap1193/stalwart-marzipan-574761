import { motion } from "framer-motion";
import { useSiteData } from "../DataContext";

export default function Gallery() {
  const { data, loading } = useSiteData();

  if (loading || !data) return <div className="pt-28 pb-24 min-h-screen bg-stone-950 flex justify-center items-center text-amber-500">Loading...</div>;

  return (
    <div className="pt-28 pb-24 min-h-screen bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif font-light mb-4">Gallery</h1>
          <p className="text-stone-400">A glimpse into the Lime Light experience.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.gallery.map((img, i) => (
            <motion.div 
              key={img.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.1 }}
              className="aspect-square overflow-hidden group cursor-pointer"
            >
              <img src={img.url} alt="Gallery image" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

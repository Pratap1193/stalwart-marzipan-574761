import { motion } from "framer-motion";
import { Link } from "react-router";
import { useSiteData } from "../DataContext";

export default function Home() {
  const { data, loading } = useSiteData();

  if (loading || !data) return null;

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={data.website.homepageBanner} 
            alt="Restaurant interior" 
            className="w-full h-full object-cover opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-stone-950/50 via-stone-950/20 to-stone-950"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-amber-500 tracking-[0.3em] uppercase text-sm font-semibold mb-4">{data.website.homepageText.title}</h2>
            <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 font-serif">
              {data.website.restaurantName}
            </h1>
            <p className="text-stone-300 text-lg md:text-xl mb-10 font-light max-w-2xl mx-auto leading-relaxed">
              {data.website.homepageText.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/reservation" className="px-8 py-3 bg-amber-500 text-stone-950 uppercase tracking-wider text-sm font-medium hover:bg-amber-400 transition-colors w-full sm:w-auto">
                Reserve a Table
              </Link>
              <Link to="/menu" className="px-8 py-3 border border-stone-500 text-stone-100 uppercase tracking-wider text-sm font-medium hover:border-amber-500 hover:text-amber-500 transition-colors w-full sm:w-auto">
                View Menu
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-24 bg-stone-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <img 
                src="https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&w=1000&q=80" 
                alt="Chef preparing food" 
                className="w-full h-[600px] object-cover rounded-sm"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h3 className="text-amber-500 tracking-widest uppercase text-sm mb-2">Our Story</h3>
              <h2 className="text-4xl font-serif font-light mb-6">Culinary Artistry</h2>
              <p className="text-stone-400 leading-relaxed mb-6">
                At {data.website.restaurantName}, we believe that dining is not just about food, but an experience that engages all senses. Our executive chefs bring decades of experience from Michelin-starred kitchens around the world.
              </p>
              <p className="text-stone-400 leading-relaxed mb-8">
                Every dish is crafted with precision, using only the finest seasonal ingredients sourced from local organic farms and premium international suppliers.
              </p>
              <Link to="/about" className="inline-flex items-center text-amber-500 uppercase tracking-wider text-sm font-medium hover:text-amber-400 transition-colors">
                Discover More <span className="ml-2">&rarr;</span>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}

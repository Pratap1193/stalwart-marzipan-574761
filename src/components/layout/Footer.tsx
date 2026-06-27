import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";
import { useSiteData } from "../../DataContext";

export default function Footer() {
  const { data } = useSiteData();

  if (!data) return null;

  return (
    <footer className="bg-stone-950 border-t border-stone-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 text-center md:text-left">
          <div className="md:col-span-1">
            <span className="text-2xl font-bold tracking-widest text-amber-500 uppercase block mb-4">{data.website.restaurantName}</span>
            <p className="text-stone-400 text-sm leading-relaxed">
              Experience the pinnacle of fine dining. Where culinary artistry meets luxury in every bite.
            </p>
          </div>
          <div>
            <h4 className="text-stone-100 uppercase tracking-widest mb-4 font-semibold text-sm">Hours</h4>
            <ul className="text-stone-400 text-sm space-y-2">
              <li>{data.contact.openingHours.weekdays}</li>
              <li>{data.contact.openingHours.weekends}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-stone-100 uppercase tracking-widest mb-4 font-semibold text-sm">Contact</h4>
            <ul className="text-stone-400 text-sm space-y-2">
              <li>{data.contact.address}</li>
              <li>{data.contact.phone}</li>
              <li>{data.contact.email}</li>
            </ul>
          </div>
          <div>
            <h4 className="text-stone-100 uppercase tracking-widest mb-4 font-semibold text-sm">Follow Us</h4>
            <div className="flex justify-center md:justify-start space-x-4">
              {data.social.instagram && <a href={data.social.instagram} className="text-stone-400 hover:text-amber-500 transition-colors"><Instagram size={20} /></a>}
              {data.social.facebook && <a href={data.social.facebook} className="text-stone-400 hover:text-amber-500 transition-colors"><Facebook size={20} /></a>}
              {data.social.twitter && <a href={data.social.twitter} className="text-stone-400 hover:text-amber-500 transition-colors"><Twitter size={20} /></a>}
              {data.social.youtube && <a href={data.social.youtube} className="text-stone-400 hover:text-amber-500 transition-colors"><Youtube size={20} /></a>}
            </div>
          </div>
        </div>
        <div className="border-t border-stone-900 pt-8 text-center text-stone-500 text-sm">
          &copy; {new Date().getFullYear()} {data.website.restaurantName}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

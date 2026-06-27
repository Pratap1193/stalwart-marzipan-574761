import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { LogOut, LayoutDashboard, Settings, UtensilsCrossed, Image as ImageIcon, Contact, Share2, Search } from "lucide-react";
import { useSiteData, SiteData } from "../../DataContext";

export default function AdminDashboard() {
  const { data: initialData, loading, refreshData } = useSiteData();
  const [data, setData] = useState<SiteData | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const navigate = useNavigate();

  const token = localStorage.getItem("admin_token");

  useEffect(() => {
    if (!token) navigate("/admin");
  }, [token, navigate]);

  useEffect(() => {
    if (initialData) {
      setData(JSON.parse(JSON.stringify(initialData))); // Deep copy
    }
  }, [initialData]);

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin");
  };

  const handleSave = async () => {
    if (!data) return;
    setSaveStatus("saving");
    try {
      const res = await fetch("/api/admin/update", {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        setSaveStatus("saved");
        refreshData();
        setTimeout(() => setSaveStatus("idle"), 2000);
      } else {
        setSaveStatus("error");
      }
    } catch (e) {
      setSaveStatus("error");
    }
  };

  if (loading || !data) return <div className="min-h-screen bg-stone-950 flex items-center justify-center text-amber-500">Loading...</div>;

  return (
    <div className="min-h-screen bg-stone-950 flex">
      {/* Sidebar */}
      <aside className="w-64 border-r border-stone-800 bg-stone-900/30 flex flex-col hidden md:flex h-screen sticky top-0 overflow-y-auto">
        <div className="h-20 flex items-center px-6 border-b border-stone-800 shrink-0">
          <span className="text-xl font-bold tracking-widest text-amber-500 uppercase">Admin Panel</span>
        </div>
        <nav className="flex-1 py-6 px-4 space-y-2">
          <button onClick={() => setActiveTab("overview")} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-sm transition-colors ${activeTab === 'overview' ? 'bg-amber-500/10 text-amber-500' : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800'}`}>
            <LayoutDashboard size={18} /><span>Overview</span>
          </button>
          <button onClick={() => setActiveTab("website")} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-sm transition-colors ${activeTab === 'website' ? 'bg-amber-500/10 text-amber-500' : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800'}`}>
            <Settings size={18} /><span>Website Settings</span>
          </button>
          <button onClick={() => setActiveTab("menu")} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-sm transition-colors ${activeTab === 'menu' ? 'bg-amber-500/10 text-amber-500' : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800'}`}>
            <UtensilsCrossed size={18} /><span>Menu Manager</span>
          </button>
          <button onClick={() => setActiveTab("gallery")} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-sm transition-colors ${activeTab === 'gallery' ? 'bg-amber-500/10 text-amber-500' : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800'}`}>
            <ImageIcon size={18} /><span>Gallery</span>
          </button>
          <button onClick={() => setActiveTab("contact")} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-sm transition-colors ${activeTab === 'contact' ? 'bg-amber-500/10 text-amber-500' : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800'}`}>
            <Contact size={18} /><span>Contact & Hours</span>
          </button>
          <button onClick={() => setActiveTab("social")} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-sm transition-colors ${activeTab === 'social' ? 'bg-amber-500/10 text-amber-500' : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800'}`}>
            <Share2 size={18} /><span>Social Media</span>
          </button>
          <button onClick={() => setActiveTab("seo")} className={`w-full flex items-center space-x-3 px-4 py-3 rounded-sm transition-colors ${activeTab === 'seo' ? 'bg-amber-500/10 text-amber-500' : 'text-stone-400 hover:text-stone-100 hover:bg-stone-800'}`}>
            <Search size={18} /><span>SEO Settings</span>
          </button>
        </nav>
        <div className="p-4 border-t border-stone-800 shrink-0">
          <button onClick={logout} className="w-full flex items-center space-x-3 px-4 py-3 text-stone-400 hover:text-red-400 transition-colors">
            <LogOut size={18} /><span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 min-h-screen">
        <div className="sticky top-0 z-10 bg-stone-950 border-b border-stone-800 px-8 py-4 flex justify-between items-center">
          <h2 className="text-stone-100 font-serif text-xl capitalize">{activeTab} Settings</h2>
          <button 
            onClick={handleSave} 
            disabled={saveStatus === "saving"}
            className="px-6 py-2 bg-amber-500 text-stone-950 uppercase tracking-wider text-xs font-semibold hover:bg-amber-400 transition-colors disabled:opacity-50"
          >
            {saveStatus === "saving" ? "Saving..." : saveStatus === "saved" ? "Saved!" : "Save Changes"}
          </button>
        </div>
        <div className="p-8 pb-32">
          
          {activeTab === "overview" && (
            <div>
              <p className="text-stone-400 mb-8">Welcome back to the Lime Light admin panel. From here, you can manage all content on your website which is safely stored in local JSON files.</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 <div className="p-6 border border-stone-800 bg-stone-900/50">
                  <p className="text-stone-400 text-sm uppercase tracking-wider mb-2">Menu Items</p>
                  <p className="text-3xl text-amber-500 font-light">{data.menu.length}</p>
                </div>
                <div className="p-6 border border-stone-800 bg-stone-900/50">
                  <p className="text-stone-400 text-sm uppercase tracking-wider mb-2">Gallery Photos</p>
                  <p className="text-3xl text-amber-500 font-light">{data.gallery.length}</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === "website" && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Restaurant Name</label>
                <input type="text" className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                  value={data.website.restaurantName} onChange={e => setData({...data, website: {...data.website, restaurantName: e.target.value}})} />
              </div>
              <div>
                <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Logo Text</label>
                <input type="text" className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                  value={data.website.logo} onChange={e => setData({...data, website: {...data.website, logo: e.target.value}})} />
              </div>
              <div>
                <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Favicon URL</label>
                <input type="text" className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                  value={data.website.favicon} onChange={e => setData({...data, website: {...data.website, favicon: e.target.value}})} />
              </div>
              <div>
                <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Homepage Banner Image URL</label>
                <input type="text" className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                  value={data.website.homepageBanner} onChange={e => setData({...data, website: {...data.website, homepageBanner: e.target.value}})} />
              </div>
              <div>
                <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Homepage Title</label>
                <input type="text" className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                  value={data.website.homepageText.title} onChange={e => setData({...data, website: {...data.website, homepageText: {...data.website.homepageText, title: e.target.value}}})} />
              </div>
              <div>
                <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Homepage Subtitle</label>
                <textarea rows={3} className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                  value={data.website.homepageText.subtitle} onChange={e => setData({...data, website: {...data.website, homepageText: {...data.website.homepageText, subtitle: e.target.value}}})} />
              </div>
            </div>
          )}

          {activeTab === "menu" && (
            <div className="space-y-6 max-w-4xl">
              <button 
                onClick={() => setData({
                  ...data, 
                  menu: [...data.menu, { id: Date.now().toString(), name: "New Item", description: "Description", price: 0, category: "Starters", image: "" }]
                })}
                className="px-4 py-2 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-stone-950 text-sm uppercase tracking-wider"
              >
                + Add Menu Item
              </button>
              
              <div className="space-y-8 mt-6">
                {data.menu.map((item, index) => (
                  <div key={item.id} className="p-6 border border-stone-800 bg-stone-900/30">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="text-amber-500 font-serif">Item #{index + 1}</h4>
                      <button 
                        onClick={() => setData({...data, menu: data.menu.filter(m => m.id !== item.id)})}
                        className="text-red-500 text-sm hover:text-red-400 uppercase"
                      >
                        Remove
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-stone-400 text-xs tracking-wider uppercase mb-1">Name</label>
                        <input type="text" className="w-full bg-stone-900 border border-stone-800 p-2 text-stone-100 focus:border-amber-500 focus:outline-none" 
                          value={item.name} 
                          onChange={e => {
                            const newMenu = [...data.menu];
                            newMenu[index].name = e.target.value;
                            setData({...data, menu: newMenu});
                          }} 
                        />
                      </div>
                      <div>
                        <label className="block text-stone-400 text-xs tracking-wider uppercase mb-1">Price</label>
                        <input type="number" step="0.01" className="w-full bg-stone-900 border border-stone-800 p-2 text-stone-100 focus:border-amber-500 focus:outline-none" 
                          value={item.price} 
                          onChange={e => {
                            const newMenu = [...data.menu];
                            newMenu[index].price = parseFloat(e.target.value);
                            setData({...data, menu: newMenu});
                          }} 
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-stone-400 text-xs tracking-wider uppercase mb-1">Description</label>
                        <input type="text" className="w-full bg-stone-900 border border-stone-800 p-2 text-stone-100 focus:border-amber-500 focus:outline-none" 
                          value={item.description} 
                          onChange={e => {
                            const newMenu = [...data.menu];
                            newMenu[index].description = e.target.value;
                            setData({...data, menu: newMenu});
                          }} 
                        />
                      </div>
                      <div>
                        <label className="block text-stone-400 text-xs tracking-wider uppercase mb-1">Category</label>
                        <input type="text" className="w-full bg-stone-900 border border-stone-800 p-2 text-stone-100 focus:border-amber-500 focus:outline-none" 
                          value={item.category} 
                          onChange={e => {
                            const newMenu = [...data.menu];
                            newMenu[index].category = e.target.value;
                            setData({...data, menu: newMenu});
                          }} 
                        />
                      </div>
                      <div>
                        <label className="block text-stone-400 text-xs tracking-wider uppercase mb-1">Image URL</label>
                        <input type="text" className="w-full bg-stone-900 border border-stone-800 p-2 text-stone-100 focus:border-amber-500 focus:outline-none" 
                          value={item.image} 
                          onChange={e => {
                            const newMenu = [...data.menu];
                            newMenu[index].image = e.target.value;
                            setData({...data, menu: newMenu});
                          }} 
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "gallery" && (
            <div className="space-y-6 max-w-4xl">
              <button 
                onClick={() => setData({
                  ...data, 
                  gallery: [...data.gallery, { id: Date.now().toString(), url: "" }]
                })}
                className="px-4 py-2 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-stone-950 text-sm uppercase tracking-wider"
              >
                + Add Image URL
              </button>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {data.gallery.map((img, index) => (
                  <div key={img.id} className="p-4 border border-stone-800 bg-stone-900/30 flex flex-col">
                    <img src={img.url || "https://placehold.co/400x300?text=No+Image"} alt="" className="w-full h-32 object-cover mb-4" />
                    <label className="block text-stone-400 text-xs tracking-wider uppercase mb-1">Image URL</label>
                    <input type="text" className="w-full bg-stone-900 border border-stone-800 p-2 text-stone-100 text-xs focus:border-amber-500 focus:outline-none mb-2" 
                      value={img.url} 
                      onChange={e => {
                        const newGallery = [...data.gallery];
                        newGallery[index].url = e.target.value;
                        setData({...data, gallery: newGallery});
                      }} 
                    />
                    <button 
                      onClick={() => setData({...data, gallery: data.gallery.filter(g => g.id !== img.id)})}
                      className="mt-auto py-2 bg-red-500/10 text-red-500 hover:bg-red-500/20 text-xs uppercase"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === "contact" && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Address</label>
                <input type="text" className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                  value={data.contact.address} onChange={e => setData({...data, contact: {...data.contact, address: e.target.value}})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Phone</label>
                  <input type="text" className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                    value={data.contact.phone} onChange={e => setData({...data, contact: {...data.contact, phone: e.target.value}})} />
                </div>
                <div>
                  <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">WhatsApp</label>
                  <input type="text" className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                    value={data.contact.whatsapp} onChange={e => setData({...data, contact: {...data.contact, whatsapp: e.target.value}})} />
                </div>
              </div>
              <div>
                <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Email</label>
                <input type="email" className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                  value={data.contact.email} onChange={e => setData({...data, contact: {...data.contact, email: e.target.value}})} />
              </div>
              <div>
                <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Google Maps Embed URL</label>
                <textarea rows={3} className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                  value={data.contact.googleMapsLink} onChange={e => setData({...data, contact: {...data.contact, googleMapsLink: e.target.value}})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Weekday Hours</label>
                  <input type="text" className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                    value={data.contact.openingHours.weekdays} onChange={e => setData({...data, contact: {...data.contact, openingHours: {...data.contact.openingHours, weekdays: e.target.value}}})} />
                </div>
                <div>
                  <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Weekend Hours</label>
                  <input type="text" className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                    value={data.contact.openingHours.weekends} onChange={e => setData({...data, contact: {...data.contact, openingHours: {...data.contact.openingHours, weekends: e.target.value}}})} />
                </div>
              </div>
            </div>
          )}

          {activeTab === "social" && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Facebook URL</label>
                <input type="text" className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                  value={data.social.facebook} onChange={e => setData({...data, social: {...data.social, facebook: e.target.value}})} />
              </div>
              <div>
                <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Instagram URL</label>
                <input type="text" className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                  value={data.social.instagram} onChange={e => setData({...data, social: {...data.social, instagram: e.target.value}})} />
              </div>
              <div>
                <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Twitter / X URL</label>
                <input type="text" className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                  value={data.social.twitter} onChange={e => setData({...data, social: {...data.social, twitter: e.target.value}})} />
              </div>
              <div>
                <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">YouTube URL</label>
                <input type="text" className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                  value={data.social.youtube} onChange={e => setData({...data, social: {...data.social, youtube: e.target.value}})} />
              </div>
            </div>
          )}

          {activeTab === "seo" && (
            <div className="space-y-6 max-w-2xl">
              <div>
                <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Meta Title</label>
                <input type="text" className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                  value={data.seo.metaTitle} onChange={e => setData({...data, seo: {...data.seo, metaTitle: e.target.value}})} />
              </div>
              <div>
                <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Meta Description</label>
                <textarea rows={3} className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                  value={data.seo.metaDescription} onChange={e => setData({...data, seo: {...data.seo, metaDescription: e.target.value}})} />
              </div>
              <div>
                <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Keywords</label>
                <input type="text" className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                  value={data.seo.keywords} onChange={e => setData({...data, seo: {...data.seo, keywords: e.target.value}})} />
              </div>
              <div>
                <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">Open Graph Image URL</label>
                <input type="text" className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none" 
                  value={data.seo.openGraphImage} onChange={e => setData({...data, seo: {...data.seo, openGraphImage: e.target.value}})} />
              </div>
              <div>
                <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">robots.txt Content</label>
                <textarea rows={4} className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none font-mono text-sm" 
                  value={data.seo.robotsTxt} onChange={e => setData({...data, seo: {...data.seo, robotsTxt: e.target.value}})} />
              </div>
              <div>
                <label className="block text-stone-400 text-xs tracking-wider uppercase mb-2">sitemap.xml Content</label>
                <textarea rows={6} className="w-full bg-stone-900 border border-stone-800 p-3 text-stone-100 focus:border-amber-500 focus:outline-none font-mono text-sm" 
                  value={data.seo.sitemapXml} onChange={e => setData({...data, seo: {...data.seo, sitemapXml: e.target.value}})} />
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}

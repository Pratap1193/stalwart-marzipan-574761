/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router";
import { useEffect } from "react";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reservation from "./pages/Reservation";
import About from "./pages/About";
import Gallery from "./pages/Gallery";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import { useSiteData } from "./DataContext";

export default function App() {
  const { data } = useSiteData();

  useEffect(() => {
    if (data) {
      document.title = data.seo.metaTitle;
      
      const updateMeta = (name: string, content: string, isProperty = false) => {
        let element = document.querySelector(isProperty ? `meta[property="${name}"]` : `meta[name="${name}"]`);
        if (!element) {
          element = document.createElement('meta');
          if (isProperty) element.setAttribute('property', name);
          else element.setAttribute('name', name);
          document.head.appendChild(element);
        }
        element.setAttribute('content', content);
      };

      updateMeta('description', data.seo.metaDescription);
      updateMeta('keywords', data.seo.keywords);
      updateMeta('og:title', data.seo.metaTitle, true);
      updateMeta('og:description', data.seo.metaDescription, true);
      updateMeta('og:image', data.seo.openGraphImage, true);
      
      const favicon = document.querySelector("link[rel~='icon']") as HTMLLinkElement;
      if (favicon) favicon.href = data.website.favicon;
    }
  }, [data]);

  return (
    <Router>
      <div className="min-h-screen bg-stone-950 text-stone-50 font-sans selection:bg-amber-500/30">
        <Routes>
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route
            path="*"
            element={
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1">
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/menu" element={<Menu />} />
                    <Route path="/gallery" element={<Gallery />} />
                    <Route path="/reservation" element={<Reservation />} />
                  </Routes>
                </main>
                <Footer />
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}


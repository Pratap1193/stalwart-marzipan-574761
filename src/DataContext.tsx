import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type SiteData = {
  website: {
    restaurantName: string;
    logo: string;
    favicon: string;
    homepageBanner: string;
    homepageText: { title: string; subtitle: string };
  };
  contact: {
    address: string;
    phone: string;
    whatsapp: string;
    email: string;
    googleMapsLink: string;
    openingHours: { weekdays: string; weekends: string };
  };
  social: {
    facebook: string;
    instagram: string;
    youtube: string;
    twitter: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string;
    openGraphImage: string;
    robotsTxt: string;
    sitemapXml: string;
  };
  menu: Array<{
    id: string;
    name: string;
    description: string;
    price: number;
    category: string;
    image: string;
  }>;
  gallery: Array<{
    id: string;
    url: string;
  }>;
};

type DataContextType = {
  data: SiteData | null;
  loading: boolean;
  refreshData: () => void;
};

const DataContext = createContext<DataContextType>({
  data: null,
  loading: true,
  refreshData: () => {},
});

export function DataProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<SiteData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const res = await fetch("/api/data");
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Failed to fetch site data", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <DataContext.Provider value={{ data, loading, refreshData: fetchData }}>
      {children}
    </DataContext.Provider>
  );
}

export function useSiteData() {
  return useContext(DataContext);
}

import { motion } from "framer-motion";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { DashboardTabs } from "@/components/dashboard/DashboardTabs";
import { CompanySidebar } from "@/components/CompanySidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { FloatingChatbot } from "@/components/FloatingChatbot";
import { Tutorial } from "@/components/Tutorial";
import { useHotkeys } from "react-hotkeys-hook";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from 'react-i18next';
import '../i18n/config';

const Index = () => {
  const { toast } = useToast();
  const { t } = useTranslation();
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsHeaderVisible(false);
      } else {
        setIsHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  useEffect(() => {
    document.documentElement.classList.add("dark");
  }, []);

  useHotkeys("?", () => {
    toast({
      title: t("availableShortcuts"),
      description: t("shortcutsDescription"),
    });
  });

  useHotkeys("ctrl+k", (e) => {
    e.preventDefault();
    toast({
      title: t("search"),
      description: t("searchComingSoon"),
    });
  });

  return (
    <div className="min-h-screen bg-background">
      <Tutorial />
      <DashboardHeader isHeaderVisible={isHeaderVisible} />
      
      <div className="pt-28">
        <SidebarProvider>
          <div className="min-h-screen flex w-full flex-col lg:flex-row">
            <CompanySidebar />
            <main className="flex-1 p-4 lg:pl-[320px] transition-all duration-300">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="flex flex-col gap-6"
              >
                <DashboardTabs />
              </motion.div>
            </main>
          </div>
        </SidebarProvider>
        <FloatingChatbot />
      </div>
    </div>
  );
};

export default Index;
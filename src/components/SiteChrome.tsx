import Navbar from "./Navbar";
import Footer from "./Footer";
import MobileTabBar from "./MobileTabBar";
import { ShelfProvider } from "@/lib/shelf-store";

export default function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <ShelfProvider>
      <Navbar />
      <main className="flex-1 pb-20 lg:pb-0">{children}</main>
      <Footer />
      <MobileTabBar />
    </ShelfProvider>
  );
}

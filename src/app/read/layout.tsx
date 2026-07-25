import { ShelfProvider } from "@/lib/shelf-store";

export default function ReadLayout({ children }: { children: React.ReactNode }) {
  return <ShelfProvider>{children}</ShelfProvider>;
}

import Navbar from "@/components/navbar/Navbar";
import Userbar from "@/components/navbar/Userbar";


export const metadata = {
  title: "Dashboard",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <div className="grid grid-cols-12">
      <aside className="col-span-3 sm:col-span-2">
        <Navbar />
      </aside>
      <div className="col-span-9 sm:col-span-10">
        <Userbar />
        {children}
      </div>
    </div>
  );
}

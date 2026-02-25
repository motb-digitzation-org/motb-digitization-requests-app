import Navigation from "@/components/mwidgets/navigation";
import { Card } from "@/components/ui/card";

export default function ThreeColLayout({
  children,
  navRole,
}: Readonly<{
  children: React.ReactNode;
  navRole: "admin" | "requester";
}>) {
  return (
    <div id="three-col-layout" className="bg-gray-400">
      <div
        id="mobile-nav-wrapper"
        className="fixed bottom-0 left-0 w-screen lg:hidden"
      >
        <Card
          id="mobile-navigation-card"
          className="rounded-none border-0 p-4 lg:w-screen lg:rounded-xl"
        >
          <Navigation role={navRole} />
        </Card>
      </div>

      <div className="grid h-screen grid-cols-4 items-stretch gap-4 p-4 md:grid-cols-6 lg:grid-cols-12">
        <Card
          id="desktop-navigation-card"
          className="hidden lg:col-span-2 lg:inline-block"
        >
          <Navigation role={navRole} />
        </Card>
        {children}
      </div>
    </div>
  );
}

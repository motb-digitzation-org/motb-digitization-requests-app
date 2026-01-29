import Navigation from "@/components/mwidgets/navigation";
import { Card } from "@/components/ui/card";

export default function ThreeColLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div id="three-col-layout" className="bg-gray-400">
      <div
        id="mobile-nav-wrapper"
        className="fixed bottom-0 left-0 w-screen lg:hidden"
      >
        <Card
          id="mobile-navigation-card"
          className="rounded-none border-0 bg-gray-900/45 p-4 lg:w-screen lg:rounded-xl lg:bg-white"
        >
          <Navigation />
        </Card>
      </div>

      <div className="grid h-screen grid-cols-4 items-stretch gap-4 p-4 md:grid-cols-6 lg:grid-cols-12">
        <Card
          id="desktop-navigation-card"
          className="hidden lg:col-span-2 lg:inline-block"
        >
          <Navigation />
        </Card>
        {children}
      </div>
    </div>
  );
}

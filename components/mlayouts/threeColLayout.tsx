import { Card } from "@/components/ui/card";
import Navigation from "@/components/mwidgets/navigation";

export default function ThreeColLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      id="three-col-layout"
      className="grid min-h-screen grid-cols-3 grid-rows-[max-content] gap-2 bg-gray-300 p-4 md:grid-cols-6 md:content-center lg:grid-cols-12"
    >
      <div
        id="nav-wrapper"
        className="fixed bottom-0 left-0 w-screen lg:static lg:col-span-2 lg:flex lg:w-auto lg:flex-row lg:p-0"
      >
        <Card
          id="navigation-card"
          className="rounded-none border-0 bg-gray-900/45 p-2 lg:w-screen lg:rounded-xl lg:bg-white lg:py-6"
        >
          <Navigation />
        </Card>
      </div>
      {children}
    </div>
  );
}

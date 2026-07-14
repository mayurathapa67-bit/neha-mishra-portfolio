import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getContent } from "@/lib/content-store";

export default async function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const content = await getContent();
  return (
    <>
      <Navbar nav={content.nav} />
      <main id="main" className="flex-1 pt-20">
        {children}
      </main>
      <Footer nav={content.nav} contact={content.contact} />
    </>
  );
}

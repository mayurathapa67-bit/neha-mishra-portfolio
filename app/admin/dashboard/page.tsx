import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { site } from "@/lib/content";
import { AdminDashboard } from "@/components/AdminDashboard";
import type { EnvStatus } from "@/lib/types";

export const metadata = {
  title: "Admin Dashboard",
  robots: { index: false, follow: false },
};

export default async function AdminDashboardPage() {
  if (!(await getSession())) redirect("/admin");

  const envStatus: EnvStatus = {
    admin: Boolean(process.env.ADMIN_PASSWORD),
    github:
      Boolean(process.env.GITHUB_TOKEN) && Boolean(process.env.GITHUB_REPO),
    cloudinary:
      Boolean(process.env.CLOUDINARY_CLOUD_NAME) &&
      Boolean(process.env.CLOUDINARY_API_KEY) &&
      Boolean(process.env.CLOUDINARY_API_SECRET),
  };

  return <AdminDashboard initialContent={site} envStatus={envStatus} />;
}

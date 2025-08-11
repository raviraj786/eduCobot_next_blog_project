import AdminDashboard from "@/components/AdminDashboard";
import Addbutton from "@/components/Addbutton";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function AdminPage() {
  const cookieStore = await cookies();
  const authToken = cookieStore.get("auth_token")?.value;

  if (!authToken) {
    redirect("/login");
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <Addbutton />
      <AdminDashboard />
    </div>
  );
}

import { UserRole } from "@/db/schema";
import { requireAuth } from "@/lib/auth-server";
import { DashboardSidebar } from "@/shared/components/dashboard/side-bar";
import { SidebarProvider, SidebarTrigger } from "@/shared/components/ui/sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const { session } = await requireAuth()

  if (!session || session.user.role === 'customer')
    redirect('not-authorized')


  return (
    <SidebarProvider>
      <DashboardSidebar role={session.user.role as UserRole} />
      <main className="min-h-screen w-full relative">
        <SidebarTrigger className="absolute top-4 left-4" />
        {children}
      </main>
    </SidebarProvider>
  )
}

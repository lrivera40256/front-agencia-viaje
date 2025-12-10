import { SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { AppNavbar } from './AppNavbar';
import { Outlet } from 'react-router-dom';
import { useAuthContext } from '@/features/auth/contexts/AuthProvider';
import ChatBot from '@/features/chatbot/components/ChatBot';
import AppointmentChat from '@/features/appointments/components/AppointmentChat';

export function DashboardLayout() {
	const {logout,user} = useAuthContext();
	console.log(user);
	
	return (
		<SidebarProvider defaultOpen={true}>
			<AppSidebar />
			<SidebarInset>
				<AppNavbar />
				<main className="flex-1 p-4">
					<Outlet />
				</main>
				<ChatBot />
				<AppointmentChat />
			</SidebarInset>
		</SidebarProvider>
	);
}

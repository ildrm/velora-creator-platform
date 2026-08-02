import { AppShell } from "@/components/app-shell";
import { ProfilePanel } from "@/components/profile-panel";

export const metadata = { title: "Profile" };

export default function ProfilePage() {
  return <AppShell><ProfilePanel/></AppShell>;
}

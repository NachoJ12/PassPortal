import { ReactNode } from "react"
import Sidebar from "@/components/layouts/sidebar"
import Navbar from "@/components/layouts/navbar"
import Footer from "@/components/layouts/footer"


export default function LogInLayout({ children }: { children: ReactNode }) {
    return (
        <div className="login-layout" style={{ backgroundColor: "#070607",height:"100vh" }}>
            <main  >
                {children}
            </main>
        </div>
    )
}
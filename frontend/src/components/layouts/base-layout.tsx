import { ReactNode } from "react"
import Sidebar from "@/components/layouts/sidebar"
import Navbar from "@/components/layouts/navbar"
import Footer from "@/components/layouts/footer"


export default function BaseLayout({ children }: { children: ReactNode }) {
    return (
        <div className="base-layout">
            <div className="layout-sidebar">
                <Sidebar />
            </div>
            <div className="main-content">
                <div className="layout-navbar">
                    <Navbar />
                </div>
                <main >
                    {children}
                </main>
                <div className="layout-footer">
                    <Footer />
                </div>
            </div>
        </div>
    )
}
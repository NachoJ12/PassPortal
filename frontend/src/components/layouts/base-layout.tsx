import { ReactNode } from "react"
import Sidebar from "@/components/layouts/sidebar"
import Navbar from "@/components/layouts/navbar"
import Footer from "@/components/layouts/footer"


export default function BaseLayout({ children }: { children: ReactNode }) {
    return (
        <div>
            <div className="general-l">
                <div className="layout-sidebar"><Sidebar /></div>
                <div className="layout-navbar-footer">
                    <div className="layout-navbar"><Navbar /></div>
                        {children}
                    <div className="layout-footer"> <Footer /></div>
                </div>
            </div>
        </div>
    )
}
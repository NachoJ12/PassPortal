import { ReactNode } from "react"
import Sidebar from "./sidebar"
import Navbar from "@/components/layouts/navbar"


export default function BaseLayout({ children }: { children: ReactNode }) {
    return (
        <div className="general-l">
            <div className="layout-sidebar"><Sidebar /></div>
            <div className="layout-navbar"><Navbar />{children}</div>
        </div>)
}
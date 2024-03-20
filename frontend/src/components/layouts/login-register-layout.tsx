import { ReactNode } from "react"



export default function LogInLayout({ children }: { children: ReactNode }) {
    return (
        <div className="login-layout" >
            <main>
                {children}
            </main>
        </div>
    )
}
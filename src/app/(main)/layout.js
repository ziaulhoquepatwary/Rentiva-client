import Navbar from "@/share/Navbar"

function MainLayout({ children }) {
    return (
        <div className="flex flex-col min-h-full">
            <Navbar />
            <main className="grow">
                {children}
            </main>
        </div>
    )
}

export default MainLayout
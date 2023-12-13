import { Aside } from "../components/Aside"

export const MainLayout = ({ children }) => {

    return (
        <div className="h-screen bg-slate-200 grid grid-cols-5 gap-4">
            <Aside />
            <div className="col-span-4 bg-white rounded-2xl mt-4 mr-4 mb-4 p-4 shadow">
                {children}
            </div>
        </div>
    )
}
import { Aside } from "../components/Aside"

export const MainLayout = ({ children }) => {

    return (
        <div className="bg-stone-100 grid grid-cols-5 gap-4 h-screen">
            <Aside />
            <div className="col-span-4 bg-white rounded-2xl mt-4 mr-4 mb-4 p-4 shadow">
                {children}
            </div>
        </div>
    )
}
import { NavLink } from "react-router-dom"

export const Aside = () => {

    return (
        <div className="bg-white rounded-2xl ml-4 mb-4 mt-4 p-4 shadow">
            <div className="grid grid-rows-4 gap-2">
                <NavLink to="/" className={({ isActive }) => isActive ? "border border-stone-200 rounded-lg px-4 py-1 focus:ring ring-blue-400" : "border border-stone-200 rounded-lg px-4 py-1"}>
                    <p>Нийтлэл</p>
                </NavLink>
                <NavLink to="/category" className={({ isActive }) => isActive ? "border border-stone-200 rounded-lg px-4 py-1 focus:ring ring-blue-400" : "border border-stone-200 rounded-lg px-4 py-1"}>
                    <p>Цэс</p>
                </NavLink>
            </div>
        </div>
    )
}
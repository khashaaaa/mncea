import { Link } from "react-router-dom"

export const Aside = () => {

    return (
        <div className="bg-white rounded-2xl ml-4 mb-4 mt-4 p-4 shadow">
            <div className="grid grid-rows-4 gap-2">
                <Link to="/" className="border border-stone-200 rounded-lg px-4 py-1 focus:ring ring-sky-400">
                    <p>Нийтлэл</p>
                </Link>
                <Link to="/category" className="border border-stone-200 rounded-lg px-4 py-1 focus:ring ring-sky-400">
                    <p>Цэс</p>
                </Link>
            </div>
        </div>
    )
}
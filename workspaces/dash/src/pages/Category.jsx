import { useState } from "react"
import { Menu } from "../components/Menu"
import { MainLayout } from "../layouts/MainLayout"

export const Category = () => {

    const [active, setActive] = useState(null)

    return (
        <MainLayout>
            <p className="text-lg">Цэс удирдах хуудас</p>
            <div className="mt-4 w-1/2 mx-auto grid grid-cols-3 text-sm">
                <button onClick={() => setActive(1)} className={active === 1 ? "bg-sky-600 text-white border border-stone-200 py-1 rounded-l-md" : "border border-stone-200 py-1 rounded-l-md"} type="button">Ерөнхий цэс</button>
                <button onClick={() => setActive(2)} className={active === 2 ? "bg-sky-600 text-white border-y border-stone-200 py-1" : "border-y border-stone-200 py-1"} type="button">Үндсэн цэс</button>
                <button onClick={() => setActive(3)} className={active === 3 ? "bg-sky-600 text-white border border-stone-200 py-1 rounded-r-md" : "border border-stone-200 py-1 rounded-r-md"} type="button">Дэд цэс</button>
            </div>
            <Menu active={active} />
        </MainLayout>
    )
}
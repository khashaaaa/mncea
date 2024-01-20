import { IconChevronDown, IconChevronUp } from "@tabler/icons-react"
import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { base_url } from "../../environment/url"
import { LanguageContext } from "../context/LanguageProvider"

export const SpecialMenu = () => {

    const { language } = useContext(LanguageContext)

    const [mega, setMega] = useState(0)

    const [selected, setSelected] = useState(null)

    const [baseCategories, setBaseCategories] = useState([])
    const [midCategories, setMidCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])

    useEffect(() => {
        GetMenuData()
    }, [language])

    const GetMenuData = async () => {
        try {
            const [baseRaw, midRaw, subRaw] = await Promise.all([
                fetch(`${base_url}/basecategory?language=${language}`),
                fetch(`${base_url}/midcategory?language=${language}`),
                fetch(`${base_url}/subcategory?language=${language}`),
            ])

            const [baseResp, midResp, subResp] = await Promise.all([
                baseRaw.json(),
                midRaw.json(),
                subRaw.json(),
            ])

            setBaseCategories(baseResp)
            setMidCategories(midResp)
            setSubCategories(subResp)
        } catch (error) {
            console.error("Error fetching menu data:", error)
        }
    }

    const renderMidCategories = (parentMark) => {
        return midCategories
            .filter((cat) => cat.parent === parentMark)
            .map((cat, num) => (
                <div key={cat.mark} className="py-2 border-b border-gray-200">
                    <Link to={`/post/mid/${cat.mark}`} className="font-bold text-gray-700 hover:text-black">{cat?.name}</Link>
                    <div className="flex flex-col">
                        {renderSubCategories(cat.mark)}
                    </div>
                </div>
            ))
    }

    const renderSubCategories = (midCategoryMark) => {
        return subCategories
            .filter((cat) => cat.parent === midCategoryMark)
            .map((cat, num) => (
                <p key={cat.mark} className="ml-4 py-1 text-gray-700 hover:text-black"><Link to={`/post/sub/${cat.mark}`} key={cat.mark}>{cat?.name}</Link></p>
            ))
    }

    return (
        <div>
            <div className="grid grid-cols-3 gap-2">
                {baseCategories.map((cat, num) => {
                    let active = num + 1
                    return (
                        <div
                            key={cat.mark}
                            onMouseEnter={() => { setMega(active), setSelected(cat.mark) }}
                            onMouseLeave={() => setMega(0)}
                            className={`${mega === active ? "bg-sky-700 text-white rounded-t-md" : "bg-white rounded-md"} border-2 border-sky-700 flex items-center justify-center py-2 cursor-pointer`}
                        >
                            <p className="font-bold uppercase text-xs">{cat?.name}</p>
                            {mega === active ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
                        </div>
                    )
                })}
            </div>

            <div onMouseLeave={() => setMega(0)} className={`${mega === 0 && 'hidden'} absolute grid grid-cols-3 gap-2 w-full z-10`}>
                <div onMouseEnter={() => setMega(1)} onMouseLeave={() => setMega(0)} className={mega === 1 ? "bg-white duration-300 p-2 rounded-b-md" : "invisible mt-4 p-2 text-gray-800"}>
                    {renderMidCategories(selected)}
                </div>

                <div onMouseEnter={() => setMega(2)} onMouseLeave={() => setMega(0)} className={mega === 2 ? "bg-white duration-300 p-2 rounded-b-md" : "invisible mt-4 p-2 text-gray-800"}>
                    {renderMidCategories(selected)}
                </div>

                <div onMouseEnter={() => setMega(3)} onMouseLeave={() => setMega(0)} className={mega === 3 ? "bg-white duration-300 p-2 rounded-b-md" : "invisible mt-4 p-2 text-gray-800"}>
                    {renderMidCategories(selected)}
                </div>
            </div>
        </div>
    )
}
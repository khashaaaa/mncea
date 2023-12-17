import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import { useEffect, useState } from 'react'

export const ShowCase = () => {
    const [mega, setMega] = useState(0)
    const [baseCategories, setBaseCategories] = useState([])
    const [midCategories, setMidCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])

    useEffect(() => {
        GetMenuData()
    }, [])

    const GetMenuData = async () => {
        try {
            const [baseRaw, midRaw, subRaw] = await Promise.all([
                fetch(`/server/basecategory`),
                fetch(`/server/midcategory`),
                fetch(`/server/subcategory`),
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
                <div key={cat.mark}>
                    <p className="font-bold">{cat?.name}</p>
                    {renderSubCategories(cat.mark)}
                </div>
            ))
    }

    const renderSubCategories = (midCategoryMark) => {
        return subCategories
            .filter((cat) => cat.parent === midCategoryMark)
            .map((cat, num) => (
                <p key={cat.mark} className="ml-4">{cat?.name}</p>
            ))
    }

    return (
        <div className="bg-stone-100 py-4">
            <div className="relative" style={{ margin: '0 15%' }}>
                <div className="grid grid-cols-3 gap-8">
                    {baseCategories.map((cat, num) => {
                        let active = num + 1
                        return (
                            <div
                                key={cat.mark}
                                onMouseEnter={() => setMega(active)}
                                onMouseLeave={() => setMega(0)}
                                className={`${mega === active ? "rounded-t bg-blue-800" : "rounded-md bg-main"} text-white flex items-center justify-center py-2 cursor-pointer`}
                            >
                                <p className="font-bold uppercase">{cat?.name}</p>
                                {mega === active ? <IconChevronUp size={18} /> : <IconChevronDown size={18} />}
                            </div>
                        )
                    })}
                </div>

                <div onMouseLeave={() => setMega(0)} className={`${mega === 0 && 'hidden'} absolute grid grid-cols-3 gap-8 w-full bg-main rounded-md z-10 shadow-xl`}>
                    <div onMouseEnter={() => setMega(1)} className={mega === 1 ? "bg-blue-800 text-white rounded-bl p-2" : "p-2 text-gray-200"}>
                        {renderMidCategories(5)}
                    </div>

                    <div onMouseEnter={() => setMega(2)} className={mega === 2 ? "bg-blue-800 text-white p-2" : "p-2 text-gray-200"}>
                        {renderMidCategories(6)}
                    </div>

                    <div onMouseEnter={() => setMega(3)} className={mega === 3 ? "bg-blue-800 text-white rounded-br p-2" : "p-2 text-gray-200"}>
                        {renderMidCategories(7)}
                    </div>
                </div>
            </div>
        </div>
    )
}

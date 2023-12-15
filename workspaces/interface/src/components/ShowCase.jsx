import { IconChevronDown, IconChevronUp } from '@tabler/icons-react'
import { useState } from 'react'

export const ShowCase = () => {

    const [mega, setMega] = useState(0)

    return (
        <div className="bg-stone-100 py-4">
            <div className="relative" style={{ margin: '0 15%' }}>
                <div className="grid grid-cols-3 gap-8">
                    <div onMouseEnter={() => setMega(1)} onMouseLeave={() => setMega(0)} className={`${mega === 1 ? "rounded-t bg-blue-800" : "rounded-md bg-main"} text-white flex items-center justify-center py-2 cursor-pointer`}>
                        <p className="font-bold uppercase">Чанарын баталгаажуулалт</p>
                        {
                            mega === 1 ?
                                <IconChevronUp size={18} />
                                :
                                <IconChevronDown size={18} />
                        }
                    </div>
                    <div onMouseEnter={() => setMega(2)} onMouseLeave={() => setMega(0)} className={`${mega === 2 ? "rounded-t bg-blue-800" : "rounded-md bg-main"} text-white flex items-center justify-center py-2 cursor-pointer`}>
                        <p className="font-bold uppercase">Мэргэшлийн үндэсний шаталсан бүтэц</p>
                        {
                            mega === 2 ?
                                <IconChevronUp size={18} />
                                :
                                <IconChevronDown size={18} />
                        }
                    </div>
                    <div onMouseEnter={() => setMega(3)} onMouseLeave={() => setMega(0)} className={`${mega === 3 ? "rounded-t bg-blue-800" : "rounded-md bg-main"} text-white flex items-center justify-center py-2 cursor-pointer`}>
                        <p className="font-bold uppercase">Боловсролын зэрэг</p>
                        {
                            mega === 3 ?
                                <IconChevronUp size={18} />
                                :
                                <IconChevronDown size={18} />
                        }
                    </div>
                </div>

                <div onMouseLeave={() => setMega(0)} className={`${mega === 0 && 'hidden'} absolute grid grid-cols-3 gap-8 w-full bg-main rounded-md z-10 shadow-xl`}>
                    <div onMouseEnter={() => setMega(1)} className={mega === 1 ? "bg-blue-800 text-white rounded-bl p-2" : "p-2 text-gray-200"}>
                        <div>
                            <p className="font-bold">Чанарын баталгаажуулалт</p>
                            <p className="ml-4">Зөвлөмж</p>
                            <p className="ml-4">ДЧБ-ын тогтолцоо</p>
                            <p className="ml-4">БСБ-ын ДЧБ-ын мэдээлэл</p>
                        </div>
                        <div>
                            <p className="font-bold">Магадлан итгэмжлэл</p>
                            <p className="ml-4">Дүрэм журам</p>
                            <p className="ml-4">Загвар, маягтууд</p>
                            <p className="ml-4">Зөвлөмж</p>
                            <p className="ml-4">МИ системд нэвтрэх</p>
                        </div>
                        <div>
                            <p className="font-bold">Тусгай зөвшөөрөл</p>
                            <p className="ml-4">Дотоодын байгууллага эрх хүсэх</p>
                            <p className="ml-4">Гадаадын байгууллага эрх хүсэх</p>
                        </div>
                        <div>
                            <p className="font-bold">Статистик</p>
                            <p className="ml-4">МИ сургалтын байгууллагын тоон мэдээлэл</p>
                            <p className="ml-4">МИ сургалтын хөтөлбөрийн тоон мэдээлэл</p>
                            <p className="ml-4">МИ сургалтын хөтөлбөрийн тоон мэдээлэл</p>
                        </div>
                    </div>

                    <div onMouseEnter={() => setMega(2)} className={mega === 2 ? "bg-blue-800 text-white p-2" : "p-2 text-gray-200"}>
                        <div>
                            <p className="font-bold">МҮШБ гэж юу вэ?</p>
                            <p className="ml-4">Зураглал</p>
                            <p className="ml-4">Дүрэм, журам</p>
                            <p className="ml-4">МҮШБ мэдээлэл</p>
                            <p className="ml-4">Загвар маягтууд</p>
                            <p className="ml-4">Зөвлөмж</p>
                        </div>
                        <div>
                            <p className="font-bold">Олон улсын МҮШБ</p>
                            <p className="ml-4">EQF</p>
                            <p className="ml-4">Улс орнуудын МҮШБ судалгаа</p>
                        </div>
                    </div>

                    <div onMouseEnter={() => setMega(3)} className={mega === 3 ? "bg-blue-800 text-white rounded-br p-2" : "p-2 text-gray-200"}>
                        <div>
                            <p className="font-bold">Боловсролын тогтолцоо</p>
                            <p className="ml-4">Монголын боловсролын тогтолцоо</p>
                            <p className="ml-4">Дээд боловсрол эзэмших</p>
                            <p className="ml-4">Зөвлөмж</p>
                            <p className="ml-4">Дүрэм, журам</p>
                            <p className="ml-4">Загвар маягтууд</p>
                            <p className="ml-4">Дүйцүүлэлт</p>
                            <p className="ml-4">Баталгаажуулалт</p>
                        </div>
                        <div>
                            <p className="font-bold">Олон улсын боловсролын тогтолцоо</p>
                            <p className="ml-4">EU</p>
                            <p className="ml-4">ASIA</p>
                            <p className="ml-4">AFRICA</p>
                            <p className="ml-4">AU</p>
                            <p className="ml-4">AMERICA</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
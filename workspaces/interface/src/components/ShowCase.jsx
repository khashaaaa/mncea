import { IconChevronDown } from '@tabler/icons-react'
import { useState } from 'react'

export const ShowCase = () => {

    const [mega, setMega] = useState(0)

    return (
        <div className="bg-stone-100 py-4">
            <div className="relative" style={{ margin: '0 15%' }}>
                <div className="grid grid-cols-3 gap-8">
                    <div onMouseEnter={() => setMega(1)} className="flex items-center justify-center rounded-md py-2 cursor-pointer bg-blue-400">
                        <p className="font-bold">Чанарын баталгаажуулалт</p>
                        <IconChevronDown size={18} />
                    </div>
                    <div onMouseEnter={() => setMega(2)} className="flex items-center justify-center rounded-md py-2 cursor-pointer bg-green-400">
                        <p className="font-bold">Мэргэшлийн үндэсний шаталсан бүтэц</p>
                        <IconChevronDown size={18} />
                    </div>
                    <div onMouseEnter={() => setMega(3)} className="flex items-center justify-center rounded-md py-2 cursor-pointer bg-amber-400">
                        <p className="font-bold">Эрдмийн зэрэг хүлээн зөвшөөрөх</p>
                        <IconChevronDown size={18} />
                    </div>
                </div>

                <div onMouseLeave={() => setMega(0)} className={`${mega === 0 && 'hidden'} absolute grid grid-cols-3 gap-8 w-full bg-white rounded-md mt-2 z-10 shadow-xl`}>
                    <div onMouseEnter={() => setMega(1)} className={mega === 1 ? "bg-gray-200 rounded-l p-2" : "p-2"}>
                        <div>
                            <p className="font-bold">-Чанарын баталгаажуулалт</p>
                            <p className="ml-4">--Зөвлөмж</p>
                            <p className="ml-4">--ДЧБ-ын тогтолцоо</p>
                            <p className="ml-4">--БСБ-ын ДЧБ-ын мэдээлэл</p>
                        </div>
                        <div>
                            <p className="font-bold">-Магадлан итгэмжлэл</p>
                            <p className="ml-4">--Дүрэм журам</p>
                            <p className="ml-4">--Загвар, маягтууд</p>
                            <p className="ml-4">--Зөвлөмж</p>
                            <p className="ml-4">--МИ системд нэвтрэх</p>
                        </div>
                        <div>
                            <p className="font-bold">-Тусгай зөвшөөрөл</p>
                            <p className="ml-4">--Дотоодын байгууллага эрх хүсэх</p>
                            <p className="ml-4">--Гадаадын байгууллага эрх хүсэх</p>
                        </div>
                        <div>
                            <p className="font-bold">-Статистик</p>
                            <p className="ml-4">--МИ сургалтын байгууллагын тоон мэдээлэл</p>
                            <p className="ml-4">--МИ сургалтын хөтөлбөрийн тоон мэдээлэл</p>
                            <p className="ml-4">--МИ сургалтын хөтөлбөрийн тоон мэдээлэл</p>
                        </div>
                    </div>

                    <div onMouseEnter={() => setMega(2)} className={mega === 2 ? "bg-gray-200 p-2" : "p-2"}>
                        <div>
                            <p className="font-bold">-МҮШБ гэж юу вэ?</p>
                            <p className="ml-4">--Зураглал</p>
                            <p className="ml-4">--Дүрэм, журам</p>
                            <p className="ml-4">--МҮШБ мэдээлэл</p>
                            <p className="ml-4">--Загвар маягтууд</p>
                            <p className="ml-4">--Зөвлөмж</p>
                        </div>
                        <div>
                            <p className="font-bold">-Олон улсын МҮШБ</p>
                            <p className="ml-4">--EQF</p>
                            <p className="ml-4">--Улс орнуудын МҮШБ судалгаа</p>
                        </div>
                    </div>

                    <div onMouseEnter={() => setMega(3)} className={mega === 3 ? "bg-gray-200 rounded-r p-2" : "p-2"}>
                        <div>
                            <p className="font-bold">-Эрдмийн зэрэг хүлээн зөвшөөрөх</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
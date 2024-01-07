import { IconMail, IconMapPin, IconPhone } from '@tabler/icons-react'
import { useState } from 'react'

export const Foot = () => {

    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [type, setType] = useState('')
    const [statement, setStatement] = useState('')

    const Despatch = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                user,
                email,
                mobile,
                type,
                statement
            })
        }

        const raw = fetch('/server/compliant', options)

        const resp = raw.json()

        console.log(resp)
    }

    const year = new Date().getFullYear()

    return (
        <div className="bg-sec text-sm">
            <div style={{ margin: '0 15%' }} className="grid grid-cols-2 gap-8 py-8">
                <div>
                    <p className="text-xl text-white">Санал хүсэлт илгээх</p>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                            <div className="flex flex-col">
                                <label className="text-white mb-1">Нэр</label>
                                <input onChange={(val) => setUser(val.target.value)} className="outline-none p-2 rounded-md" />
                            </div>
                            <div className="flex flex-col mt-2">
                                <label className="text-white mb-1">Утасны дугаар</label>
                                <input onChange={(val) => setMobile(val.target.value)} className="outline-none p-2 rounded-md" />
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col">
                                <label className="text-white mb-1">Имэйл хаяг</label>
                                <input onChange={(val) => setEmail(val.target.value)} className="outline-none p-2 rounded-md" />
                            </div>
                            <div className="flex flex-col mt-2">
                                <label className="text-white mb-1">Төрөл</label>
                                <select onChange={(val) => setType(val.target.value)} className="outline-none p-2 rounded-md bg-white">
                                    <option>Санал</option>
                                    <option>Өргөдөл</option>
                                    <option>Гомдол</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col mt-2">
                        <label className="text-white mb-1">Дэлгэрэнгүй мэдээлэл</label>
                        <textarea onChange={(val) => setStatement(val.target.value)} rows="3" className="outline-none p-2 rounded-md" />
                    </div>

                    <div className='mt-4 flex justify-end'>
                        <button onClick={Despatch} type='button' className='bg-white rounded-md p-2 w-24 font-bold'>Илгээх</button>
                    </div>
                </div>

                <div>
                    <p className="text-xl text-white">Холбоо барих</p>
                    <div className="mt-4 grid grid-rows-3 gap-4">
                        <div className='flex items-center'>
                            <IconMapPin color='skyblue' />
                            <span className='ml-4 text-white text-xs'>МОНГОЛ УЛС, УЛААНБААТАР ХОТ<br />СҮХБААТАР ДҮҮРЭГ, ЕРӨНХИЙ САЙД А.АМАРЫН ГУДАМЖ<br />САН БИЗНЕС ТӨВ, 6 ДАВХАРТ</span>
                        </div>
                        <div className='flex items-center'>
                            <IconPhone color='skyblue' />
                            <span className='ml-4 text-white'>+(976) 70109391</span>
                        </div>
                        <div className='flex items-center'>
                            <IconMail color='skyblue' />
                            <span className='ml-4 text-white'>LETTER@MNCEA.EDU.MN</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-slate-900 h-12 flex justify-center items-center">
                <p className="text-white font-bold">&#169;{year} Боловсролын магадлан итгэмжлэх үндэсний зөвлөл.</p>
            </div>
        </div>
    )
}
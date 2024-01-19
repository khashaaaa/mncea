import { IconMail, IconMapPin, IconPhone } from '@tabler/icons-react'
import { useContext, useState } from 'react'
import { NotifContext } from '../context/NotifProvider'
import { Spinner } from './Spinner'
import { base_url } from '../../environment/url'

export const Foot = () => {

    const { isOpen, Open, Cloze, setMsg } = useContext(NotifContext)

    const [user, setUser] = useState('')
    const [email, setEmail] = useState('')
    const [mobile, setMobile] = useState('')
    const [type, setType] = useState('')
    const [statement, setStatement] = useState('')

    const Despatch = async () => {
        setUser('')
        setEmail('')
        setMobile('')
        setType('')
        setStatement('')

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

        const raw = await fetch(`${base_url}/compliant`, options)

        const resp = await raw.json()

        if (resp.ok) {
            Open()
            setMsg(resp.message)
        }
        else {
            Open()
            setMsg(resp.message)
        }

        setTimeout(() => Cloze(), 2000)
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
                                <input value={user} onChange={(val) => setUser(val.target.value)} className="outline-none p-2 rounded-md" />
                            </div>
                            <div className="flex flex-col mt-2">
                                <label className="text-white mb-1">Утасны дугаар</label>
                                <input value={mobile} onChange={(val) => setMobile(val.target.value)} className="outline-none p-2 rounded-md" />
                            </div>
                        </div>
                        <div>
                            <div className="flex flex-col">
                                <label className="text-white mb-1">Имэйл хаяг</label>
                                <input value={email} onChange={(val) => setEmail(val.target.value)} className="outline-none p-2 rounded-md" />
                            </div>
                            <div className="flex flex-col mt-2">
                                <label className="text-white mb-1">Төрөл</label>
                                <select value={type} onChange={(val) => setType(val.target.value)} className="outline-none p-2 rounded-md bg-white">
                                    <option>--- сонгох ---</option>
                                    <option value="suggestion">Санал</option>
                                    <option value="application">Өргөдөл</option>
                                    <option value="compliant">Гомдол</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col mt-2">
                        <label className="text-white mb-1">Дэлгэрэнгүй мэдээлэл</label>
                        <textarea value={statement} onChange={(val) => setStatement(val.target.value)} rows="3" className="outline-none p-2 rounded-md" />
                    </div>

                    <div className='mt-4 flex justify-end'>
                        <button onClick={Despatch} type='button' className='bg-white rounded-md p-2 w-24 font-bold flex justify-center'>{isOpen ? <Spinner /> : 'Илгээх'}</button>
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
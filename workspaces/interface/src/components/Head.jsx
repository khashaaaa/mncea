import { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import { LanguageContext } from '../context/LanguageProvider'
import { base_url } from '../../environment/url'
import { IconBrandFacebook, IconBrandX, IconBrandYoutube, IconSearch } from '@tabler/icons-react'
import logo from '/logo.jpg'
import mongolia from '/mongolia.png'
import usa from '/united-states.png'

export const Head = ({ margin }) => {

    const { language, switchLanguage } = useContext(LanguageContext)

    const { t } = useTranslation()

    const [search, setSearch] = useState('')

    const [menu, setMenu] = useState([])

    const [drop, setDrop] = useState(null)

    useEffect(() => {
        FetchMenus()
    }, [])

    const FetchMenus = async () => {
        const raw = await fetch(`${base_url}/headcategory`)
        const resp = await raw.json()
        setMenu(resp.data)
    }

    const ProceedSearch = async () => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                keyword: search
            })
        }
        const raw = await fetch(`${base_url}/search`, options)
        const resp = await raw.json()
        console.log(resp)
    }

    return (
        <div>
            <div className="bg-gray-100 w-full h-12 flex items-center justify-end">
                <div style={{ margin: margin }} className="flex items-center">
                    <div className='flex items-center mr-8 cursor-pointer'>
                        <input onChange={(e) => setSearch(e.target.value)} className='outline-none rounded-l-md p-2 text-xs sm:w-36' placeholder='Хайх' />
                        <button className='bg-white rounded-r-md p-1 hover:bg-sky-200'>
                            <IconSearch onClick={ProceedSearch} color='navy' />
                        </button>
                    </div>
                    <div className='grid grid-cols-3 gap-2 mr-8'>
                        <IconBrandFacebook size={18} color='white' className='rounded-full h-6 w-6 bg-main p-1 cursor-pointer hover:bg-sky-800' />
                        <IconBrandYoutube size={18} color='white' className='rounded-full h-6 w-6 bg-main p-1 cursor-pointer hover:bg-sky-800' />
                        <IconBrandX size={18} color='white' className='rounded-full h-6 w-6 bg-main p-1 cursor-pointer hover:bg-sky-800' />
                    </div>
                    <div>
                        {
                            language === 'mn' && <img onClick={() => switchLanguage('en')} src={usa} className="w-6 cursor-pointer" />
                            ||
                            language === 'en' && <img onClick={() => switchLanguage('mn')} src={mongolia} className="w-6 cursor-pointer" />
                        }
                    </div>
                </div>
            </div>
            <div className='mx-auto h-20 flex items-center' style={{ margin: margin }}>
                <div className='w-full flex items-end justify-between'>
                    <Link to="/" className="flex items-center sm:hidden md:hidden">
                        <img className='w-60' src={logo} alt="logo" />
                    </Link>
                    <div className='flex sm:w-full text-sm'>
                        {menu?.length > 0 &&
                            menu.map((item) => (
                                <div key={item.mark} className="relative">
                                    <Link
                                        onMouseEnter={() => setDrop(item.mark)}
                                        onMouseLeave={() => setDrop(null)}
                                        to={`/page/${language === 'mn' ? item.mn : item.en}`}
                                        className='mx-4 sm:mx-2 font-bold hover:text-main duration-100'
                                    >
                                        {language === 'mn' ? item.mn : item.en}
                                    </Link>
                                    <div onMouseEnter={() => setDrop(item.mark)} onMouseLeave={() => setDrop(null)} className={`transition-all duration-300 ${drop === item.mark ? 'max-h-60 pt-2' : 'h-0 pt-0'} absolute top-6 bg-white w-40 z-10 rounded-b-md shadow-md overflow-hidden`}>
                                        {
                                            item.children?.length > 0 &&
                                            item.children?.map((child, num) => (
                                                <Link key={num} to={`/page/${child.keyword}`}>
                                                    <div className="w-full font-bold text-xs p-2 hover:bg-gray-200">
                                                        {child.mn}
                                                    </div>
                                                </Link>
                                            ))
                                        }
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
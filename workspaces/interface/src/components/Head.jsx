import { useContext, useState } from 'react'
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
                <div className='w-full flex items-center justify-between'>
                    <Link to="/" className="flex items-center sm:hidden md:hidden">
                        <img className='w-60' src={logo} alt="logo" />
                    </Link>
                    <div className='flex sm:w-full text-sm'>
                        <div>
                            <Link to="/page/about" className='ml-8 sm:mx-2 rounded-full px-4 font-bold hover:text-main hover:bg-gray-100 duration-100'>{t("head_menu.about")}</Link>
                        </div>
                        <div>
                            <Link to="/page/news" className='ml-8 sm:mx-2 rounded-full px-4 font-bold hover:text-main hover:bg-gray-100 duration-100'>{t("head_menu.news")}</Link>
                        </div>
                        <div>
                            <Link to="/page/transparency" className='ml-8 sm:mx-2 rounded-full px-4 font-bold hover:text-main hover:bg-gray-100 duration-100'>{t("head_menu.transparency")}</Link>
                        </div>
                        <div>
                            <Link to="/page/fund" className='ml-8 sm:mx-2 rounded-full px-4 font-bold hover:text-main hover:bg-gray-100 duration-100'>{t("head_menu.fund")}</Link>
                        </div>
                        <div>
                            <Link to="/page/contact" className='ml-8 sm:mx-2 rounded-full px-4 font-bold hover:text-main hover:bg-gray-100 duration-100'>{t("head_menu.contact")}</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
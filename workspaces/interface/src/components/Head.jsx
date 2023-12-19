import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IconBrandFacebook, IconBrandX, IconBrandYoutube, IconSearch } from '@tabler/icons-react'
import { useTranslation } from "react-i18next"
import logo from '/logo.jpg'
import mongolia from '/mongolia.png'
import usa from '/united-states.png'

export const Head = () => {

    const [language, setLanguage] = useState('mn')

    const { t, i18n } = useTranslation()

    const switchLang = (lang) => {
        setLanguage(lang)
        i18n.changeLanguage(lang)
    }

    return (
        <div>
            <div className="bg-main w-full h-10 flex items-center">
                <div className='mx-auto flex justify-between items-center' style={{ width: '70%' }}>
                    <div className='grid grid-cols-3 gap-2'>
                        <IconBrandFacebook color='white' />
                        <IconBrandYoutube color='white' />
                        <IconBrandX color='white' />
                    </div>

                    <div className="flex items-center">
                        <div className='flex items-center mr-8'>
                            <input className='w-60 rounded-l outline-none px-2 py-1 text-sm' />
                            <button type='button' className='bg-white py-1 px-2 rounded-r'><IconSearch size={20} /></button>
                        </div>
                        <div>
                            {
                                language === 'mn' && <img onClick={() => switchLang('en')} src={mongolia} className="w-6 cursor-pointer" />
                                ||
                                language === 'en' && <img onClick={() => switchLang('mn')} src={usa} className="w-6 cursor-pointer" />
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className='mx-auto h-20 flex items-center' style={{ width: '70%' }}>
                <div className='w-full flex items-center justify-between'>
                    <Link to="/" className="flex items-center">
                        <img className='w-60' src={logo} alt="logo" />
                    </Link>
                    <div className='flex text-lg'>
                        <Link className='ml-8'>{t("head_menu.about")}</Link>
                        <Link className='ml-8'>{t("head_menu.news")}</Link>
                        <Link className='ml-8'>{t("head_menu.transparency")}</Link>
                        <Link className='ml-8'>{t("head_menu.fund")}</Link>
                        <Link className='ml-8'>{t("head_menu.contact")}</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
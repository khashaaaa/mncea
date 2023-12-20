import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import { useTranslation } from "react-i18next"
import { LanguageContext } from '../context/LanguageProvider'
import { IconBrandFacebook, IconBrandX, IconBrandYoutube, IconSearch } from '@tabler/icons-react'
import logo from '/logo.jpg'
import mongolia from '/mongolia.png'
import usa from '/united-states.png'

export const Head = () => {

    const { language, switchLanguage } = useContext(LanguageContext)

    const { t } = useTranslation()

    return (
        <div>
            <div className="bg-gray-100 w-full h-10 flex items-center justify-end">
                <div style={{ margin: '0 15%' }}>
                    <div className="flex items-center">
                        <div className='grid grid-cols-3 gap-2 mr-8'>
                            <IconBrandFacebook size={18} color='navy' />
                            <IconBrandYoutube size={18} color='navy' />
                            <IconBrandX size={18} color='navy' />
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
            </div>
            <div className='mx-auto h-20 flex items-center' style={{ width: '70%' }}>
                <div className='w-full flex items-center justify-between'>
                    <Link to="/" className="flex items-center">
                        <img className='w-60' src={logo} alt="logo" />
                    </Link>
                    <div className='flex text-md'>
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
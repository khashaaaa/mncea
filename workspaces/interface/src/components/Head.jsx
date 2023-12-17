import { IconBrandFacebook, IconBrandX, IconBrandYoutube, IconSearch } from '@tabler/icons-react'
import logo from '/logo.jpg'
import { Link } from 'react-router-dom'

export const Head = () => {

    return (
        <div>
            <div className="bg-main w-full h-10 flex items-center">
                <div className='mx-auto flex justify-between items-center' style={{ width: '70%' }}>
                    <div className='grid grid-cols-3 gap-2'>
                        <IconBrandFacebook color='white' />
                        <IconBrandYoutube color='white' />
                        <IconBrandX color='white' />
                    </div>

                    <div className='flex items-center'>
                        <input className='w-60 rounded-l outline-none px-2 py-1 text-sm' />
                        <button type='button' className='bg-white py-1 px-2 rounded-r'><IconSearch size={20} /></button>
                    </div>
                </div>

            </div>
            <div className='mx-auto h-20 flex items-center' style={{ width: '70%' }}>
                <div className='w-full flex items-center justify-between'>
                    <Link to="/" className="flex items-center">
                        <img className='w-60' src={logo} alt="logo" />
                    </Link>
                    <div className='flex text-lg'>
                        <div className='ml-8'>Тухай</div>
                        <div className='ml-8'>Мэдээлэл</div>
                        <div className='ml-8'>Ил тод байдал</div>
                        <div className='ml-8'>Сан</div>
                        <div className='ml-8'>Холбоо барих</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
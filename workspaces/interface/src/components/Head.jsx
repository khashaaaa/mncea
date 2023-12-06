import logo from '../assets/logo.png'

export const Head = () => {

    return (
        <div>
            <div className="bg-main w-full h-10"></div>
            <div className='mx-auto h-20 flex items-center' style={{ width: '70%' }}>
                <div className='w-full flex items-center justify-between'>
                    <div className="flex items-center">
                        <img className='w-28' src={logo} alt="logo" />
                        <div className="ml-4 text-main w-60 text-sm">Боловсролын магадлан итгэмжлэлийн үндэсний зөвлөл</div>
                    </div>
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
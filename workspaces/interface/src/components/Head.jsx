import logo from '../assets/logo.png'

export const Head = () => {

    return (
        <div>
            <div className='bg-main h-10 w-full'>

            </div>
            <div className='mx-auto h-20 flex items-center' style={{ width: '60%' }}>

                <div className='w-full flex items-center justify-between'>
                    <img className='w-20' src={logo} alt="logo" />
                    <div className='flex'>
                        <div className='mx-2'>Тухай</div>
                        <div className='mx-2'>Мэдээлэл</div>
                        <div className='mx-2'>Ил тод байдал</div>
                        <div className='mx-2'>Сан</div>
                        <div className='mx-2'>Холбоо барих</div>
                    </div>
                    <div className='flex'>
                        <input type='text' className='outline-none border border-stone-200 rounded-l-xl px-2 py-1 focus:bg-slate-200' />
                        <button className='bg-accentOne rounded-r-xl text-white w-16'>Хайх</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export const ShowCase = () => {

    return (
        <div className="relative">
            <div className="absolute z-10" style={{ left: '20%', right: '20%' }}>
                <div className="text-center my-10 text-white font-bold text-xl">
                    <p>Боловсролын магадлан итгэмжлэлийн үндэсний зөвлөл</p>
                </div>
                <div className="grid grid-cols-3 gap-8">
                    <div className="bg-white rounded-xl text-center py-4">
                        <p>Чанарын баталгаажуулалт</p>
                    </div>
                    <div className="bg-white rounded-xl text-center py-4">
                        <p>Мэргэшлийн үндэсний шаталсан бүтэц</p>
                    </div>
                    <div className="bg-white rounded-xl text-center py-4">
                        <p>Эрдмийн зэрэг хүлээн зөвшөөрөх</p>
                    </div>
                </div>
            </div>
            <div className="absolute w-full h-showcase bg-accentOne opacity-50"></div>
            <div className="w-full h-showcase" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1697637983407-c9e3fd241249?q=80&w=2145&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}></div>
        </div>
    )
}
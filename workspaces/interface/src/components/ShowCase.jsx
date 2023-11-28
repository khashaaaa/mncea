export const ShowCase = () => {

    return (
        <div style={{ margin: '2rem 15%' }}>
            <div className="grid grid-cols-3 gap-8">
                <div className="text-center rounded-md p-6 cursor-pointer bg-blue-600">
                    <p className="font-bold">Чанарын баталгаажуулалт</p>
                </div>
                <div className="text-center rounded-md p-6 cursor-pointer bg-emerald-600">
                    <p className="font-bold">Мэргэшлийн үндэсний шаталсан бүтэц</p>
                </div>
                <div className="text-center rounded-md p-6 cursor-pointer bg-yellow-600">
                    <p className="font-bold">Эрдмийн зэрэг хүлээн зөвшөөрөх</p>
                </div>
            </div>
        </div>
    )
}
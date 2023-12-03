export const NewsGrid = () => {

    return (
        <div style={{ margin: '2rem 15%' }}>
            <div>
                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="h-60 bg-black rounded-lg"></div>
                    <div className="col-span-2">
                        <p className="text-lg font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur eos quas id in aut distinctio accusantium quis qui architecto provident?</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="h-60 bg-black rounded-lg"></div>
                    <div className="col-span-2">
                        <p className="text-lg font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur eos quas id in aut distinctio accusantium quis qui architecto provident?</p>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4 mb-4">
                    <div className="h-60 bg-black rounded-lg"></div>
                    <div className="col-span-2">
                        <p className="text-lg font-bold">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur eos quas id in aut distinctio accusantium quis qui architecto provident?</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
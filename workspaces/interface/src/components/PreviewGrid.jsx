export const PreviewGrid = () => {

    return (
        <div>
            <div className="grid grid-cols-4 grid-rows-2 gap-4" style={{ margin: '2rem 15%' }}>
                <div className="w-full h-full bg-stone-800 rounded-2xl row-span-2 col-span-2"></div>
                <div className="w-full h-64 bg-stone-800 rounded-2xl"></div>
                <div className="w-full h-64 bg-stone-800 rounded-2xl"></div>
                <div className="w-full h-64 bg-stone-800 rounded-2xl"></div>
                <div className="w-full h-64 bg-stone-800 rounded-2xl"></div>

            </div>
        </div>
    )
}
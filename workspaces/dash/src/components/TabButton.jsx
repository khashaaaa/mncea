export const TabButton = ({ index, label, active, setActive }) => {

    const isActive = active === index

    const buttonClass = `py-2 font-bold shadow-md border border-stone-200 ${isActive ? 'bg-sky-600 text-white' : ''} ${index === 1 ? 'rounded-l-md' : index === 3 ? 'rounded-r-md' : ''}`

    return (
        <button onClick={() => setActive(index)} className={buttonClass} type="button">
            {label}
        </button>
    )
}
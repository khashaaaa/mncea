export const TabButton = ({ index, label, active, setActive }) => {

    const isActive = active === index

    const buttonClass = `py-1 text-sm duration-300 hover:bg-sky-700 hover:text-white ${isActive ? 'bg-sky-800 text-white' : ''} ${index === 1 ? 'rounded-l-md border-r-0' : index === 3 ? 'rounded-r-md border-l-0' : ''}`

    return (
        <button onClick={() => setActive(index)} className={buttonClass} type="button">
            {label}
        </button>
    )
}
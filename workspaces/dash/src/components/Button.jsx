export const Button = ({ text, color, click, icon }) => {

    return <button onClick={click} className={`flex justify-center items-center bg-${color}-600 text-white text-sm font-bold rounded-md py-1 px-2 hover:bg-${color}-500 duration-300 shadow-md`} type="button">{icon}<p>{text}</p></button>
}
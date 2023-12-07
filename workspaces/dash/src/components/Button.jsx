export const Button = ({ text, color, click }) => {

    return <button onClick={click} className={`bg-${color}-700 text-white text-xs font-bold rounded-md py-1 px-2`} type="button">{text}</button>
}
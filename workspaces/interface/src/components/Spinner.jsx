export const Spinner = () => {

    return (
        <svg className="w-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40" overflow="visible" fill="#1044ad" stroke="none">
            <defs>
                <circle id="loader" r="4" cx="20" cy="20" transform="translate(0 -20)" />
            </defs>
            <use xlinkHref="#loader" transform="rotate(30 20 20)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.08s" repeatCount="indefinite"></animate></use>
            <use xlinkHref="#loader" transform="rotate(60 20 20)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.17s" repeatCount="indefinite"></animate></use>
            <use xlinkHref="#loader" transform="rotate(90 20 20)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.25s" repeatCount="indefinite"></animate></use>
            <use xlinkHref="#loader" transform="rotate(120 20 20)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.33s" repeatCount="indefinite"></animate></use>
            <use xlinkHref="#loader" transform="rotate(150 20 20)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.42s" repeatCount="indefinite"></animate></use>
            <use xlinkHref="#loader" transform="rotate(180 20 20)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.50s" repeatCount="indefinite"></animate></use>
            <use xlinkHref="#loader" transform="rotate(210 20 20)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.58s" repeatCount="indefinite"></animate></use>
            <use xlinkHref="#loader" transform="rotate(240 20 20)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.67s" repeatCount="indefinite"></animate></use>
            <use xlinkHref="#loader" transform="rotate(270 20 20)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.75s" repeatCount="indefinite"></animate></use>
            <use xlinkHref="#loader" transform="rotate(300 20 20)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.83s" repeatCount="indefinite"></animate></use>
            <use xlinkHref="#loader" transform="rotate(330 20 20)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="0.92s" repeatCount="indefinite"></animate></use>
            <use xlinkHref="#loader" transform="rotate(360 20 20)"><animate attributeName="opacity" values="0;1;0" dur="1s" begin="1.00s" repeatCount="indefinite"></animate></use>
        </svg>

    )
}
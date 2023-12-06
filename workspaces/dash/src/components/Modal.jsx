export const Modal = ({ content }) => {

    return (
        <div>
            <div className="fixed top-0 bottom-0 right-0 left-0 bg-black opacity-30"></div>
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl w-80 h-80">
                {content}
            </div>
        </div>

    )
}
import { IconTrash, IconEdit } from "@tabler/icons-react"

export const Menu = ({ active }) => {

    return (
        <div className="mt-4">
            {
                active === 1 && <p>Ерөнхий цэс нэмэх</p>
                ||
                active === 2 && <p>Үндсэн цэс нэмэх</p>
                ||
                active === 3 && <p>Дэд цэс нэмэх</p>
            }
            <div className="mt-4 w-80 grid grid-cols-4 gap-4">
                <input type="text" className="col-span-3 outline-none border border-stone-200 py-1 px-2 rounded-md" />
                <button className='w-24 bg-green-700 text-white text-xs font-bold rounded-md py-2' type='button'>Нэмэх</button>
            </div>
            <table className="mt-4 w-full border-collapse border border-stone-200 text-xs">
                <thead>
                    <tr>
                        <th className="border border-stone-200 w-8">№</th>
                        <th className="border border-stone-200">Нэр</th>
                        <th className="border border-stone-200 w-20">Үйлдэл</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="border border-stone-200 w-8">1</td>
                        <td className="border border-stone-200">Магадлан</td>
                        <td className="border border-stone-200 w-20">
                            <div className="flex justify-evenly">
                                <IconTrash />
                                <IconEdit />
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}
import { useEffect, useState } from 'react'
import { IconTrash, IconEdit } from "@tabler/icons-react"
import { base_url } from "../config/global"

export const Menu = ({ active }) => {
    const [name, setName] = useState()
    const [parent, setParent] = useState()
    const [grandParent, setGrandParent] = useState()

    const [baseCategories, setBaseCategories] = useState([])
    const [midCategories, setMidCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [resp1, resp2, resp3] = await Promise.all([
                    fetch(base_url + 'basecategory'),
                    fetch(base_url + 'midcategory'),
                    fetch(base_url + 'subcategory'),
                ])

                const data1 = await resp1.json()
                const data2 = await resp2.json()
                const data3 = await resp3.json()

                setBaseCategories(data1)
                setMidCategories(data2)
                setSubCategories(data3)
            } catch (error) {
                console.error('Error fetching data:', error)
            }
        }

        fetchData()
    }, [])

    const saveBaseCategory = async (url) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name }),
        }

        const raw = await fetch(base_url + url, options)
        const resp = await raw.json()

        setBaseCategories(resp)
    }

    const saveMidCategory = async (url) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ parent, name }),
        }

        const raw = await fetch(base_url + url, options)
        const resp = await raw.json()

        setMidCategories(resp)
    }

    const saveSubCategory = async (url) => {
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ grandParent, parent, name }),
        }

        const raw = await fetch(base_url + url, options)
        const resp = await raw.json()

        setSubCategories(resp)
    }

    switch (active) {
        case 1:
            return (
                <div className="mt-16">
                    <div className="flex">
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="w-80 outline-none border border-stone-200 py-1 px-2 rounded-md"
                        />
                        <button
                            onClick={saveBaseCategory}
                            className='w-24 ml-2 bg-green-700 text-white font-bold rounded-md py-1'
                            type='button'
                        >
                            Нэмэх
                        </button>
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
                            {baseCategories.map((category, index) => (
                                <tr key={index}>
                                    <td className="border border-stone-200 w-8">{index + 1}</td>
                                    <td className="border border-stone-200">{category.name}</td>
                                    <td className="border border-stone-200 w-20">
                                        <div className="flex justify-evenly">
                                            <IconTrash />
                                            <IconEdit />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        case 2:
            return (
                <div className="mt-16">
                    <div className="flex">
                        <select onChange={(e) => setParent(e.target.value)} className="w-80 min-w-fit bg-white outline-none border border-stone-200 py-1 px-2 rounded-md">
                            {
                                baseCategories.map((item) => {
                                    return <option key={item.mark} value={item.mark}>{item.name}</option>
                                })
                            }
                        </select>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="w-80 ml-2 outline-none border border-stone-200 py-1 px-2 rounded-md"
                        />
                        <button
                            onClick={saveMidCategory}
                            className='w-24 ml-2 bg-green-700 text-white font-bold rounded-md py-1'
                            type='button'
                        >
                            Нэмэх
                        </button>
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
                            {midCategories.map((category, index) => (
                                <tr key={index}>
                                    <td className="border border-stone-200 w-8">{index + 1}</td>
                                    <td className="border border-stone-200">{category.name}</td>
                                    <td className="border border-stone-200 w-20">
                                        <div className="flex justify-evenly">
                                            <IconTrash />
                                            <IconEdit />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
        case 3:
            return (
                <div className="mt-16">
                    <div className="flex">
                        <select onClick={(e) => setGrandParent(e.target.value)} className="w-80 min-w-fit bg-white outline-none border border-stone-200 py-1 px-2 rounded-md">
                            {
                                baseCategories.map((item) => {
                                    return <option key={item.mark} value={item.mark}>{item.name}</option>
                                })
                            }
                        </select>
                        <select onClick={(e) => setParent(e.target.value)} className="w-80 min-w-fit ml-2 bg-white outline-none border border-stone-200 py-1 px-2 rounded-md">
                            {
                                midCategories.map((item) => {
                                    return <option key={item.mark} value={item.mark}>{item.name}</option>
                                })
                            }
                        </select>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            className="w-80 ml-2 outline-none border border-stone-200 py-1 px-2 rounded-md"
                        />
                        <button
                            onClick={saveSubCategory}
                            className='w-24 ml-2 bg-green-700 text-white font-bold rounded-md py-1'
                            type='button'
                        >
                            Нэмэх
                        </button>
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
                            {subCategories.map((category, index) => (
                                <tr key={index}>
                                    <td className="border border-stone-200 w-8">{index + 1}</td>
                                    <td className="border border-stone-200">{category.name}</td>
                                    <td className="border border-stone-200 w-20">
                                        <div className="flex justify-evenly">
                                            <IconTrash />
                                            <IconEdit />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )
    }
}

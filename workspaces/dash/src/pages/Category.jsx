import React, { useState, useEffect, useContext } from "react"
import { ModalContext } from "../context/ModalProvider"
import { AlertContext } from "../context/AlertProvider"
import { Alert } from "../components/Alert"
import { Modal } from "../components/Modal"
import { MainLayout } from "../layouts/MainLayout"
import { TabButton } from "../components/TabButton"
import { Button } from "../components/Button"
import { base_url } from "../config/global"
import { IconTrash, IconEdit } from "@tabler/icons-react"

export const Category = () => {
    const { isAlertOpen, openAlert, closeAlert } = useContext(AlertContext)
    const { isModalOpen, openModal, closeModal } = useContext(ModalContext)

    const [active, setActive] = useState(1)
    const [msg, setMsg] = useState(null)
    const [alertType, setAlertType] = useState("")
    const [name, setName] = useState("")
    const [parent, setParent] = useState()
    const [grandParent, setGrandParent] = useState()
    const [baseCategories, setBaseCategories] = useState([])
    const [midCategories, setMidCategories] = useState([])
    const [subCategories, setSubCategories] = useState([])
    const [editingCategory, setEditingCategory] = useState(null)

    useEffect(() => {
        fetchData()
        if (!msg) {
            closeAlert()
        }
        if (isAlertOpen) {
            const timeoutId = setTimeout(() => {
                closeAlert()
            }, 3000)
            return () => clearTimeout(timeoutId)
        }
    }, [isAlertOpen, editingCategory])

    const fetchData = async () => {
        try {
            const [baseResp, midResp, subResp] = await Promise.all([
                fetch(base_url + "basecategory"),
                fetch(base_url + "midcategory"),
                fetch(base_url + "subcategory"),
            ])

            const baseData = await baseResp.json()
            const midData = await midResp.json()
            const subData = await subResp.json()

            setBaseCategories(baseData)
            setMidCategories(midData)
            setSubCategories(subData)
        } catch (error) {
            console.error('Error fetching data:', error)
        }
    }

    const saveBaseCategory = async () => {
        closeModal()
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        }
        const raw = await fetch(base_url + "basecategory", options)
        const resp = await raw.json()
        setAlertType(resp.ok ? "success" : "error")
        if (resp.ok) {
            fetchData()
            setMsg(resp.message)
            openAlert()
        }
    }

    const editBaseCategory = async () => {
        closeModal()
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        }
        const raw = await fetch(base_url + "basecategory", options)
        const resp = await raw.json()
        setAlertType(resp.ok ? "success" : "error")
        if (resp.ok) {
            fetchData()
            setMsg(resp.message)
            openAlert()
        }
    }

    const deleteBaseCategory = async () => {
        closeModal()
        const options = {
            method: "DELETE",
        }
        const raw = await fetch(base_url + "basecategory", options)
        const resp = await raw.json()
        setAlertType(resp.ok ? "success" : "error")
        if (resp.ok) {
            fetchData()
            setMsg(resp.message)
            openAlert()
        }
    }

    const saveMidCategory = async () => {
        closeModal()
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ parent, name }),
        }
        const raw = await fetch(base_url + "midcategory", options)
        const resp = await raw.json()
        setAlertType(resp.ok ? "success" : "error")
        if (resp.ok) {
            fetchData()
            setMsg(resp.message)
            openAlert()
        }
    }

    const editMidCategory = async () => {
        closeModal()
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ parent, name }),
        }
        const raw = await fetch(base_url + "midcategory", options)
        const resp = await raw.json()
        setAlertType(resp.ok ? "success" : "error")
        if (resp.ok) {
            fetchData()
            setMsg(resp.message)
            openAlert()
        }
    }

    const deleteMidCategory = async () => {
        closeModal()
        const options = {
            method: "DELETE",
        }
        const raw = await fetch(base_url + "midcategory", options)
        const resp = await raw.json()
        setAlertType(resp.ok ? "success" : "error")
        if (resp.ok) {
            fetchData()
            setMsg(resp.message)
            openAlert()
        }
    }

    const saveSubCategory = async () => {
        closeModal()
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ grandParent, parent, name }),
        }
        const raw = await fetch(base_url + "subcategory", options)
        const resp = await raw.json()
        setAlertType(resp.ok ? "success" : "error")
        if (resp.ok) {
            fetchData()
            setMsg(resp.message)
            openAlert()
        }
    }

    const editSubCategory = async () => {
        closeModal()
        const options = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ grandParent, parent, name }),
        }
        const raw = await fetch(base_url + "subcategory", options)
        const resp = await raw.json()
        setAlertType(resp.ok ? "success" : "error")
        if (resp.ok) {
            fetchData()
            setMsg(resp.message)
            openAlert()
        }
    }

    const deleteSubCategory = async () => {
        closeModal()
        const options = {
            method: "DELETE",
        }
        const raw = await fetch(base_url + "subcategory", options)
        const resp = await raw.json()
        setAlertType(resp.ok ? "success" : "error")
        if (resp.ok) {
            fetchData()
            setMsg(resp.message)
            openAlert()
        }
    }

    const editCategory = (category) => {
        setEditingCategory(category)
        setName(category.name)
        openModal()
    }

    const clearEditingState = () => {
        setEditingCategory(null)
        setName("")
    }

    const renderModalContent = () => {
        if (editingCategory) {
            return (
                <div className="mt-8 w-80 grid grid-rows-2 gap-4">
                    <input
                        onChange={(e) => setName(e.target.value)}
                        type="text"
                        value={name}
                        className="outline-none border border-stone-200 text-sm py-1 px-2 rounded-md"
                    />
                    {active === 1 && (
                        <Button click={editBaseCategory} text="Хадгалах" color="green" />
                    )}
                    {active === 2 && (
                        <Button click={editMidCategory} text="Хадгалах" color="green" />
                    )}
                    {active === 3 && (
                        <Button click={editSubCategory} text="Хадгалах" color="green" />
                    )}
                </div>
            )
        }

        const parentOptions = active === 1 ? [] : (active === 2 ? baseCategories : midCategories)

        return (
            <div className="mt-8 w-80 grid grid-rows-2 gap-4">
                {active !== 1 && (
                    <select
                        onChange={(e) => setParent(e.target.value)}
                        className="bg-white outline-none border border-stone-200 text-sm py-1 px-2 rounded-md"
                    >
                        <option>---сонгох---</option>
                        {parentOptions.map((item) => (
                            <option key={item.mark} value={item.mark}>
                                {item.name}
                            </option>
                        ))}
                    </select>
                )}
                <input
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    value={name}
                    className="outline-none border border-stone-200 text-sm py-1 px-2 rounded-md"
                />
                {active === 1 && (
                    <Button click={saveBaseCategory} text="Болсон" color="green" />
                )}
                {active === 2 && (
                    <Button click={saveMidCategory} text="Болсон" color="green" />
                )}
                {active === 3 && (
                    <Button click={saveSubCategory} text="Болсон" color="green" />
                )}
            </div>
        )
    }

    const renderCategoryTable = (categories) => (
        <div className="mt-8">
            <Button color="green" text="Нэмэх" click={() => openModal()} />
            <table className="mt-4 w-full border-collapse border border-stone-200 text-xs">
                <thead>
                    <tr>
                        <th className="border border-stone-200 w-8">№</th>
                        <th className="border border-stone-200">Нэр</th>
                        <th className="border border-stone-200 w-20">Үйлдэл</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category, index) => (
                        <tr key={index}>
                            <td className="border border-stone-200 w-8">{index + 1}</td>
                            <td className="border border-stone-200">{category.name}</td>
                            <td className="border border-stone-200 w-20">
                                <div className="flex justify-evenly">
                                    <IconEdit
                                        onClick={() => editCategory(category)}
                                        className="cursor-pointer"
                                    />
                                    <IconTrash
                                        onClick={() => {
                                            clearEditingState()
                                            deleteCategory(category)
                                        }}
                                        className="cursor-pointer"
                                    />
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )

    const deleteCategory = (category) => {
        setAlertType("info")
        setMsg(`Устгахдаа итгэлтэй байна уу?`)
        openAlert(() => {
            if (active === 1) {
                deleteBaseCategory()
            } else if (active === 2) {
                deleteMidCategory()
            } else if (active === 3) {
                deleteSubCategory()
            }
        })
    }

    return (
        <MainLayout>
            {isAlertOpen && <Alert content={msg} type={alertType} />}
            {isModalOpen && <Modal content={renderModalContent()} />}
            <div className="grid grid-cols-3 text-sm">
                <TabButton index={1} label="Ерөнхий цэс" active={active} setActive={setActive} />
                <TabButton index={2} label="Дунд цэс" active={active} setActive={setActive} />
                <TabButton index={3} label="Дэд цэс" active={active} setActive={setActive} />
            </div>
            {active === 1 && renderCategoryTable(baseCategories)}
            {active === 2 && renderCategoryTable(midCategories)}
            {active === 3 && renderCategoryTable(subCategories)}
        </MainLayout>
    )
}

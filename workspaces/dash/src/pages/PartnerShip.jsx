import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { MainLayout } from "../layouts/MainLayout"
import Cookiez from 'js-cookie'
import { MenuContext } from "../context/MenuProvider"
import { ModalContext } from "../context/ModalProvider"
import { Modal } from "../components/Modal"
import { Button } from "../components/Button"
import { IconEdit, IconPencilPlus, IconTrash } from "@tabler/icons-react"
import { base_url } from "../../environment/url"
import NoThumb from '/no-thumbnail.jpg'

export const PartnerShip = () => {

    const access_token = Cookiez.get('access_token')

    const navigate = useNavigate()

    const [partners, setPartners] = useState([])
    const [del, setDel] = useState(null)

    const { setActive } = useContext(MenuContext)
    const { isModalOpen, openModal, closeModal } = useContext(ModalContext)

    useEffect(() => {
        setActive('partnership')
        if (!access_token) {
            navigate('/login')
        }
        FetchPartners()
    }, [])

    const FetchPartners = async () => {
        const raw = await fetch(`${base_url}/partnership`)
        const resp = await raw.json()
        setPartners(resp.data)
    }

    const RemovePartner = async () => {
        try {
            const imageOptions = {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ logo: del.logo })
            }

            if (del.logo) {
                const rawImg = await fetch(`${base_url}/partnership/sweep`, imageOptions)
                const respImg = await rawImg.json()

                if (!respImg.ok) {
                    console.error('Image not found:', respImg.message)
                    return
                }
            }

            const postOptions = {
                method: 'DELETE',
                headers: {
                    Authorization: `Bearer ${access_token}`,
                }
            }

            const rawPost = await fetch(`${base_url}/partnership/${del.mark}/delete`, postOptions)
            const respPost = await rawPost.json()

            if (respPost.ok) {
                closeModal()
                FetchPartners()
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    const modalContent = (
        <div className="mt-8">
            <p>Байгууллагыг устгах уу?</p>
            <div className="mt-4 grid grid-cols-2 gap-2">
                <button onClick={() => RemovePartner()} type="button" className="bg-green-600 text-white text-xs font-bold rounded-md py-1 px-2">Тийм</button>
                <button onClick={() => closeModal()} type="button" className="bg-gray-600 text-white text-xs font-bold rounded-md py-1 px-2">Болих</button>
            </div>
        </div>
    )

    return (
        <MainLayout>
            {
                isModalOpen ?
                    <Modal content={modalContent} />
                    :
                    null
            }
            <div>
                <Link to="/createpartner">
                    <Button color="green" text="Нэмэх" icon={<IconPencilPlus />} />
                </Link>
            </div>
            <div className="mt-4 grid grid-cols-4 gap-4">
                {
                    partners.map(partner => {
                        return (
                            <div key={partner.mark} className="border border-stone-200 rounded-2xl hover:shadow-xl duration-300">
                                {
                                    partner.logo ?
                                        <img src={`${base_url}/partnership/logo/${partner.logo}`} alt={partner.logo} className="object-contain h-60 w-full rounded-t-xl border-b border-stone-200" />
                                        :
                                        <img src={NoThumb} alt="empty" className="object-contain h-60 w-full rounded-t-xl border-b border-stone-200" />
                                }
                                <div className="p-2 h-20 flex flex-col justify-between">
                                    <p className="font-bold text-xs">{partner.name}</p>
                                    <div className="flex justify-end">
                                        <Link to={`/partnership/${partner.mark}/update`} className="mr-2">
                                            <IconEdit size={18} />
                                        </Link>
                                        <IconTrash size={18} onClick={() => { openModal(), setDel(partner) }} className="cursor-pointer" />
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </MainLayout>
    )
}
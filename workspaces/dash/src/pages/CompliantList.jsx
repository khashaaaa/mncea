import { useContext, useEffect, useState } from 'react'
import { MainLayout } from '../layouts/MainLayout'
import { MenuContext } from '../context/MenuProvider'
import { base_url } from '../../environment/url'
import { useNavigate } from 'react-router-dom'
import Cookiez from 'js-cookie'
import { IconArrowBigRight } from '@tabler/icons-react'

export const CompliantList = () => {

    const access_token = Cookiez.get('access_token')
    const str = Cookiez.get('user')
    const user = str ? JSON.parse(str) : null

    const navigate = useNavigate()

    const { setActive } = useContext(MenuContext)

    const [compliants, setCompliants] = useState([])

    useEffect(() => {
        setActive('compliant')
        if (!access_token) {
            navigate('/login')
        }
        FetchCompliants()
    }, [])

    const FetchCompliants = async () => {

        const raw = await fetch(`${base_url}/compliant`)
        const resp = await raw.json()
        setCompliants(resp.data)
    }

    const formatTimestamp = (timestamp) => {
        const date = new Date(timestamp)
        return date.toISOString().slice(0, 16).replace('T', ' ')
    }

    return (
        <MainLayout>
            <table className='table-auto border-collapse border border-stone-200 text-sm'>
                <thead>
                    <tr>
                        <th className='border border-stone-200'>Нэр</th>
                        <th className='border border-stone-200'>Утас</th>
                        <th className='border border-stone-200'>Имэйл</th>
                        <th className='border border-stone-200'>Төрөл</th>
                        <th className='border border-stone-200'>Хүсэлт</th>
                        <th className='border border-stone-200'>Огноо</th>
                        <th className='border border-stone-200'></th>
                    </tr>
                </thead>
                <tbody>
                    {
                        compliants?.length > 0 && compliants.map((comp) => (
                            <tr key={comp.mark}>
                                <td className='border border-stone-200 px-2'>{comp.user}</td>
                                <td className='border border-stone-200 px-2'>{comp.mobile}</td>
                                <td className='border border-stone-200 px-2'>{comp.email}</td>
                                <td className='border border-stone-200 px-2'>{comp.type}</td>
                                <td className='border border-stone-200 px-2' style={{ maxWidth: '600px', overflow: 'hidden', textOverflow: 'ellipsis' }}>{comp.statement}</td>
                                <td className='border border-stone-200 px-2'>{formatTimestamp(comp.created)}</td>
                                <td className='border border-stone-200 px-2'><IconArrowBigRight /></td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </MainLayout>
    )
}
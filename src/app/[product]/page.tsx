"use client"

import { fetchProduct } from '@/redux/features/productSlice'
import { AppDispatch } from '@/redux/store'
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'


export interface ProductHomePageProps { }


const ProductHomePage = () => {
    const params = useParams()
    const dispatch = useDispatch<AppDispatch>()


    useEffect(() => {
        // @ts-ignore
        dispatch(fetchProduct(params?.product))
    }, [dispatch, params?.product])
    return (
        <div className='container py-10'>ProductHomePage</div>
    )
}

export default ProductHomePage
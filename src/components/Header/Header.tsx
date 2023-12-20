"use client"

import ButtonPrimary from '@/shared/ButtonPrimary'
import Logo from '@/shared/Logo'
import React from 'react'

export interface HeaderProps { }

const Header: React.FC<HeaderProps> = () => {
    return (
        <nav className=' border-b border-gray-100 shadow-xs'>
            <div className='relative container h-20 flex justify-between gap-2 '>
                <div className='main-logo flex'>
                    <Logo className='self-center w-36' />
                </div>
                <div className='rt-section flex'>
                    <ButtonPrimary href='/' className='self-center shadow'>Login</ButtonPrimary>
                </div>
            </div>
        </nav>
    )
}

export default Header
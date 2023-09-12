import '@/common/syles/globals.css'

import React from 'react';
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import DefaultLayout from "@/common/components/layouts/DefaultLayout"
import AuthStatus from '@/common/components/authStatus'
import SessionProviderWrapper from '@/common/utils/sessionProviderWrapper'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <SessionProviderWrapper>
            <html lang="en">
                <body className={inter.className}>
                    <DefaultLayout>
                        {children}
                        <AuthStatus />
                    </DefaultLayout>
                </body>
            </html>
        </SessionProviderWrapper>
    )
}

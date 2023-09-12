"use client";

import React from 'react';
import Navbar from '@/common/components/modules/Navbar';
import Sidebar from '@/common/components/modules/Sidebar';
import { Layout } from 'antd';

const { Content } = Layout;

interface DefaultLayoutProps {
    children: React.ReactNode;
}

const DefaultLayout: React.FC<DefaultLayoutProps> = ({ children }: { children: React.ReactNode }) => {
    return (
        <Layout
            style={{
                background: 'linear-gradient(to top, #dad4ec 0%, #dad4ec 1%, #f3e7e9 100%)',
                width: '100vw',
                height: '100vh'
            }}>
            <Layout style={{
                borderRadius: 25,
                background: 'white',
                boxShadow: 'rgba(149, 157, 165, 0.2) 0px 8px 24px',
                margin: 15,
                padding: 10
            }}>
                <Navbar />
                <Layout style={{ background: 'white' }}>
                    <Sidebar />
                    <Content
                        style={{
                            borderRadius: 25,
                            background: 'linear-gradient(to top, #dad4ec 0%, #dad4ec 1%, #f3e7e9 100%)',
                            boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1)',
                            margin: '0 10px 10px 10px',
                            padding: 30
                        }}>
                        {children}
                    </Content>
                </Layout>
            </Layout>
        </Layout>
    );
}

export default DefaultLayout;

import React from 'react';
import { Button, Layout, Space } from 'antd';
import Auth from "@/common/components/modules/Auth"

const { Header } = Layout;

const Navbar: React.FC = () => {
    return (
        <>
            <Header style={{ background: 'white', padding: '0 15px', }}>
                <Space
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between'
                    }}>
                    <Button
                        type='text'
                        block
                        size='large'
                    >
                        Transformex
                    </Button>
                    <Space size={10} style={{ marginRight: 15 }}>
                        <Auth />
                    </Space>
                </Space>
            </Header>
        </>
    );
};

export default Navbar;

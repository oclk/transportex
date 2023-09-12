import React from 'react';
import { Button, Dropdown, Layout, Space, theme } from 'antd';
import type { MenuProps } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const { Header } = Layout;

const onChange = (value: string) => {
    console.log(`selected ${value}`);
};

const onSearch = (value: string) => {
    console.log('search:', value);
};

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                1st menu item
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                2nd menu item
            </a>
        ),
    },
    {
        key: '3',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                3rd menu item
            </a>
        ),
    },
];

const Navbar: React.FC = () => {
    // const {
    //     token: { colorBgContainer },
    // } = theme.useToken();

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
                    >
                        <h3>Transformex</h3>
                    </Button>
                    <Space size={10}>
                        <Dropdown menu={{ items }} placement="bottom">
                            <Button type='text'>
                                <UserOutlined />
                            </Button>
                        </Dropdown>
                    </Space>
                </Space>
            </Header>
        </>
    );
};

export default Navbar;

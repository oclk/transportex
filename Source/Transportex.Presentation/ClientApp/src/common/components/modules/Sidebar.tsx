"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    ApartmentOutlined,
    CalendarOutlined,
    CodeOutlined,
    DoubleLeftOutlined,
    DoubleRightOutlined,
    FileSearchOutlined,
    FileTextOutlined,
    ProjectOutlined,
    SettingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Layout, Menu, Space, Tooltip, theme } from 'antd';

const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
): MenuItem {
    return {
        label,
        key,
        icon,
        children,
        type,
    } as MenuItem;
}

const items: MenuItem[] = [
    getItem('Calendar', 'calendar', <CalendarOutlined />),
    getItem('Groups', 'groups', <ApartmentOutlined />),
    getItem('Explore', 'explore', <FileSearchOutlined />),
    getItem('Trainings', '1', <ProjectOutlined />, [
        getItem('Yours', 'trainings', <span style={{ color: 'orange' }}>●</span>),
        getItem('Enrolled', 'trainings/enrolled', <span style={{ color: 'red' }}>●</span>),
        getItem('Starred', 'trainings/starred', <span style={{ color: 'yellow' }}>●</span>),
    ]),
    getItem('Assignments', '2', <FileTextOutlined />, [
        getItem('Yours', 'assignments', <span style={{ color: 'orange' }}>●</span>),
        getItem('Enrolled', 'assignments/enrolled', <span style={{ color: 'red' }}>●</span>),
        getItem('Starred', 'assignments/starred', <span style={{ color: 'yellow' }}>●</span>),
    ]),
    getItem('Pages', '3', <FileTextOutlined />, [
        getItem('Yours', 'pages', <span style={{ color: 'orange' }}>●</span>),
        getItem('Enrolled', 'pages/enrolled', <span style={{ color: 'red' }}>●</span>),
        getItem('Starred', 'pages/starred', <span style={{ color: 'yellow' }}>●</span>),
    ]),
    getItem('Courses', '4', <CodeOutlined />, [
        getItem('Yours', 'courses', <span style={{ color: 'orange' }}>●</span>),
        getItem('Enrolled', 'courses/enrolled', <span style={{ color: 'red' }}>●</span>),
        getItem('Starred', 'courses/starred', <span style={{ color: 'yellow' }}>●</span>),
    ]),
    getItem('Paths', '5', <CodeOutlined />, [
        getItem('Yours', 'paths', <span style={{ color: 'orange' }}>●</span>),
        getItem('Enrolled', 'paths/enrolled', <span style={{ color: 'red' }}>●</span>),
        getItem('Starred', 'paths/starred', <span style={{ color: 'yellow' }}>●</span>),
    ]),
    getItem('Reports', 'reports', <FileSearchOutlined />),
    getItem('Settings', 'settings', <SettingOutlined />),
];

const Sidebar: React.FC = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [openKeys, setOpenKeys] = useState(['1']);

    const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    };

    const {
        token: { colorBgContainer },
    } = theme.useToken();

    const router = useRouter();

    const handleClick = ({ key }: any) => {
        router.push(`/${key}`);
    }

    return (
        <>
            <Sider
                theme='light'
                collapsed={collapsed}
                style={{
                    marginTop: 15,
                    marginBottom: 25,
                    background: 'transparent',

                }}
            >
                <Space
                    direction="vertical"
                    size="middle"
                    style={{
                        height: '100%',
                        display: 'flex',
                        justifyContent: 'space-around'
                    }}
                >
                    <Menu
                        mode='inline'
                        theme='light'
                        style={{
                            borderRight: 'none', background: 'transparent',
                            overflowY: 'auto',
                            height: 'calc(85vh - 100px)',
                        }}
                        openKeys={openKeys}
                        onOpenChange={onOpenChange}
                        items={items}
                    >
                    </Menu>
                    {!collapsed &&
                        <Button
                            type='text'
                            block
                            onClick={() => setCollapsed(!collapsed)}
                        >
                            <DoubleLeftOutlined />
                            Collapse
                        </Button>
                    }
                    {collapsed &&
                        <Tooltip placement="right" title='Open'>
                            <Button
                                type='text'
                                block
                                onClick={() => setCollapsed(!collapsed)}
                            >
                                <DoubleRightOutlined />
                            </Button>
                        </Tooltip>
                    }
                </Space>
            </Sider>
        </>
    );
};

export default Sidebar;

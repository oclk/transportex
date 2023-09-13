"use client";

import { useEffect } from "react";
import { useSession, signIn, signOut } from "next-auth/react";
import { Button, Dropdown, Spin } from 'antd';
import { UserOutlined, LoginOutlined, LogoutOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';

const items: MenuProps['items'] = [
    {
        key: '1',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                Your Profile
            </a>
        ),
    },
    {
        key: '2',
        label: (
            <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                Your Organizations
            </a>
        ),
    },
    {
        type: 'divider',
    },
    {
        key: '3',
        label: 'Logout',
        icon: <LogoutOutlined />,
        onClick: () => {
            keycloakSessionLogOut().then(() => signOut({ callbackUrl: "/" }));
        }
    },
];

async function keycloakSessionLogOut() {
    try {
        await fetch(`/api/auth/logout`, { method: "GET" });
    } catch (err) {
        console.error(err);
    }
}

export default function Auth() {
    const { data: session, status } = useSession();

    useEffect(() => {
        if (
            status != "loading" &&
            session &&
            session?.error === "RefreshAccessTokenError"
        ) {
            signOut({ callbackUrl: "/" });
        }
    }, [session, status]);
    // if (status == "loading") {
    //     return (
    //         <Spin tip="Loading" size="large">
    //             <div className="content" />
    //         </Spin>
    //     )
    // }
    if (session) {
        return (
            <Dropdown menu={{ items }} placement="bottom">
                <Button type='text'>
                    <UserOutlined />
                </Button>
            </Dropdown>
        );
    }

    return (
        <Button type='text' onClick={() => signIn("keycloak")} icon={<LoginOutlined />}>
            Login
        </Button>
    );
}
import React from 'react';

interface DefaultLayoutProps {
    children: React.ReactNode;
}

const EmptyLayout: React.FC<DefaultLayoutProps> = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            {children}
        </>
    );
}

export default EmptyLayout;

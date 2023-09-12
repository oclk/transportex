import React from 'react';

const EmptyLayout: React.FC = ({ children }: React.PropsWithChildren<{}>) => {
    return (
        <>
            {children}
        </>
    );
};

export default EmptyLayout;

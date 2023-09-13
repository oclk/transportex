import React from 'react';
import OrganizationsTable from "./_common/components/OrganizationsTable"

const Organizations: React.FC = () => {
    return (
        <>
            <h2 style={{ fontWeight: 'lighter', marginBottom: 50 }}>Organizations</h2>
            <OrganizationsTable />
        </>
    )
};

export default Organizations;

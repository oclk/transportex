"use client";

import React, { useState, useEffect } from 'react';
import { ConfigProvider, Form, Input, InputNumber, Popconfirm, Table, Tag, Typography } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { GetUserGroups } from "../services/organizations.service";

interface Item {
    key: string;
    id: string;
    name: string;
    path: React.ReactElement;
}

const originData: Item[] = [];

interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
    editing: boolean;
    dataIndex: string;
    title: any;
    inputType: 'number' | 'text';
    record: Item;
    index: number;
    children: React.ReactNode;
}

const EditableCell: React.FC<EditableCellProps> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
}) => {
    const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;

    return (
        <td {...restProps}>
            {editing ? (
                <Form.Item
                    name={dataIndex}
                    style={{ margin: 0 }}
                    rules={[
                        {
                            required: true,
                            message: `Please Input ${title}!`,
                        },
                    ]}
                >
                    {inputNode}
                </Form.Item>
            ) : (
                children
            )}
        </td>
    );
};

const App: React.FC = () => {
    const [form] = Form.useForm();
    const [data, setData] = useState(originData);
    const [editingKey, setEditingKey] = useState('');

    const isEditing = (record: Item) => record.key === editingKey;

    useEffect(() => {
        async function fetchData() {
            const data = await GetUserGroups()
            if (data && data instanceof Array && data.length > 0) {
                for (let i = 0; i < data.length; i++) {
                    data[i].key = i.toString()
                    data[i].path = <Tag color="processing">{data[i].path}</Tag>
                }
            }

            setData(data)
        }
        fetchData();
    }, [])

    const edit = (record: Partial<Item> & { key: React.Key }) => {
        form.setFieldsValue({ name: '', age: '', address: '', ...record });
        setEditingKey(record.key);
    };

    const cancel = () => {
        setEditingKey('');
    };

    const save = async (key: React.Key) => {
        try {
            const row = (await form.validateFields()) as Item;

            const newData = [...data];
            const index = newData.findIndex((item) => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                setData(newData);
                setEditingKey('');
            } else {
                newData.push(row);
                setData(newData);
                setEditingKey('');
            }
        } catch (errInfo) {
            console.log('Validate Failed:', errInfo);
        }
    };

    const columns = [
        {
            title: 'Id',
            dataIndex: 'id',
            width: '30%',
            editable: true,
            sorter: (a: any, b: any) => a.id - b.id,
        },
        {
            title: 'Name',
            dataIndex: 'name',
            width: '25%',
            editable: true,
            sorter: (a: any, b: any) => a.name - b.name,
        },
        {
            title: 'Path',
            dataIndex: 'path',
            width: '30%',
            editable: true,
            sorter: (a: any, b: any) => a.path - b.path,
        },
        {
            title: 'Operations',
            dataIndex: 'operation',
            render: (_: any, record: Item) => {
                const editable = isEditing(record);
                return editable ? (
                    <span>
                        <Typography.Link onClick={() => save(record.key)} style={{ marginRight: 8 }}>
                            Save
                        </Typography.Link>
                        <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                            <a>Cancel</a>
                        </Popconfirm>
                    </span>
                ) : (
                    <>
                        <Typography.Link style={{ marginRight: 10 }} disabled={editingKey !== ''} onClick={() => edit(record)}>
                            <EditOutlined />
                        </Typography.Link>
                        <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>
                            <DeleteOutlined />
                        </Typography.Link>
                    </>
                );
            },
        },
    ];

    const mergedColumns = columns.map((col) => {
        if (!col.editable) {
            return col;
        }
        return {
            ...col,
            onCell: (record: Item) => ({
                record,
                inputType: col.dataIndex === 'age' ? 'number' : 'text',
                dataIndex: col.dataIndex,
                title: col.title,
                editing: isEditing(record),
            }),
        };
    });

    return (
        <Form form={form} component={false}>
            <ConfigProvider
                theme={{
                    components: {
                        Table: {
                            colorBgContainer: 'transparent'
                        },
                    },
                }}
            >
                <Table
                    components={{
                        body: {
                            cell: EditableCell,
                        },
                    }}
                    dataSource={data}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: cancel,
                    }}
                />
            </ConfigProvider>
        </Form>
    );
};

export default App;
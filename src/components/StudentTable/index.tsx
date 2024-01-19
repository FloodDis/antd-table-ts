import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Table } from "antd";
import React, { FC } from "react";
import { Student } from "../../types/types";
import './styles.css'

interface Column {
    key: string;
    title: string;
    dataIndex?: string;
    render?: (record: Student) => React.ReactElement
}

interface StudentTableProps {
    dataSource: Student[];
    onEditStudent: (record: Student) => void;
    onDeleteStudent: (record: Student) => void;
}

export const StudentTable: FC<StudentTableProps> = ({ dataSource, onEditStudent, onDeleteStudent }) => {

    const columns: Column[] = [
        {
            key: 'fullName',
            title: 'Полное имя',
            dataIndex: 'fullName'
        },
        {
            key: 'groupNumber',
            title: 'Номер группы',
            dataIndex: 'groupNumber'
        },
        {
            key: 'courseNumber',
            title: 'Номер курса',
            dataIndex: 'courseNumber'
        },
        {
            key: 'actions',
            title: 'Действие',
            render: (record: Student) => {
                return (
                    <>
                        <EditOutlined className="edit-button" onClick={() => onEditStudent(record)} />
                        <DeleteOutlined className="delete-button" onClick={() => onDeleteStudent(record)} />
                    </>
                )
            }
        }
    ]

    return (
        <Table pagination={false} columns={columns} dataSource={dataSource} />
    )
}
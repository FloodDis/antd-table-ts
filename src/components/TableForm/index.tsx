import { Form, Input } from "antd";
import { FC, useEffect } from "react";
import { Student } from "../../types/types";

interface TableFormProps {
    editingStudent: Student;
    setEditingStudent: (value: Student | ((prevState: Student) => Student)) => void;
    isEditing: boolean;
}

export const TableForm: FC<TableFormProps> = ({ editingStudent, setEditingStudent, isEditing }) => {

    const [form] = Form.useForm();

    useEffect(() => {
        updateAddEdit(isEditing);
    }, [isEditing]);

    useEffect(() => {
        updateValues();
    }, [editingStudent]);

    const updateValues = (): void => {
        form.setFieldsValue({
            fullName: editingStudent?.fullName,
            groupNumber: editingStudent?.groupNumber,
            courseNumber: editingStudent?.courseNumber
        })
    }

    const updateAddEdit = (isEditing: boolean): void => {
        isEditing
            ? form.setFieldsValue({
                fullName: editingStudent?.fullName,
                groupNumber: editingStudent?.groupNumber,
                courseNumber: editingStudent?.courseNumber
            })
            : form.setFieldsValue({
                fullName: '',
                groupNumber: '',
                courseNumber: ''
            })
    }

    return (
        <Form form={form}>
            <Form.Item rules={
                [
                    {
                        required: true,
                        message: 'Необходимо ввести полное имя'
                    }
                ]}
                label='Полное имя'
                name='fullName'
                initialValue={editingStudent?.fullName}
            >
                <Input onChange={(e) => setEditingStudent((prevState: Student) => { return { ...prevState, fullName: e.target.value } })} placeholder="Полное имя" />
            </Form.Item>
            <Form.Item rules={
                [
                    {
                        required: true,
                        message: 'Необходимо ввести номер группы'
                    }
                ]}
                label='Номер группы'
                name='groupNumber'
                initialValue={editingStudent?.groupNumber}
            >
                <Input onChange={(e) => setEditingStudent((prevState: Student) => { return { ...prevState, groupNumber: e.target.value } })} placeholder="Номер группы" />
            </Form.Item>
            <Form.Item rules={
                [
                    {
                        required: true,
                        message: 'Необходимо ввести курс'
                    }
                ]}
                label='Курс'
                name='courseNumber'
                initialValue={editingStudent?.courseNumber}
            >
                <Input onChange={(e) => setEditingStudent((prevState: Student) => { return { ...prevState, courseNumber: e.target.value } })} placeholder="Курс" />
            </Form.Item>
        </Form>
    )
}
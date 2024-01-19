import { Modal } from 'antd';
import { FC } from 'react';
import { Student } from '../../types/types';
import { TableForm } from '../TableForm';

interface StudentModalProps {
    isEditing: boolean;
    isOpen: boolean;
    handleCancel: () => void;
    handleAdd: () => void;
    handleEdit: () => void;
    isButtonDisabled: boolean;
    editingStudent: Student;
    setEditingStudent: (value: Student | ((prevState: Student) => Student)) => void;
}

export const StudentModal: FC<StudentModalProps> = ({ isEditing, isOpen, handleCancel,
    handleAdd, handleEdit, isButtonDisabled, editingStudent, setEditingStudent }) => {
    return (
        <Modal
            title={
                isEditing
                    ? 'Редактирование записи о студенте'
                    : 'Добавление записи о студенте'
            }
            open={isOpen}
            okText={
                isEditing
                    ? 'Сохранить'
                    : 'Создать'
            }
            cancelText='Отмена'
            onOk={
                () => {
                    isEditing
                        ? handleEdit()
                        : handleAdd();
                }
            }
            okButtonProps={{ disabled: isButtonDisabled }}
            onCancel={handleCancel}
        >
            <TableForm
                editingStudent={editingStudent}
                setEditingStudent={setEditingStudent}
                isEditing={isEditing}
            />
        </Modal>
    )
}
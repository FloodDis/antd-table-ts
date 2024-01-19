import { FC, useCallback, useMemo, useState } from 'react';
import './App.css';
import { Student } from './types/types';
import { Button, Modal } from 'antd';
import { StudentTable } from './components/StudentTable';
import { StudentModal } from './components/StudentModal';
import { DATA } from './constants';

export const App: FC = () => {

  const [students, setStudents] = useState<Student[]>(DATA);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingStudent, setEditingStudent] = useState<Student>({
    id: 0,
    fullName: '',
    groupNumber: '',
    courseNumber: ''
  });
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleAdd = (): void => {
    if (!editingStudent.fullName || !editingStudent.groupNumber || !editingStudent.courseNumber) {
      return;
    }

    const newStudent: Student = {
      ...editingStudent,
      id: Date.now()
    }

    setStudents((prevState: Student[]) => [...prevState, newStudent]);
    setIsOpen(false);
    resetEditing();
  }

  const onDeleteStudent = (record: Student): void => {
    Modal.confirm({
      title: 'Вы уверены, что хотите удалить запись о клиенте?',
      okText: 'Удалить',
      cancelText: 'Отмена',
      onOk: () => {
        setStudents((prevState: Student[]) => {
          return prevState.filter((student: Student) => student.id !== record.id);
        })
      }
    });
  }

  const onEditStudent = (record: Student): void => {
    setIsEditing(true);
    setIsOpen(true);
    setEditingStudent({ ...record });
  };

  const handleEdit = (): void => {
    if (!editingStudent.fullName || !editingStudent.groupNumber || !editingStudent.courseNumber) {
      return;
    }
    setStudents((prevState: Student[]) => {
      return prevState.map((student: Student) => {
        if (student.id === editingStudent.id) {
          return editingStudent;
        } else {
          return student;
        }
      })
    });
    setIsOpen(false);
    resetEditing();
  }

  const resetEditing = useCallback((): void => {
    setIsEditing(false);
    setEditingStudent({
      id: 0,
      fullName: '',
      groupNumber: '',
      courseNumber: ''
    });
  }, [])

  const handleCancel = useCallback((): void => {
    setIsOpen(false);
    resetEditing();
  }, [])

  const openOnAdd = useCallback((): void => {
    setIsOpen(true);
    setIsEditing(false);
  }, [])

  const isDisabled = useMemo((): boolean => !editingStudent?.fullName
    || !editingStudent?.groupNumber
    || !editingStudent?.courseNumber,
    [editingStudent?.fullName, editingStudent?.groupNumber, editingStudent?.courseNumber]
  )

  return (
    <div className='app'>
      <Button className='app__add-button' onClick={openOnAdd}>Добавить студента</Button>
      <StudentTable
        dataSource={students}
        onEditStudent={onEditStudent}
        onDeleteStudent={onDeleteStudent}
      />
      <StudentModal
        isEditing={isEditing}
        isOpen={isOpen}
        handleCancel={handleCancel}
        handleAdd={handleAdd}
        handleEdit={handleEdit}
        isButtonDisabled={isDisabled}
        editingStudent={editingStudent}
        setEditingStudent={setEditingStudent}
      />
    </div>
  );
}
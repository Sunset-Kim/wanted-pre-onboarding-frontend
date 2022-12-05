import React, { ChangeEvent, useState } from "react";
import { ITodo } from "../types/todo.type";

interface TodoItemProps {
  todo: ITodo;
  onUpdate: (props: { id: number; isCompleted: boolean; todo: string }) => void;
  onDelete: (id: number) => void;
}
export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const { isCompleted, todo: title, id } = todo;

  const [newText, setNewText] = useState(title);
  const [newIsComplete, setNewIsComplete] = useState(isCompleted);
  const [isEdit, setIsEdit] = useState(false);

  // local state
  const openEdit = () => setIsEdit(true);
  const closeEdit = () => setIsEdit(false);
  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isEdit) return;
    setNewText(e.target.value);
  };
  const toggleCompelte = (e: ChangeEvent<HTMLInputElement>) => {
    if (!isEdit) return;
    setNewIsComplete(!newIsComplete);
  };

  // service
  const handleEdit = (id: number) => {
    onUpdate({ id, todo: newText, isCompleted: newIsComplete });
  };
  const handleDelete = (id: number) => {
    onDelete(id);
  };

  return (
    <div>
      <input type="text" name="title" value={isEdit ? newText : title} disabled={!isEdit} onChange={handleTextChange} />
      <input
        type="checkbox"
        name="isComplete"
        checked={isEdit ? newIsComplete : isCompleted}
        disabled={!isEdit}
        onChange={toggleCompelte}
      />
      {!isEdit && (
        <button type="button" onClick={() => openEdit()}>
          수정모드
        </button>
      )}
      {isEdit && (
        <div>
          <button type="button" onClick={() => handleEdit(id)}>
            수정완료
          </button>
          <button type="button" onClick={() => closeEdit()}>
            수정취소
          </button>
        </div>
      )}

      <button onClick={() => handleDelete(id)}>삭제</button>
    </div>
  );
}

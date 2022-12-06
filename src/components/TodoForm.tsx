import React, { ChangeEvent, SyntheticEvent, useState } from "react";
import { AddTodoParams } from "../types/todo.type";

interface TodoFormProps {
  onSubmit: (params: AddTodoParams) => void;
}

function TodoForm({ onSubmit }: TodoFormProps) {
  const [todo, setTodo] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setTodo(e.target.value);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todo.trim()) return;
    onSubmit({ todo });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        할일
        <input type="text" name="todos" placeholder="할일을 입력하세요" value={todo} onChange={handleChange} />
      </label>
      <button type="submit">추가</button>
    </form>
  );
}

export default TodoForm;

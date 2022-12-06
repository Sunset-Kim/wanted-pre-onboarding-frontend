import React from "react";
import { DeleteTodoParams, ITodo, UpdateTodoParams } from "../types/todo.type";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos?: ITodo[];
  onUpdate: (params: UpdateTodoParams) => void;
  onDelete: (params: DeleteTodoParams) => void;
}

export default function TodoList({ todos, onDelete, onUpdate }: TodoListProps) {
  if (!todos || todos.length === 0) {
    return <div>할일이 없습니다</div>;
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.userId + todo.id}>
          <TodoItem todo={todo} onDelete={onDelete} onUpdate={onUpdate} />
        </li>
      ))}
    </ul>
  );
}

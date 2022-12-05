import { useEffect, useState } from "react";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import { MOCK_TODOS } from "../__mocks__/todos";

export default function Todo() {
  const [todos, setTodos] = useState(MOCK_TODOS);

  const addTodo = (value: string) => {
    console.log(`API:createTodo! ${value}`);
  };

  const updateTodo = ({ id, todo, isCompleted }: { id: number; todo: string; isCompleted: boolean }) => {
    console.log(`API:updateTodo ${id}, ${todo}, ${isCompleted}`);
  };

  const deleteTodo = (id: number) => {
    console.log(`API:delete ${id}`);
  };

  useEffect(() => {
    //TODO: todos 조회
    console.log("API: GET TODOS");
  }, []);
  return (
    <div>
      <TodoForm onSubmit={addTodo} />
      <TodoList todos={todos} onDelete={deleteTodo} onUpdate={updateTodo} />
    </div>
  );
}

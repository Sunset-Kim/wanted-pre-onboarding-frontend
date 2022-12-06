import { Box, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import APP_CONFIG from "../app-config";
import TodoForm from "../components/TodoForm";
import TodoList from "../components/TodoList";
import useAuth from "../hooks/useAuth";
import TodoService from "../services/TodoService";
import { AddTodoParams, DeleteTodoParams, ITodo, UpdateTodoParams } from "../types/todo.type";
import LocalStorage from "../utils/localstorage";

export default function Todo() {
  const navigate = useNavigate();
  const { data } = useAuth();
  const [todos, setTodos] = useState<ITodo[] | undefined>();

  const getTodos = async () => {
    try {
      return await TodoService.getTodos();
    } catch (error) {
      console.log("Error:API get");
    }
  };

  const fetchTodos = async () => {
    const todos = await getTodos();
    setTodos(todos);
  };

  const addTodo = async (params: AddTodoParams) => {
    try {
      await TodoService.addTodo(params);
      await fetchTodos();
    } catch (error) {
      console.log("Error:API add");
    }
  };

  const updateTodo = async (params: UpdateTodoParams) => {
    try {
      await TodoService.updateTodo(params);
      await fetchTodos();
    } catch (error) {
      console.log("Error:API update");
    }
  };

  const deleteTodo = async (params: DeleteTodoParams) => {
    try {
      await TodoService.deleteTodo(params);
      await fetchTodos();
    } catch (error) {
      console.log(error);
      console.log("Error:API delete");
    }
  };

  useEffect(() => {
    if (!data) {
      navigate("/");
      return;
    }

    const { access_token } = data;
    TodoService.token = access_token;

    fetchTodos();
  }, [data]);

  return (
    <Box minH="100vh">
      <VStack width="full" spacing={4}>
        <TodoForm onSubmit={addTodo} />
        <TodoList todos={todos} onDelete={deleteTodo} onUpdate={updateTodo} />
      </VStack>
    </Box>
  );
}

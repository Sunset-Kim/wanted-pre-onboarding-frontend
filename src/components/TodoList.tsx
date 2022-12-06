import { List, ListItem, Text } from "@chakra-ui/react";

import { DeleteTodoParams, ITodo, UpdateTodoParams } from "../types/todo.type";
import NoContents from "./NoContents";
import TodoItem from "./TodoItem";

interface TodoListProps {
  todos?: ITodo[];
  onUpdate: (params: UpdateTodoParams) => void;
  onDelete: (params: DeleteTodoParams) => void;
}

export default function TodoList({ todos, onDelete, onUpdate }: TodoListProps) {
  if (!todos || todos.length === 0) {
    return (
      <NoContents>
        <Text>할일을 추가해보세요</Text>
      </NoContents>
    );
  }

  return (
    <List width="full" spacing={2}>
      {todos.map((todo) => (
        <ListItem key={todo.userId + todo.id}>
          <TodoItem todo={todo} onDelete={onDelete} onUpdate={onUpdate} />
        </ListItem>
      ))}
    </List>
  );
}

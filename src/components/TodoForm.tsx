import { Button, Flex, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React, { ChangeEvent, FormEvent, useState } from "react";
import { AddTodoParams } from "../types/todo.type";

interface TodoFormProps {
  onSubmit: (params: AddTodoParams) => void;
}

function TodoForm({ onSubmit }: TodoFormProps) {
  const [todo, setTodo] = useState("");
  const isInValid = todo.trim() === "";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setTodo(e.target.value);
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (isInValid) return;
    onSubmit({ todo });
    setTodo("");
  };

  return (
    <FormControl as="form" onSubmit={handleSubmit}>
      <FormLabel>할일</FormLabel>
      <Flex>
        <Input
          type="text"
          name="todos"
          placeholder="할일을 입력하세요"
          value={todo}
          onChange={handleChange}
          borderRightRadius="0"
        />
        <Button disabled={isInValid} colorScheme="green" borderLeftRadius="0" type="submit">
          추가
        </Button>
      </Flex>
    </FormControl>
  );
}

export default TodoForm;

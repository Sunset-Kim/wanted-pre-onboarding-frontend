import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Checkbox, Flex, FormControl, FormLabel, Input, VisuallyHidden, VStack } from "@chakra-ui/react";
import { ChangeEvent, useState } from "react";
import { DeleteTodoParams, ITodo, UpdateTodoParams } from "../types/todo.type";

interface TodoItemProps {
  todo: ITodo;
  onUpdate: (params: UpdateTodoParams) => void;
  onDelete: (params: DeleteTodoParams) => void;
}
export default function TodoItem({ todo, onUpdate, onDelete }: TodoItemProps) {
  const { isCompleted, todo: title, id } = todo;

  const [newText, setNewText] = useState(title);
  const [newIsComplete, setNewIsComplete] = useState(isCompleted);
  const [isEdit, setIsEdit] = useState(false);

  // local state
  const openEdit = () => setIsEdit(true);
  const closeEdit = () => setIsEdit(false);

  const handleCancel = () => {
    closeEdit();
    setNewText(title);
    setNewIsComplete(isCompleted);
  };
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
    closeEdit();
  };
  const handleDelete = (id: number) => {
    onDelete({ id });
  };

  return (
    <VStack spacing={4}>
      <Flex mr={2} alignItems="center">
        <FormControl flex="0.3" flexBasis="3">
          <Flex alignItems="center" justifyContent="center">
            <FormLabel fontSize="xs" m="0" mr={1}>
              {(isEdit ? newIsComplete : isCompleted) === true ? "완료" : "미완료"}
            </FormLabel>
            <Checkbox
              name="isComplete"
              size="lg"
              isChecked={isEdit ? newIsComplete : isCompleted}
              isDisabled={!isEdit}
              onChange={toggleCompelte}
            />
          </Flex>
        </FormControl>

        <FormControl flex={1}>
          <VisuallyHidden>
            <FormLabel>할일입력</FormLabel>
          </VisuallyHidden>
          <Input
            type="text"
            name="title"
            value={isEdit ? newText : title}
            disabled={!isEdit}
            onChange={handleTextChange}
          />
        </FormControl>
      </Flex>

      <Flex w="full" gap={2} justifyContent="flex-end">
        {!isEdit && (
          <Button type="button" onClick={() => openEdit()}>
            <VisuallyHidden>수정모드</VisuallyHidden>
            <EditIcon />
          </Button>
        )}

        {isEdit && (
          <Flex gap={1} mr={1}>
            <Button type="submit" colorScheme="green" onClick={() => handleEdit(id)}>
              완료
            </Button>
            <Button type="button" colorScheme="blackAlpha" onClick={handleCancel}>
              취소
            </Button>
          </Flex>
        )}
        <Button colorScheme="red" onClick={() => handleDelete(id)}>
          <VisuallyHidden>삭제</VisuallyHidden>
          <DeleteIcon />
        </Button>
      </Flex>
    </VStack>
  );
}

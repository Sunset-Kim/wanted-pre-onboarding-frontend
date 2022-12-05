import React, { ChangeEvent, SyntheticEvent, useState } from "react";

interface TodoFormProps {
  onSubmit: (value: string) => void;
}

function TodoForm({  onSubmit }: TodoFormProps) {
  const [value, setValue] = useState("");
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value);
  
  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim()) return;
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        할일
        <input type="text" name="todos" placeholder="할일을 입력하세요" value={value} onChange={handleChange} />
      </label>
      <button type="submit">추가</button>
    </form>
  );
}

export default TodoForm;

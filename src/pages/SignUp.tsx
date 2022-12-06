import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const validation = {
  id: (value: string) => value.includes("@"),
  password: (value: string) => value.length >= 8,
};

function SignUp() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const { isLoading, isError, data, signIn, signUp, error } = useAuth();

  const isPass = validation["id"](id) && validation["password"](password);

  useEffect(() => {
    if (!data) {
      return;
    }
    navigate("/todo");
  }, [data]);

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPass) {
      return;
    }

    signIn({ email: id, password });
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    if (name === "id") {
      setId(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  };

  return (
    <div>
      <div>
        <p>{error?.message}</p>
        <form onSubmit={handleSubmit}>
          <label>
            <span>Id</span>
            <input type="text" name="id" value={id} onChange={handleChange} />
          </label>
          <label>
            <span>Password</span>
            <input type="password" name="password" value={password} onChange={handleChange} />
          </label>
          <button disabled={!isPass} type="submit">
            로그인하기
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;

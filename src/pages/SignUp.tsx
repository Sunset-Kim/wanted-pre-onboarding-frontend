import { ChangeEvent, SyntheticEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import APP_CONFIG from "../app-config";
import LocalStorage from "../utils/localstorage";

const { JWT_STORAGE_KEY } = APP_CONFIG;

const validation = {
  id: (value: string) => value.includes("@"),
  password: (value: string) => value.length >= 8,
};

function SignUp() {
  const navigate = useNavigate();
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const isPass = validation["id"](id) && validation["password"](password);

  useEffect(() => {
    // TODO
    const JWT = LocalStorage.getItem(JWT_STORAGE_KEY);
    if (JWT) {
      console.log("있으니까 router");
    }
    console.log("없으니까 현재그대로");
  }, []);

  const handleSubmit = (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isPass) {
      return;
    }

    // TODO: api 호출 전송
    console.log(`API:login or signup ${id}, ${password}`);

    // suces navigate

    // error error처리
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

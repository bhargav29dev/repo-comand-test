import { useEffect, useState } from "react";
import useDebounce from "../hooks/useDebounce";
import TodoApp from "../components/TodoApp";

export default function Home() {
  const [data, setData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const debounceVal = useDebounce(searchInput, 0);

  useEffect(() => {
    const url = debounceVal
      ? `https://jsonplaceholder.typicode.com/users?name=${debounceVal}`
      : "https://jsonplaceholder.typicode.com/users";
    const controller = new AbortController();

    const getDta = async () => {
      try {
        const res = await fetch(url, {
          signal: controller.signal,
        });
        const resData = await res.json();
        console.log(debounceVal);
        setData(resData);
      } catch (error) {
        if (error.name === "AbortError") {
          console.log("api cancelled ...");
        } else {
          console.log("api error");
        }
      }
    };

    getDta();

    return () => controller.abort();
  }, [debounceVal]);

  return (
    <>
      <h1> Home Page </h1>

      <TodoApp />

      <input
        type="text"
        name="searchInput"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <ul>
        {data.map((user) => {
          return <li key={user.id}> {user.name} </li>;
        })}
      </ul>
    </>
  );
}

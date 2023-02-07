import { useCallback, useState } from "react";
import Link from "next/link";
import ListItem from "@/components/ListItem";
import { useRouter } from "next/router";

export default function Create() {
  const [items, setItems] = useState([]);
  const router = useRouter();

  function addItem() {
    const array = [...items];
    array.push({ name: "", description: "" });
    setItems(array);
  }

  const deleteItem = (index) => {
    const array = items;
    array.splice(index, 1);
    setItems([...array]);
  };

  const handleChangeInput = (e) => {
    const index = Number(e.target.id.substring(4));
    const array = items;
    array[index].name = e.target.value;
    setItems([...array]);
  };

  const handleChangeText = (e) => {
    const index = Number(e.target.id.substring(4));
    console.log(e.target.id.substring(4));
    const array = items;
    array[index].description = e.target.value;
    setItems([...array]);
  };

  function submit() {
    const listName = document.getElementById('name');
    
    items.forEach(element => {

    })
    console.log(items);
  }

  return (
    <div className="h-screen ">
      <h1 className="text-center mt-5 mb-10 text-2xl">Create a TodoList</h1>
      <div className="flex flex-col justify-center space-y-5">
        <div className="mx-auto space-x-3">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-input text-violet-900  p-2 rounded "
          />
        </div>

        <div className="flex flex-col mx-auto space-y-5">
          {items.map((element, index) => (
            <ListItem
              index={index}
              item={element}
              deleteItem={deleteItem}
              handleChangeInput={handleChangeInput}
              handleChangeText={handleChangeText}
              key={index}
            />
          ))}

          <button
            type="button"
            className="block mx-auto px-3 py-1 rounded  bg-green-900"
            onClick={addItem}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
          <br />
          <div className="flex justify-center">
            <button
              type="button"
              onClick={submit}
              className="mx-auto bg-purple-900 p-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <br />
    </div>
  );
}

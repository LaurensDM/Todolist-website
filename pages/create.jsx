import { useCallback, useState } from "react";
import Link from "next/link";
import ListItem from "@/components/ListItem";
import { useRouter } from "next/router";
import Modal from "@/components/Modal";

export default function Create() {
  const [items, setItems] = useState([]);
  const router = useRouter();

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

  function save(list){
    const array = list.filter((item) => item.trim() !== "")
    console.log(array);
    setItems(array);
  }

  function submit(e) {
    e.preventDefault();
  }

  return (
    <div className="h-screen ">
      <h1 className="text-center mt-5 mb-10 text-2xl">Create a TodoList</h1>
      <form onSubmit={submit} className="flex flex-col justify-center space-y-5">
        <div className="mx-auto space-x-3">
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-input text-violet-900  p-2 rounded "
            required
          />
        </div>

        <div className="flex flex-col mx-auto space-y-5 border-emerald-100">
          {items.map((element, index) => (
            <ListItem
              index={index}
              item={element}
              deleteItem={deleteItem}
              key={index}
            />
          ))}

          <Modal submit={save} />
          <br />
          <div className="flex justify-center">
            <button
              type="submit"
              className="mx-auto bg-purple-900 p-2 rounded"
            >
              Save Changes
            </button>
          </div>
        </div>
      </form>
      <br />
    </div>
  );
}

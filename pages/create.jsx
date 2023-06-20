"use client";

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

  // const handleChangeInput = (e) => {
  //   const index = Number(e.target.id.substring(4));
  //   const array = items;
  //   array[index].name = e.target.value;
  //   setItems([...array]);
  // };

  function save(list){
    const array = list.filter((item) => item !== "" && item).map((item) => { description: item });
    console.log(array);
    setItems(array);
  }

  async function submit(e) {
    e.preventDefault();
    console.log(e.target.name.value);
    console.log(e.target.description.value);
    const name = e.target.name.value;
    const description = e.target.description.value;
    const list = await fetch("/api/list", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name, description}),
    });

     const listJson = await list.json();
    console.log(listJson);
    const newItems = []
    for (const item of items) {
      const response = await fetch("/api/items", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ listId: listJson.list.id, description: item.description }),
      });
      const json = await response.json();
      newItems.push(json);
    }  
    console.log(newItems);
    router.push(`/`);
  }

  return (
    <div className="h-screen ">
      <h1 className="text-center mt-5 mb-10 text-2xl">Create a TodoList</h1>
      <form onSubmit={submit} className="flex flex-col justify-center gap-12">
        <div className=" space-x-3 flex flex-col justify-center">
          <label htmlFor="name" className="text-center">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="form-input text-violet-900  p-2 rounded text-center place-self-center"
            required
            placeholder="Enter a name for your list"
          />
        </div>

        <div className="space-x-3 flex flex-col justify-center">
          <label htmlFor="description" className="text-center">Description</label>
          <textarea
            id="description"
            name="description"
            className="form-textarea text-violet-900 rounded w-1/3 h-28 place-self-center"
            placeholder="Enter a description for your list (optional)"
          />
        </div>

        <div className="flex flex-col gap-5 ">
          {items.map((element, index) => (
            <ListItem
              index={index}
              item={element}
              deleteItem={deleteItem}
              key={index}
            />
          ))}
        </div>
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
        
      </form>
      <br />
    </div>
  );
}

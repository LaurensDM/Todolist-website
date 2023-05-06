import useList from "@/pages/api/list";
import { useEffect, useState } from "react";

export default function List(){
  const [items,setItems] = useState(["guy","meh","moh"]);

  // useEffect(() => {
  //   const fetchData = async() => {
  //   const data = await listApi.getById(1);
  //   console.log(data)
  // }
  // fetchData();
  // },[])
  return(
    <div className="h-screen">
      <div className="flex flex-col">
      {items.map((item) => (
        <span className="mx-auto">{item}</span>
      ))}
      </div>
    </div>
  );
}
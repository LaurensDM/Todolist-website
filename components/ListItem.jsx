export default function ListItem({ index, item, deleteItem }) {
  return (
<div className="flex justify-center gap-2">
      <div className="align-items-center flex flex-row  w-1/3 justify-evenly p-5 rounded-md bg-gray-800 border-2 border-violet-700 gap-3">
        <div htmlFor="item" className="my-auto me-auto">{index + 1}.</div>
        <p className=" text-center me-auto">{item.description}</p>
        
      </div>
      <button
          type="button"
          className="px-3 py-1 bg-red-700 rounded"
          onClick={() => deleteItem(index)}
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
              d="M12 9.75L14.25 12m0 0l2.25 2.25M14.25 12l2.25-2.25M14.25 12L12 14.25m-2.58 4.92l-6.375-6.375a1.125 1.125 0 010-1.59L9.42 4.83c.211-.211.498-.33.796-.33H19.5a2.25 2.25 0 012.25 2.25v10.5a2.25 2.25 0 01-2.25 2.25h-9.284c-.298 0-.585-.119-.796-.33z"
            />
          </svg>
        </button>
</div>
)
}
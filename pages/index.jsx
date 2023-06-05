
import { useUser } from "@auth0/nextjs-auth0/client";
import { Inter } from "@next/font/google";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col justify-center h-screen  bg-gradient-to-b from-black to-purple-900 ">
        <div className="m-auto p-5 rounded backdrop-blur-md bg-black/50">
          <span className="font-mono bg-clip-text text-6xl ">TodoList</span>
        </div>
        <div className="flex flex-wrap flex-row space-x-5 mb-auto mx-auto">
          <div className="grow max-w-[50%] ">

            <div className="backdrop-blur-md bg-white/10 rounded-lg p-5 cursor-pointer hover:scale-125 hover:text-black transition duration-500" onClick={() => router.push("/create")}>
              <p className="break-all text-xs max-w-full max-h-full">Create TodoList</p>
            </div>
          </div>
          <div className=" max-w-[50%]">
            <div className="max-w-fit backdrop-blur-md bg-white/10 rounded-lg p-5 cursor-pointer hover:scale-125 hover:text-black transition duration-500" onClick={() => router.push('/view')}>
              <p className="break-all text-xs max-w-full max-h-full">View TodoList</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

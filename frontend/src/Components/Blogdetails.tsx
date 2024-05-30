import { Appbar } from "./Appbar";
import { Blog } from "../hooks";
import { Avatar } from "./BlogCard";

export const Blogdetails = ({ blog }: { blog: Blog }) => {
  return (
    <div>
      <Appbar />
      <div className="flex justify-center">
        <div className="grid grid-cols-12 px-10 w-full mt-10 max-w-screen-xl ">
          <div className="grid col-span-8 ">
            <div className="text-5xl font-bold">{blog.title}</div>
            <div className="text-sm font-medium text-slate-600 mt-5">
              Post on 23 December 2023
            </div>
            <div className="text-base pt-5">{blog.content}</div>
          </div>
          <div className="grid col-span-4">
            <div className="font-medium text-slate-600">Author</div>
            <div className="flex w-full">
              <div className="pr-4 pl-2 flex flex-col justify-center">
                <Avatar size="big" name={blog.author.name || "Anonymous"} />
              </div>
              <div>
                <div className="text-xl font-semibold">
                  {blog.author.name || "Anonymous"}
                </div>
                <div className="pt-1 text-slate-500">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi,
                  autem.
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

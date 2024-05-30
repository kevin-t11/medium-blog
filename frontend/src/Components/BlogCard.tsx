import { Link } from "react-router-dom";

interface BlogCardProps {
  authorName: string,
  title: string,
  content: string,
  pushlishedDate: string,
  id : string,
}

export const BlogCard = ({
  id,
  authorName,
  title,
  content,
  pushlishedDate,
}: BlogCardProps) => {
  return (
    <Link to={`${id}`}>
      <div className="border-b p-5 border-slate-100 w-screen max-w-screen-md">
        <div className="flex">
          <div className="flex flex-col justify-center">
            <Avatar size={"small"} name={authorName} />
          </div>
          <div className="flex flex-col justify-center pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-medium">{authorName}</div>

          <div className="flex flex-col justify-center pl-2">
            <Circle />
          </div>
          <div className="pl-2 font-extralight"> {pushlishedDate}</div>
        </div>
        <div className="font-semibold text-lg">{title}</div>
        <div className="text-sm">
          {content.length > 100 ? `${content.slice(0, 100)}...` : content}
        </div>
        <div className="text-sm pt-2 font-light">{`${Math.ceil(
          content.length / 100
        )} min(s) read `}</div>
      </div>
    </Link>
  );
};

export function Avatar({
  name,
  size = "small",
}: {
  name: string;
  size: "big" | "small";
}) {
  return (
    <div
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full bg-gray-600 ${
        size === "small" ? "w-5 h-5" : "w-8 h-8"
      }`}
    >
      <span
        className={` ${
          size === "small" ? "text-xs" : "text-base"
        } bg-center pb-[2%] text-gray-600 dark:text-gray-300`}
      >
        {name[0].toUpperCase()}
      </span>
    </div>
  );
}

function Circle() {
  return <div className="rounded-full w-1 h-1 bg-slate-500"></div>;
}

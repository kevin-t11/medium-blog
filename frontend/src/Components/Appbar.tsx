import { Link } from "react-router-dom";
import { Avatar } from "./BlogCard";

export const Appbar = () => {
  return (
    <div className="flex justify-between px-10 py-4 mb-5 border-b">
      <Link to={"/blog"}>
        <div className="flex flex-col justify-center  text-lg font-bold cursor-pointer">
          Medium
        </div>
      </Link>
      <div>
        <Avatar name="kevin thumabr" size={"big"} />
      </div>
    </div>
  );
};

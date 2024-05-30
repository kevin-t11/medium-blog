import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { Blogdetails } from "../Components/Blogdetails";

export const Blog = () => {
  const { id } = useParams(); 
  const { loading, blog } = useBlog({ id: id || "" });

  // console.log(blog)

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>No blog found</div>;
  }

  return (
    <div>
      <Blogdetails blog={blog}/>
    </div>
  );
};

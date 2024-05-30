import { useEffect, useState } from "react";
import axios from 'axios';

export interface Blog {
    content: string;
    title: string;
    id: string;
    author: {
        name: string;
    };
}

export const useBlogs = () => {
    const [loading, setLoading] = useState(true);
    const [blogs, setBlogs] = useState<Blog[]>([]);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/blog/bulk`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });

                setBlogs(response.data.blogs);
            } catch (error) {
                console.error("Error while getting the blogs:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    return {
        loading,
        blogs,
    };
};


export const useBlog = ({ id }: { id: string }) => {
    const [loading, setLoading] = useState(true);
    const [blog, setBlog] = useState<Blog>();

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/v1/blog/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                }); 
                setBlog(response.data.blog);
            } catch (error) {
                console.error("Error while getting the blogs from the server !!")
            } finally {
                setLoading(false);
            }
        }

        fetchBlog();
    }, [id])

    return {
        loading,
        blog,
    }
}


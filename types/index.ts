import axios from "axios";

export default interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  tag?: string[];
  createdAt: string;
}
export default interface Props {
  id: number;
  title: string;
  content: string;
  image: string;
  tag?: string[];
  createdAt: string;
}


export default async function fetchBlogs() {
    const  response = await axios.get("/api/blogs?page=${currentPage}&limit=${LIMIT}&search=${searchQuery}")
    console.log(response.data , "data")

} 

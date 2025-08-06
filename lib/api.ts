export async function getBlogs(search = "", page = 1) {
  const res = await fetch(`/api/blogs?search=${search}&page=${page}`);
  return res.json();
}

export async function addBlog(blog) {
  const res = await fetch("/api/blogs", {
    method: "POST",
    body: JSON.stringify(blog),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
}

export async function deleteBlog(id) {
  await fetch(`/api/blogs/${id}`, {
    method: "DELETE",
  });
}

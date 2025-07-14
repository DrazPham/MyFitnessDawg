import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import { useParams } from "react-router-dom";
import rehypeRaw from "rehype-raw";
import { db } from "src/firebase/index.jsx";
import { doc, getDoc } from "firebase/firestore";
import timestampToDate from "components/functions/timestampToDate";

function BlogDetails() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      const docRef = doc(db, "blog", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const blogData = docSnap.data();
        if (blogData.meta?.date) {
          blogData.meta.date = timestampToDate(blogData.meta.date);
        }
        setBlog(blogData);
      }
    };

    fetchBlog();
  }, [id]);

  if (!blog) {
    return <div>Loading...</div>;
  }
  return (
    <div className="SingleBlogContainer">
      <h2 className="SingleBlogTitle">{blog.title}</h2>
      <div className="SingleBlogInfo">
        <span>{timestampToDate(blog.meta?.publishedDate)}</span>|
        <span>{blog.meta?.timeRead} minutes</span>
      </div>

      <img
        className="SingleBlogImage"
        src={blog.image}
        alt={blog.title || "Blog Banner"}
      />

      <div className="SingleBlogDetail">
        {blog.content.map((e, index) => (
          <div className="SingleBlogComponents" key={index}>
            {e.headline && <h3>{e.headline}</h3>}
            {e.image && (
              <img
                className="SingleBlogComponentsImage"
                src={e.image}
                alt={`Content Image ${index}`}
              />
            )}
            {
              <ReactMarkdown rehypePlugins={[rehypeRaw]}>
                {e.text}
              </ReactMarkdown>
            }
          </div>
        ))}
      </div>

      <div className="SingleBlogCategoryGroup">
        <h2>Categories:</h2>
        <ul className="SingleBlogCategoryList">
          {blog.tags.map((e, index) => (
            <li key={index} className="SingleBlogListElements">
              {e}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default BlogDetails;

import { createContext } from 'react';
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { useParams } from "react-router-dom";
import SingleBlog from "./components/single-blog";
import "assets/css/blog/index.css"
import { doc, getDoc } from 'firebase/firestore';  
import { db } from "src/firebase/index.jsx";




const BlogContext = createContext({});

function timestampToDate(timestamp) {  
    if (timestamp && timestamp.seconds !== undefined) {  
        const date = new Date(timestamp.seconds * 1000);  
        return date.toLocaleDateString('en-US', {  
            year: 'numeric',  
            month: 'long',  
            day: 'numeric',  
        });  
    }  
    return null;  
};  

function newLineFix(text) {
    return text.replace(/\\n/g, '  \n');  // Markdown line break
}

function SingleBlogPage() {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);

    useEffect(() => {
        const fetchBlog = async () => {
            const docRef = doc(db, 'blog', id);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
                const blogData = docSnap.data();
                if (blogData.meta.date) {
                    blogData.meta.date = timestampToDate(blogData.meta.date);
                }
                blogData.content = blogData.content.map((e) => {
                    if (e.text) {
                        e.text = newLineFix(e.text);
                    }
                    return e;
                });
                setBlog(blogData);
            } else {
                console.log('No such document!');
            }
        };

        fetchBlog();
    }, [id]);

    if (!blog) {
        return <div>Loading...</div>;
    }


    return (
        <div className="SingleBlogContainer">
            <h2 style={{margin:"0 0 30px",textAlign:"center"}}>{blog.title}</h2>
            <div style={{
                display:"flex",
                alignItems:"center",
                justifyContent:"center",
                gap:"20px",
                fontSize:"24px"
            }}>
                <span style = {{fontSize:"24px"}}>{timestampToDate(blog.meta.publishedDate)}</span>
                -
                <span style = {{fontSize:"24px"}}>{blog.meta.timeRead} minutes</span>
            </div>
            <img src={blog.image}  style={{height:"100%", borderRadius:"50px",width:"100%"}} />
            <div style={{margin:"10px 30px 0"}}>
                {blog.content.map((e, index) => (
                    <div key={index} style={{margin:"10px 0"}}>
                        {<h3 >{e.headline}</h3>}
                        {e.image && <img src={e.image} style={{borderRadius:"20px"}} alt={`Content Image ${index}`} />}
                        {e.text && (
                  <ReactMarkdown>
                    {e.text.replace(/<br\s*\/?>/gi, '\n\n')}
                  </ReactMarkdown>
                )}
                    </div>
                ))}
            </div>
        <div style={{margin:"0 30px "}}>
            <h2>Categories:</h2>
            <ul style={{display:"flex",gap:"20px",margin:"10px 0"}}>
            {blog.tags.map((e, index) => (
                <li key={index} style={{padding:"10px 20px",backgroundColor:"#787c91",color:"white",borderRadius:"30px"}}> {e} </li>
            ))}
            </ul>
        </div>
        </div>
    );
}
export { BlogContext };
export default SingleBlogPage;
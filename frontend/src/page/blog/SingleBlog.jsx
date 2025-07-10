import { createContext } from 'react';
import { useState, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import { useParams } from "react-router-dom";
import SingleBlog from "./components/single-blog";
// import { doc, getDoc } from 'firebase/firestore';  
// import { db } from 'fbase/Firebase';  



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

// function SingleBlogPage() {
//     const { id } = useParams();
//     const [blog, setBlog] = useState(null);

//     useEffect(() => {
//         const fetchBlog = async () => {
//             const docRef = doc(db, 'blog', id);
//             const docSnap = await getDoc(docRef);

//             if (docSnap.exists()) {
//                 const blogData = docSnap.data();
//                 if (blogData.meta.date) {
//                     blogData.meta.date = timestampToDate(blogData.meta.date);
//                 }
//                 blogData.content = blogData.content.map((e) => {
//                     if (e.text) {
//                         e.text = newLineFix(e.text);
//                     }
//                     return e;
//                 });
//                 setBlog(blogData);
//             } else {
//                 console.log('No such document!');
//             }
//         };

//         fetchBlog();
//     }, [id]);

//     if (!blog) {
//         return <div>Loading...</div>;
//     }


//     return (
//         <div style={{marginTop:"90px"}} className="container">
//             <h2 style={{margin:"0 0 30px"}}>{blog.title}</h2>
//             <img src={blog.image}  style={{height:"100%", borderRadius:"50px",width:"100%"}} />
//             <div style={{margin:"10px 30px 0"}}>
//                 {blog.content.map((e, index) => (
//                     <div key={index} style={{margin:"10px 0"}}>
//                         {<h3>{e.headline}</h3>}
//                         {e.image && <img src={e.image} style={{borderRadius:"20px"}} alt={`Content Image ${index}`} />}
//                         {e.text && (
//                             <ReactMarkdown>{e.text}</ReactMarkdown>
//                         )}
//                     </div>
//                 ))}
//             </div>
//         {/* <div style={{margin:"0 30px "}}>
//             <h2>Categories:</h2>
//             <ul style={{display:"flex",gap:"20px",margin:"10px 0"}}>
//             {blog.tags.map((e, index) => (
//                 <li key={index} style={{padding:"10px 20px",backgroundColor:"#787c91",color:"white",borderRadius:"30px"}}> {e} </li>
//             ))}
//             </ul>
//         </div> */}
//         </div>
//     );
// }

// export default SingleBlogPage;



function SingleBlogPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    const staticBlogs = [
      {
        id: '1',
        title: 'Mastering React Hooks',
        image: 'https://via.placeholder.com/800x450?text=React+Hooks',
        meta: {
          date: '2024-07-10',
          category: 'React'
        },
        tags: ['React', 'Hooks', 'Frontend'],
        content: [
          {
            headline: 'Understanding useEffect',
            text: '## useEffect explained\nHooks changed everything in React!',
            image: 'https://via.placeholder.com/400x250?text=useEffect'
          },
          {
            headline: 'Cleanup Functions',
            text: '### Always clean up\nHere’s how to do it properly.',
            image: 'https://via.placeholder.com/400x250?text=Cleanup'
          }
        ]
      },
      {
        id: '2',
        title: 'CSS Grid vs Flexbox',
        image: 'https://via.placeholder.com/800x450?text=CSS+Grid+vs+Flexbox',
        meta: {
          date: '2024-06-25',
          category: 'CSS'
        },
        tags: ['CSS', 'Flexbox', 'Grid'],
        content: [
          {
            headline: 'CSS Grid is Powerful',
            text: '## Layout Mastery\nGrid lets you create two-dimensional layouts with ease.',
            image: 'https://via.placeholder.com/400x250?text=CSS+Grid'
          }
        ]
      }
    ];

    const selectedBlog = staticBlogs.find(b => b.id === id);
    setBlog(selectedBlog || null);
  }, [id]);

  if (!blog) {
    return <div>Loading or blog not found...</div>;
  }

  return (
    <div style={{ marginTop: '90px' }} className="container">
      <h2 style={{ margin: '0 0 30px' }}>{blog.title}</h2>
      <img src={blog.image} style={{ height: '100%', borderRadius: '50px', width: '100%' }} />
      <div style={{ margin: '10px 30px 0' }}>
        {blog.content.map((e, index) => (
          <div key={index} style={{ margin: '10px 0' }}>
            <h3>{e.headline}</h3>
            {e.image && (
              <img
                src={e.image}
                style={{ borderRadius: '20px' }}
                alt={`Content Image ${index}`}
                onError={e => (e.target.style.display = 'none')}
              />
            )}
            {e.text && <ReactMarkdown>{e.text}</ReactMarkdown>}
          </div>
        ))}
      </div>

      <div style={{ margin: '0 30px' }}>
        <h2>Categories:</h2>
        <ul style={{ display: 'flex', gap: '20px', margin: '10px 0' }}>
          {blog.tags.map((tag, index) => (
            <li
              key={index}
              style={{
                padding: '10px 20px',
                backgroundColor: '#787c91',
                color: 'white',
                borderRadius: '30px'
              }}
            >
              {tag}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export { BlogContext };
export default SingleBlogPage;

import { LazyLoadImage } from "react-lazy-load-image-component";
import PostMeta from "./PostMeta";
import React, { useEffect, useState } from 'react';
// import { collection, getDocs, query,orderBy } from 'firebase/firestore';
import PostTags from "./PostTags";
// import { db } from 'fbase/Firebase';  
import ReactMarkdown from 'react-markdown';
import { useContext } from "react";
import { BlogContext } from "../../SingleBlog";
function BlogDetails() {
  const [blogContent, setBlogContent] = useState([]);

  useEffect(() => {
    const staticContent = [
      {
        title: 'Mastering React Hooks',
        image: 'https://via.placeholder.com/800x450?text=Blog+Header',
        content: [
          {
            text: '## useEffect: A Deep Dive\nLet\'s explore how useEffect works...',
            image: 'https://via.placeholder.com/400x250?text=useEffect'
          },
          {
            text: '### Handling Cleanup\nAlways return a cleanup function when needed.',
            image: 'https://via.placeholder.com/400x250?text=Cleanup'
          }
        ],
        tags: ['React', 'Hooks', 'Frontend']
      }
    ];

    setBlogContent(staticContent);
  }, []);

  if (blogContent.length === 0) {
    return <div>Loading...</div>;
  }

  const blogInfo = blogContent[0];

  return (
    <div className="single-post-content-wrap">
      <PostMeta />
      <div className="entry-content">
        <h3>{blogInfo.title}</h3>
        <img
          style={{ aspectRatio: '16/9', objectFit: 'cover', borderRadius: '20px' }}
          src={blogInfo.image}
          alt="Blog Header"
        />
        {blogInfo.content.map((item, index) => (
          <div key={index}>
            <ReactMarkdown breaks>{item.text}</ReactMarkdown>
            <img
              src={item.image}
              alt={`Image ${index + 1}`}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          </div>
        ))}
        <PostTags tags={blogInfo.tags} />
      </div>
    </div>
  );
}



export default BlogDetails;

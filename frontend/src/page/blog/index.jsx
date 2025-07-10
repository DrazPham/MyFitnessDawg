import { createContext } from "react";
import { useState, useEffect } from "react";
import Carousel from "src/components/common/Carousel";
import GridBlog from "./components/grid-blog";

// import { collection, getDocs, query,orderBy } from 'firebase/firestore';
// import { db } from 'fbase/Firebase';

const BlogGridContext = createContext([]);

const timestampToDate = (timestamp) => {
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

function timestampToDateString(seconds) {
	const date = new Date(seconds * 1000); // Convert seconds to milliseconds
	return date.toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		second: '2-digit'
	});
}


function BlogGridPage() {

	const [gridBlogData, setGridBlogData] = useState([]);
	
	useEffect(() => {
    const staticBlogData = [
      {
        id: '1',
        title: 'React Carousel Tips',
        category: 'React',
        meta: {
          category: 'React',
          date: timestampToDateString(1720550400) // Example UNIX timestamp (July 10, 2024)
        }
      },
      {
        id: '2',
        title: 'CSS Grid vs Flexbox',
        category: 'CSS',
        meta: {
          category: 'CSS',
          date: timestampToDateString(1717968000) // Example date
        }
      },
      {
        id: '3',
        title: 'Firebase Auth Guide',
        category: 'Firebase',
        meta: {
          category: 'Firebase',
          date: timestampToDateString(1715385600)
        }
      }
    ];

    setGridBlogData(staticBlogData);
  }, []);


	const imageList = [
    'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
    'https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTmPdLdb_52jNscHnxCz7Bm14D4S1GgDSG0a-AYvU_Xs6esSWfVa2Fe-9MBBI1iSq-YMcyWee70VLA2pxSJ-3XRXAtTCLcbMzVLB_mbHw',
    'https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630',
];

	return (
		<BlogGridContext.Provider value={gridBlogData}>
			<Carousel images={imageList}/>
			<GridBlog />
		</BlogGridContext.Provider>
	);
}

export default BlogGridPage;
export { BlogGridContext }

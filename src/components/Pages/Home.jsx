import React, {useState, useEffect} from 'react'
import appwriteService from '../../appwrite/config'
import Container from '../container/Container'
import PostCard from '../PostCard'
import Loader from '../Loader'

function Home() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // useEffect( () => {
    //     setIsLoading(Loader);
    //     appwriteService.getPosts().then((posts) => {
            
    //         if (posts) {
    //             setIsLoading(false); 
    //             setPosts(posts.documents)
                
    //         }
    //     })
    // }, [])
    useEffect(() => {
        setIsLoading(true); // Set isLoading to true when fetching posts
        appwriteService.getPosts().then((response) => {
            setIsLoading(false); 
            if (response) {
                setPosts(response.documents);
            }
        }).catch(error => {
            console.log("Error fetching posts:", error);
            setIsLoading(false);
        });
    }, []);

    if (posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                Login to read posts
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }

    
    return (
        <div className='w-full py-8'>
            {isLoading && <Loader />} 
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div className='p-2 w-full sm:w-1/4' key={post.$id} >
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}


export default Home
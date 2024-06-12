import React, {useState, useEffect} from 'react'
import appwriteService from '../../appwrite/config'
import PostCard from '../PostCard'
import Container from '../container/Container'
import Loader from '../Loader'


function AllPost() {
    const [posts, setPosts] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    useEffect( () => {
        setIsLoading(Loader)
        appwriteService.getPosts([])
        .then((posts) => {
            if (posts) {
                setIsLoading(false)
                setPosts(posts.documents)
            }
            }) 
    }, [])


  return (
    <div className='w-full py-8'>
        {isLoading && <Loader />}
        <Container>
            <div className='flex flex-wrap'>
                {
                    posts.map( (post) => (
                        <div className='p-2 w-full sm:w-1/4' key={post.$id}>
                            <PostCard {...post} />
                        </div>
                    ))
                }
            </div>
        </Container>
    </div>
  )
}

export default AllPost
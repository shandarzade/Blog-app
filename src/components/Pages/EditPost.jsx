import React, {useEffect, useState} from 'react'
import Container from '../container/Container'
import PostForm from '../Post-form/PostForm'
import appwriteService from '../../appwrite/config'
import { useNavigate, useParams } from 'react-router-dom'
import Loader from '../Loader'

function EditPost() {
    const [post, setPosts] = useState()
    const {slug} = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState()

    useEffect( () => {
        setIsLoading(Loader)
        if (slug) {
            appwriteService.getPost(slug).then( (post) => {
                if (post) {
                    setPosts(post)
                }
            }).finally(() => setIsLoading(false));
        }else{
            setIsLoading(false)
            navigate('/')
        }
    }, [slug, navigate])

    if (isLoading) {
        return <Loader />;
    }

    return (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    );
}

export default EditPost
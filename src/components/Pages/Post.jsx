import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from '../../appwrite/config'
import Button from "../Button";
import Container from "../container/Container";
import parse from "html-react-parser";
import { useSelector } from "react-redux";
import Loader from "../Loader";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();
    const [imageSrc, setImageSrc] = useState(null);
    const [isLoading, setIsLoading] = useState(false)
    // const [isLoading, setIsLoading] = useState()

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        setIsLoading(true); // Set loading state to true when data fetching begins
        
        if (slug) {
            appwriteService.getPost(slug)
                .then((post) => {
                    setIsLoading(false); // Set loading state to false when data fetching is complete
                    if (post) {
                        setPost(post);
                    } else {
                        navigate("/");
                    }
                })
                .catch((error) => {
                    setIsLoading(false); // Set loading state to false if an error occurs
                    console.error('Error fetching post:', error);
                    navigate("/");
                });
        } else { 
            setIsLoading(false); // Set loading state to false if no slug is provided
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

   
useEffect(() => {
    if (post && post.featuredImage) {
        setIsLoading(true); // Set loading state to true when fetching the image begins
        
        appwriteService.getFilePreview(post.featuredImage)
            .then((src) => {
                setIsLoading(false); // Set loading state to false when the image is fetched successfully
                setImageSrc(src);
            })
            .catch((error) => {
                setIsLoading(false); // Set loading state to false if an error occurs
                console.error('Error fetching image:', error);
            });
    }
}, [post]);

    return post ? (
        <div className="py-8">
            {isLoading && <Loader/>}
            <Container>
                <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
                    {/* <img
                        src={appwriteService.getFilePreview(post.featuredImage)}
                        alt={post.title}
                        className="rounded-xl"
                    /> */}
                    {imageSrc && (
                        <img src={imageSrc} alt={post.title} className='rounded-xl' />
                    )}

                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6">
                    <h1 className="text-2xl font-bold">{post.title}</h1>
                </div>
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}
import React, {useEffect, useState} from 'react'
import appwriteService from '../appwrite/config'
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  const [imageSrc, setImageSrc] = useState(null);

  useEffect( () => {
    async function fetchImage(){
      try {
        const src = await appwriteService.getFilePreview(featuredImage)
        setImageSrc(src)
      } catch (error) {
        alert('Error fetching image:', error);
      }
    }
    fetchImage();
  }, [featuredImage])

  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='w-full justify-center mb-4'>
                {/* <img src={appwriteService.getFilePreview(featuredImage)} alt={title}
                className='rounded-xl' /> */}
                {imageSrc && (
                  <img src={imageSrc} alt={title} className='rounded-xl' />
                )}
            </div>
            <h2
            className='text-xl font-bold'
            >{title}</h2>
        </div>
    </Link>
  )
}

export default PostCard
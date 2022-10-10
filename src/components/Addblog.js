import React, { useState } from 'react'

import { db } from '../Firebase'
import { addDoc,collection } from 'firebase/firestore'
import { useNavigate } from 'react-router'

export const Addblog = ({currentUser}) => {
  const [title,setTitle] = useState('')
  const [description,setDescription] = useState('')
  const blogsCollection = collection(db,"blogs")//init empty blogs collection
  const navigate = useNavigate()
  const addBlogHandler = async()=>{
    const data = {
      author:currentUser.email,
      title,
      description
    }
    await addDoc(blogsCollection,data)
    navigate("/MyBlogs")
  }

  return (
    <>
    
   <div className="container">

  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
    <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" value={currentUser.email} disabled/>

  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Title</label>
    <input type="text" className="form-control" id="exampleInputPassword1" value={title} onChange={(e)=>setTitle(e.target.value)}/>
  </div>
  <div className="mb-3 ">
  <label className="textarea " htmlFor="exampleCheck1">Description</label>
    <textarea rows="10 " className="form-control" id="exampleCheck1" value={description} onChange={(e)=>setDescription(e.target.value)}/>
  </div>
  <button type="submit" className="btn btn-primary" onClick={addBlogHandler}>Add Blog</button>


   </div>
   </>
  )
}

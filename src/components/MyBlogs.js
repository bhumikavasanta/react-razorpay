import React, { useEffect, useState } from 'react'

import { db } from '../Firebase'
import { collection, getDocs,query,where } from '@firebase/firestore'


export default function MyBlogs({currentUser}) {
  const [blogs, setBlogs] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const q = query(collection(db, "blogs"), where("author", "==", currentUser.email))
      const dummy_list = []
      const blogSnapshot = await getDocs(q)
      blogSnapshot.forEach(doc => dummy_list.push(doc.data()))
      setBlogs(dummy_list)
    }
    fetchData()
  }, [blogs])

  return (
    <>
      
      <div className="container">
      <h2>My Blogs</h2>
        {blogs&&blogs.map((blog,index) => (
          <div key={index} className="card my-2 bg-dark">
            <div className="card-body">
              <h5 className="card-title">{blog.title}</h5>
              <p className="card-text">{blog.description}</p>
              <p>{blog.author}</p>
            </div>
          </div>
        ))
        }
    </div>
    </>
  )
}
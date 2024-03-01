import NavBar from '@/components/shared/NavBar'
import React from 'react'

const BlogLayout = ({ children }) => {
    return <>
        <NavBar />
        {children}
    </>
}

export default BlogLayout
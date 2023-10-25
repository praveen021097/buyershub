import React, { useState } from 'react'
import styles from "./Search.module.css"
import {  useNavigate,  } from 'react-router-dom';
const Search = () => {
    const navigate = useNavigate()
    const [keyword,setKeyword] = useState("");
   
    const searchHandler =(e)=>{
        e.preventDefault();
        if(keyword.trim()){
           navigate(`/products/${keyword}`,{replace:true})
        }
        else{
            navigate("/products")
        }
    }
  return (
    <>
    <form action="" className={styles.searchBox} onSubmit={searchHandler}>
        <input type="text" placeholder='Search a product...'  onChange={(e)=>setKeyword(e.target.value)}/>
            <input type="submit" value={"Search"}  />
    </form>
    </>
  )
}

export default Search
import React, {  useRef, useState } from 'react'
import './ImageGenerator.css'
import default_image from '../Assets/AI_image_pic.webp'

const ImageGenerator = () => {

  const [image_url , setImage_url] = useState("/");
  const [loading, setLoading] = useState(false)
  let inputRef = useRef(null)

  const imageGenerator=async()=>{
    if(inputRef.current.value===""){
       return 0;
    }
    setLoading(true);
    const response=await fetch("https://api.openai.com/v1/images/generations",{
          method:"POST",
          headers:{
            "Content-Type":"application/json",
            Authorization : 
            "Bearer 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",
            "User-Agent":"Chrome"
          },
          body:JSON.stringify({
            prompt : `${inputRef.current.value}`,
            n :1,
            size :"512x512",
          })
    });
    let data= await response.json();
    // let dataarray= data.data;
     console.log(data);
    let new_url=(data.data[0].url);
    setImage_url(new_url);
    await setLoading(false);
    // type error  Assignment to constant variable
  }

  return (
    <div className='generator-body'>
      <div className="header">Random Ai Image <span>Generator</span>
      </div>
      <div className="img-loading">
        <div className="prev"> {"<< Prev "}</div>
        <div className="image">
          {/* <img src={image_url} alt="" /> */}
          <img src={image_url==="/"?default_image:image_url} alt="" />
        </div>
        <div className="next">{"Next >> "}</div>
        </div>
        <div className="loading">
          <div className={loading ? "loading-bar-full" : "loading-bar-none"}></div>
          <div className={loading ? "loading-text" :"loading-text-none"}>Loading ...</div>
        </div>
        <div className="search-box">
          <input type="text" ref={inputRef} className="text-input" placeholder='Write conent here..'/>
          <div className="generate-btn" onClick={()=>{imageGenerator()}}>Generate</div>
        </div>
      
    </div>
  )
}

export default ImageGenerator

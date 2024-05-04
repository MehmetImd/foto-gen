import { useState, useRef } from 'react';
import default_image from '../../Assets/gen.jpg';
import { key } from '../../../key';

const ImageGenerator = () => {
  const [imageUrl, setImageUrl]  = useState("/");
  let inputRef = useRef(null);

  const imageGenerator = async () => {
    if(inputRef.current.value==="") {
      return 0;
    }

    console.log(inputRef.current.value);

    const response = await fetch(
      "https://api.openai.com/v1/images/generations",
      {
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Authorization:`Bearer ${key}`,
        },
        body:JSON.stringify({
          prompt: `${inputRef.current.value}`,
          n:1,
          size:"512x512"
        }),
      }
    );
    let data = await response.json();
    console.log(data);
    let data_array = data.data;
    setImageUrl(data_array[0].url)
  };

  return (
    <div className='flex flex-col m-auto items-center mt-6 gap-4'>
        <div className='text-3xl font-medium pb-2 text-white'>
          AI Image <span className='text-pink-700 font-semibold'>Generator</span>
        </div>

        <div className='flex flex-col mb-4'>
          <div className=''>
            <img 
              className='w-[512px] rounded-lg' 
              src={imageUrl === "/" ? default_image : imageUrl} 
              alt="default" />
          </div>
        </div>

        <div 
          className='flex w-[800px] h-9 justify-between items-center rounded-full bg-slate-300'
        >
          
          <input 
            ref={inputRef} 
            type="text" 
            className='z-40 w-[600px] h-9 bg-transparent border-none outline-none text-sm text-black pl-[35px] mr-[35px] placeholder:text-zinc-900 ' placeholder='Specify the image you want.' 
          />

          <div 
            onClick={() => {imageGenerator()}} 
            className='z-50 flex items-center justify-center w-[250px] h-8 mr-[3px] text-sm rounded-full text-white bg-pink-700 cursor-pointer hover:bg-pink-600 transition-all ease-in-out delay-[40]'
          >
            Generate
          </div>
        </div>
    </div>
  )
}

export default ImageGenerator;



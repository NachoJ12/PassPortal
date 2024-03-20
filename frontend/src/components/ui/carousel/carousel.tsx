import React from 'react'
import { Carousel } from 'antd';
import Image from 'next/image';
import imgCarousel from "../../../../public/league-of-legends-worlds-2019-france.jpg"
import imgCarousel1 from "../../../../public/League-of-Legends-Worlds-2019-cover.jpg"
import imgCarousel2 from "../../../../public/League-of-Legends-Worlds-2019-1024x576.jpg"

function CarouselImage() {
    const onChange = (currentSlide:any) => {
      };
  return (
    <Carousel afterChange={onChange} autoplay dotPosition='top' className='carousel-slide'>
      <div>
        <Image src={imgCarousel} alt='logo' className='carousel-image'/>
      </div>
      <div>
      <Image src={imgCarousel1} alt='logo' className='carousel-image'/>
      </div>
      <div>
      <Image src={imgCarousel2} alt='logo' className='carousel-image'/>
      </div>
      <div>
      <Image src={imgCarousel} alt='logo' className='carousel-image'/>
      </div>
    </Carousel>
  )
}

export default CarouselImage;
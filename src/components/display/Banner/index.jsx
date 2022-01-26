import { Box } from '@mui/material';
import Slider from "react-slick";
import { slideBanner, settings } from '../../../constants/data/slidebanner';
import styled from 'styled-components';
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";

function Banner() {
  return (
    <BoxSlide>
      <Slider {...settings}>
        {slideBanner.map((slide) => (
          <div key={slide.id}>
            <img src={slide.image} alt="img slide" />
          </div>
        ))}
      </Slider>
    </BoxSlide>
  )
}

const BoxSlide = styled(Box)`
  max-width: 100%;
  .slick-slider {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
    .slick-next {
      right: 10px;
      z-index: 2;
    }
    .slick-prev {
      left: 10px;
      z-index: 2;
    }
  }
`;

export default Banner;
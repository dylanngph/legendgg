import { Box } from '@mui/material';
import Slider from "react-slick";
import styled from 'styled-components';
// import "~slick-carousel/slick/slick.css"; 
// import "~slick-carousel/slick/slick-theme.css";

const settings = {
  dots: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1
};

const listSlider = [
  {
    id: 1,
    image: 'https://via.placeholder.com/2000x500/6A8197/ffffff/?text=ImageSlide',
  },
  {
    id: 2,
    image: 'https://via.placeholder.com/2000x500/6A8197/ffffff/?text=ImageSlide',
  },
  {
    id: 3,
    image: 'https://via.placeholder.com/2000x500/6A8197/ffffff/?text=ImageSlide',
  }
]

function Banner() {
  return (
    <BoxSlide>
      <Slider {...settings}>
        {listSlider.map((slide) => (
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
      max-width: 100%;
      width: 100%;
      height: auto;
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
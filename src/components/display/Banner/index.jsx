import { Box, Typography, Button } from '@mui/material';
import ButtonStyle from '../../custom/ButtonStyle';
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
          <WapperSlide key={slide.id}>
            <img src={slide.image} alt="img slide" />
            {(slide.title || slide.subTitle || slide.button) &&
              <Box sx={{ position: 'absolute', top: '50%', left: '10%', transform: 'translateY(-50%)'}}>
                <Typography variant='h1'>sss</Typography>
                <Typography variant='h2'>sss</Typography>
                <Box sx={{ marginTop: '10px'}}>
                  <ButtonStyle>ssss</ButtonStyle>
                </Box>
              </Box>}
          </WapperSlide>
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
      object-fit: contain;
      object-position: center;
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

const WapperSlide = styled(Box)`
  height: 400px;
  position: relative;
  @media screen and (max-width: 900px) {
    height: 200px;
  }
`;

export default Banner;
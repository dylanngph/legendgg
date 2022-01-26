import { Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import PropTypes from 'prop-types';
import { decode } from 'html-entities';
import styled from 'styled-components';

const formatDate = (date) => {
  if (!date) return;
  return new Date(date).toLocaleString("vi-VN");
}

function PostDetail(props) {
  return (
    <div>
      {
        props.post ?
        <>
          <Typography variant='h2' sx={{ padding: '15px 0 25px' }}>{props.post.title}</Typography>
          <Typography variant='h5'>{formatDate(props.post?.createdAt)}</Typography>
          {props.post?.author?.name && <Typography variant='h5'>{`By ${props.post.author.name}`}</Typography>}
          {props.post?.thumbnail &&
            <BoxThumbnail>
              <img src={props.post?.thumbnail} alt={props.post?.title} />
            </BoxThumbnail>
          }
          <BoxContentPost dangerouslySetInnerHTML={{__html: decode(props.post?.content)}}></BoxContentPost>
          <BoxFooterPost>
            {props.post?.categories?.length &&
              <Typography variant='h6'>{`Danh mục: ${props.post.categories.join(", ")}`}</Typography>
            }
            {props.post?.tags?.length &&
              <Typography variant='h6'>{`Tags: ${props.post.tags.join(", ")}`}</Typography>
            }
          </BoxFooterPost>
          <Box sx={{ paddingBottom: '20px', textAlign: 'center', '& a': { color: '#ffffff', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center' } }}>
            <NavLink to="/"><ArrowBackIcon />Trở về</NavLink>
          </Box>
        </>
        :
        <>
          <Typography variant='h2' sx={{ paddingTop: '15px' }}>404 - Article not found</Typography>
        </>
      }
      
    </div>
  )
}

const BoxThumbnail = styled(Box)`
  padding-top: 10px;
  width: 100%;
  height: 250px;
  @media screen and (max-width: 600px) {
    height: 150px;
  }
  img {
    width: 100%;
    height: 100%!important;
    object-fit: cover;
  }
`;

const BoxContentPost = styled(Box)`
  color: #ffffff;
  padding: 20px 0;
  overflow-x: auto;
  img {
    max-width: 100%;
    height: auto;
  }
  h1 {
    font-size: '3rem',
  }
  h2 {
    font-size: '2rem',
  }
  h3 {
    font-size: '1.8rem',
  }
  h4 {
    font-size: '1.4rem',
  }
  h5 {
    font-size: '1.2rem',
  }
  h6 {
    font-size: '1.1rem',
  }
  a span {
    white-space: pre-wrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
  a {
    color: #ffffff;
  }
`;

const BoxFooterPost = styled(Box)`
  padding: 10px 0;
  border-top: 1px solid #B0AEB5;
`;

PostDetail.propTypes = {
  post: PropTypes.object,
};

PostDetail.defaultProps = {
  post: null,
};

export default PostDetail;
import { Grid, Box, Typography } from '@mui/material';
import { NavLink, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import ArticleCommentBox from './commentBox';
import ListRelated from './listRelated';
import handleViewport from 'react-in-viewport';
import postApi from 'api/postApi';
import { decode } from 'html-entities';
import moment from 'moment';
import styled from 'styled-components';

const BlockCheckViewArticle = (props) => {
  const { forwardedRef } = props;
  return (
    <div className="viewport-block" ref={forwardedRef}>
      <div style={{ width: '100%', height: '10px' }} />
    </div>
  );
};

const ViewportBlock = handleViewport(BlockCheckViewArticle, /** options: {}, config: {} **/);
function ArticleDetail({article}) {
  const navigate = useNavigate();

  const postnViewArticle = async () => {
    // set nView article
    let arrayListnViewed = localStorage.getItem('listnViewed');
    if (!arrayListnViewed) arrayListnViewed = [];
    else arrayListnViewed = JSON.parse(arrayListnViewed);
    if (arrayListnViewed.includes(article._id)) return;
    arrayListnViewed.push(article._id);
    localStorage.setItem('listnViewed', JSON.stringify(arrayListnViewed));
    try {
      await postApi.postnView(article._id);
    } catch (error) {}
  }

  return (
    <Box sx={{padding: '25px'}}>
      {article.title && (
        <>
        <Typography variant='h1' sx={{ padding: { md: '15px 0 25px', xs: '0 0 15px' }, fontSize: { md: '38px', xs: '26px' }, textAlign: { md: 'center', xs: 'left' } }}>{article.title}</Typography>
        {article?.thumbnail &&
          <BoxThumbnail>
            <img src={article?.thumbnail} alt={article?.title} />
          </BoxThumbnail>
        }
        <Grid container sx={{ flexDirection: { md: "row-reverse"} }}>
          <Grid item xs={12} md={8}>
            <BoxContentPost dangerouslySetInnerHTML={{__html: decode(article?.content)}} />
            <ViewportBlock onEnterViewport={() => postnViewArticle()} />
            {/* <ArticleCommentBox /> */}
          </Grid>
          <Grid item xs={12} md={4}>
            <BoxMoreInfo>
              <Box sx={{marginBottom: '10px'}}>Danh mục: {article.categories.map((cate, index) => {
                  if (index > 0) return (<span key={index}>, <NavLink to={`/cate/${cate?.slug}`}>{cate?.name}</NavLink></span>)
                  else return (<span key={index}><NavLink to={`/cate/${cate?.slug}`}>{cate?.name}</NavLink></span>)
                })}
              </Box>
              <Box sx={{marginBottom: '10px'}}>By {article?.author?.name} - {moment(article.createdAt).format("DD/MM/YYYY")}</Box>
              {/* <Box sx={{ display: 'flex', color: '#888888' }}>
                <Box sx={{ '& svg': {width: 16, height: 16}, marginRight: '3px' }}>
                  <LocalFireDepartmentIcon />
                </Box>
                <span>{article.nLikes}</span>
              </Box>
              <Box sx={{ display: 'flex', color: '#888888' }}>
                <Box sx={{ '& svg': {width: 16, height: 16}, marginRight: '3px' }}>
                  <ModeCommentIcon />
                </Box>
                <span>0</span>
              </Box> */}
              <Box sx={{ borderTop: '1px solid #eeeeee', padding: '20px 0' }}>Tag: {article.tags.map((tag, index) => {
                if (index > 0) return `, #${tag.name}`
                else return `#${tag.name}`
              })}
              </Box>
              <Box sx={{ '& a': { fontWeight: 'bold', color: '#111111' } }}>
                <button onClick={() => navigate(-1)}>Trở về trang trước</button>
              </Box>
            </BoxMoreInfo>
          </Grid>
        </Grid>
        <ListRelated articleId={article._id}/>
        </>
      )}
    </Box>
  )
}

const BoxMoreInfo = styled(Box)`
  position: sticky;
  top: 60px;
  font-size: 13px;
  color: #222222;
  padding: 20px 20px 20px 0;
  button {
    border: 0;
    background-color: transparent;
    padding: 0;
    text-decoration: underline;
    font-weight: 600;
    color: #111111;
    font-family: 'Open Sans';
    cursor: pointer;
  }
  a {
    color: #222222;
  }
`;

const BoxThumbnail = styled(Box)`
  width: 100%;
  height: 350px;
  @media screen and (max-width: 600px) {
    height: 250px;
  }
  img {
    width: 100%;
    height: 100%!important;
    object-fit: cover;
    object-position: center;
  }
`;

const BoxContentPost = styled(Box)`
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
  h1, h2, h3, h4, h5, h6, b, strong {
    font-weight: 500;
  }
  a span, a b {
    white-space: pre-wrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
  a {
    color: inherit;
  }
`;

ArticleDetail.propTypes = {
  article: PropTypes.object,
};

export default ArticleDetail;
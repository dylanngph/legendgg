import PropTypes from 'prop-types';
import { VIEW_TYPE } from 'constants/data/article';
import { Grid, Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import ArticleTitle from 'components/custom/Article/title';
import ArticleThumb from 'components/custom/Article/thumb';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ModeCommentIcon from '@mui/icons-material/ModeComment';
import moment from 'moment';
import styled from 'styled-components';
function ArticleItem({viewType, article}) {

  const renderBoxStyle = (viewType, article) => {
    switch (viewType) {
      case VIEW_TYPE.lg:
        return (
          <BoxArticleLg>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <ArticleThumb slug={article.slug} title={article.title} imgPath={article?.thumbnail} viewType={viewType} />
              </Grid>
              <Grid item xs={12} md={6}>
                <BoxTags>
                  <div>
                  {article.categories.map((cate, index) => {
                    if (index > 0) return (<span key={index}>, <NavLink to={`/cate/${cate?.slug}`}>{cate?.name}</NavLink></span>)
                    else return (<span key={index}><NavLink to={`/cate/${cate?.slug}`}>{cate?.name}</NavLink></span>)
                  })}
                  </div>
                </BoxTags>
                <ArticleTitle slug={article.slug} title={article.title} variantFont="24" />
                {article.shortDescription && (<BoxExcerpt>{article.shortDescription}</BoxExcerpt>)}
                <BoxAuthor>By {article.author?.name} - {moment(article.createdAt).format("DD/MM/YYYY")}</BoxAuthor>
                <BoxMoreInfo>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ '& svg': {color: '#999999', width: 16, height: 16}, marginRight: '3px' }}>
                      <LocalFireDepartmentIcon />
                    </Box>
                    <span>{article.nViews}</span>
                  </Box>
                  <Box sx={{ marginLeft: '15px', display: 'flex' }}>
                    <Box sx={{ '& svg': {color: '#999999', width: 16, height: 16}, marginRight: '3px' }}>
                      <ModeCommentIcon />
                    </Box>
                    <span>0</span>
                  </Box>
                </BoxMoreInfo>
              </Grid>
            </Grid>
          </BoxArticleLg>
        )
      case VIEW_TYPE.sm:
        return (
          <BoxArticleSm>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <ArticleThumb slug={article.slug} title={article.title} imgPath={article?.thumbnail} viewType={viewType} />
              </Grid>
              <Grid item xs={8}>
                <ArticleTitle slug={article.slug} title={article.title} variantFont="16" />
                <BoxMoreInfo>
                  <Box sx={{ display: 'flex' }}>
                    <Box sx={{ '& svg': {color: '#f1555b', width: 16, height: 16}, marginRight: '3px' }}>
                      <LocalFireDepartmentIcon />
                    </Box>
                    <span>{article.nViews}</span>
                  </Box>
                  <Box sx={{ marginLeft: '15px', display: 'flex' }}>
                    <Box sx={{ '& svg': {color: '#999999', width: 16, height: 16}, marginRight: '3px' }}>
                      <ModeCommentIcon />
                    </Box>
                    <span>0</span>
                  </Box>
                </BoxMoreInfo>
              </Grid>
            </Grid>
          </BoxArticleSm>
        )
      case VIEW_TYPE.thumbLg:
        return (
          <BoxArticleThumbLg>
            <ArticleThumb slug={article.slug} title={article.title} imgPath={article?.thumbnail} viewType={viewType} />
            <ArticleTitle slug={article.slug} title={article.title} variantFont="28" />
          </BoxArticleThumbLg>
        )
      case VIEW_TYPE.thumbSm:
        return (
          <BoxArticleThumbSm>
            <ArticleThumb slug={article.slug} title={article.title} imgPath={article?.thumbnail} viewType={viewType} />
            <ArticleTitle slug={article.slug} title={article.title} variantFont="18" />
          </BoxArticleThumbSm>
        )
      default:
        return (
          <BoxArticleThumbSm>
            <ArticleThumb slug={article.slug} title={article.title} imgPath={article?.thumbnail} viewType={viewType} />
            <ArticleTitle slug={article.slug} title={article.title} variantFont="18" />
          </BoxArticleThumbSm>
        )
    }
  }

  return (
    <>{renderBoxStyle(viewType, article)}</>
  )
}

const BoxAuthor = styled(Box)`
  font-size: 12px;
  margin-top: 20px;
`;

const BoxExcerpt = styled(Box)`
  font-size: 18px;
  margin-top: 20px;
  color: #888888;
  white-space: pre-wrap; 
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  display: -webkit-box;
`;

const BoxTags = styled(Box)`
  margin-bottom: 20px;
  span, a {
    cursor: pointer;
    color: #95008A;
    text-decoration: none;
  }
`;

const BoxMoreInfo = styled(Box)`
  color: #999999;
  font-size: 12px;
  margin-top: 15px;
  display: flex;
  span {
    line-height: 16px;
  }
`;

const BoxArticleThumbLg = styled(Box)``;

const BoxArticleThumbSm = styled(Box)`
  margin-bottom: 20px;
`;

const BoxArticleSm = styled(Box)`
  padding-bottom: 20px;
  margin-bottom: 20px;
  min-height: 100px;
  h2 {
    margin-top: -5px;
  }
  &:not(:last-child) {
    border-bottom: 1px solid #eeeeee;
  }
`;

const BoxArticleLg = styled(Box)`
  padding-bottom: 20px;
  h2 {
    margin-top: -5px;
  }
  &:not(:last-child) {
    margin-bottom: 20px;
    border-bottom: 1px solid #eeeeee;
  }
`;

ArticleItem.propTypes = {
  viewType: PropTypes.string,
  article: PropTypes.object,
};

export default ArticleItem;
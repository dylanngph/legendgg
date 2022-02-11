import PropTypes from 'prop-types';
import { VIEW_TYPE } from 'constants/data/article';
import { Grid, Box } from '@mui/material';
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
          <BoxAriticleLg>
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <ArticleThumb slug={article.slug} title={article.title} imgPath={article?.thumbnail} />
              </Grid>
              <Grid item xs={12} md={6}>
                <BoxTags>
                  <span>
                  {article.categories.map((tag, index) => {
                    if (index > 0) return `, ${tag.name}`
                    else return tag.name
                  })}
                  </span>
                </BoxTags>
                <ArticleTitle slug={article.slug} title={article.title} variantFont="24" />
                {article.shortDescription && (<BoxExcerpt>{article.shortDescription}</BoxExcerpt>)}
                <BoxAuthor>By {article.author.name} - {moment(article.createdAt).format("DD/MM/YYYY")}</BoxAuthor>
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
          </BoxAriticleLg>
        )
      case VIEW_TYPE.sm:
        return (
          <BoxAriticleSm>
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <ArticleThumb slug={article.slug} title={article.title} imgPath={article?.thumbnail} />
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
          </BoxAriticleSm>
        )
      case VIEW_TYPE.thumbLg:
        return (
          <BoxAriticleThumbLg>
            <ArticleThumb slug={article.slug} title={article.title} imgPath={article?.thumbnail} />
            <ArticleTitle slug={article.slug} title={article.title} variantFont="28" />
          </BoxAriticleThumbLg>
        )
      case VIEW_TYPE.thumbSm:
        return (
          <BoxAriticleThumbSm>
            <ArticleThumb slug={article.slug} title={article.title} imgPath={article?.thumbnail} />
            <ArticleTitle slug={article.slug} title={article.title} variantFont="18" />
          </BoxAriticleThumbSm>
        )
      default:
        return (
          <BoxAriticleThumbSm>
            <ArticleThumb slug={article.slug} title={article.title} imgPath={article?.thumbnail} />
            <ArticleTitle slug={article.slug} title={article.title} variantFont="18" />
          </BoxAriticleThumbSm>
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
  span {
    cursor: pointer;
    color: #95008A;
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

const BoxAriticleThumbLg = styled(Box)``;

const BoxAriticleThumbSm = styled(Box)`
  margin-bottom: 20px;
`;

const BoxAriticleSm = styled(Box)`
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

const BoxAriticleLg = styled(Box)`
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
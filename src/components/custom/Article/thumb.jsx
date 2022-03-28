import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { SIZE_HEIGHT_VIEW_TYPE } from 'constants/data/article';

function ArticleThumb({slug, title, imgPath, viewType}) {
  return (
    <BoxThubArticle className={viewType == 'thumb_lg' ? 'thumb-lg' : 'lg'} viewType={viewType}>
      <NavLink to={`/post/${slug}`}>
        <img src={imgPath} alt={title} />
      </NavLink>
    </BoxThubArticle>
  )
}

const BoxThubArticle = styled(Box)`
  a {
    text-decoration: none;
  }

  img {
    cursor: pointer;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }

  &.lg {
    img {
      max-height: 330px;
      object-position: center;
    }
  }

  @media screen and (max-width: 600px) {
    height: ${(props) => props.viewType ? SIZE_HEIGHT_VIEW_TYPE[props.viewType] : "250"}px;
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

`;

ArticleThumb.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  imgPath: PropTypes.string,
  viewType: PropTypes.string,
};

export default ArticleThumb;
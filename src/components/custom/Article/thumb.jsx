import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { VIEW_TYPE, SIZE_HEIGHT_VIEW_TYPE } from 'constants/data/article';

function ArticleThumb({slug, title, imgPath, viewType}) {
  return (
    <BoxThubArticle viewType={viewType}>
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
    max-width: 100%;
    height: 100%;
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
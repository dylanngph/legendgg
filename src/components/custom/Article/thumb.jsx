import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function ArticleThumb({slug, title, imgPath}) {
  return (
    <BoxThubArticle>
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
`;

ArticleThumb.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  imgPath: PropTypes.string,
};

export default ArticleThumb;
import { Box } from '@mui/material';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function ArticleTitle({slug, title, variantFont}) {
  return (
    <BoxTitleArticle variantFont={variantFont}>
      <NavLink to={`/post/${slug}`}>
        <h2 title={title}>{title}</h2>
      </NavLink>
    </BoxTitleArticle>
  )
}

const BoxTitleArticle = styled(Box)`
  a {
    text-decoration: none;
    color: #111111;
    &:hover {
      h2 {
        color: #555555;
      }
    }
  }
  h2 {
    font-size: ${props => props.variantFont ? props.variantFont : "28"}px;
    font-weight: 500;
    margin: 0;
    white-space: pre-wrap; 
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    display: -webkit-box;
  }
`;

ArticleTitle.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string,
  variantFont: PropTypes.string,
};

export default ArticleTitle;
import { Grid, Box, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import PropTypes from 'prop-types';
import styled from 'styled-components';

function Post(props) {
  return (
    <Grid item xs={12} sm={6} md={4}>
      <NavLink to={`post/${props.item.slug}`} style={{ textDecoration: 'none' }}>
        <Card sx={{ height: '100%', backgroundColor: '#080811', cursor: 'pointer' }}>
          <CardMedia
            component="img"
            height="150"
            image={props.item?.thumbnail}
            alt={props.item?.title}
          />
          <CardContent>
            <BoxTitle>
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>{props.item?.title}</Typography>
            </BoxTitle>
            <BoxExcerpt>
              <Typography variant="body1">{props.item?.subTitle}</Typography>
            </BoxExcerpt>
          </CardContent>
        </Card>
      </NavLink>
    </Grid>
  ) 
}

const BoxTitle = styled(Box)`
  white-space: pre-wrap; 
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
  margin-bottom: 10px;
  h5:hover {
    color: #C33020;
  }
`;

const BoxExcerpt = styled(Box)`
  white-space: pre-wrap; 
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  display: -webkit-box;
`;

Post.propTypes = {
  item: PropTypes.object,
};

Post.defaultProps = {
  item: null,
};

export default Post;
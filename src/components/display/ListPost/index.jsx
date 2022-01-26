import React, { useState, useEffect } from 'react';
import { Container, Grid, Box } from '@mui/material';
import Post from '../../custom/Post';
import LoadingListPost from '../Loading/listpost';
import styled from 'styled-components';
import postApi from '../../../api/postApi';
import { cateList } from '../../../constants/data/category';

const ID_CATE_ALL_POST = 1;

function ListPost() {
  const [categories, setCategories] = useState(1);
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductList = async () => {
      setLoading(true);
      try {
        const response = await postApi.getAll();
        setPostList(response.data);
        setLoading(false);
      } catch (error) { setLoading(false); }
    }
    fetchProductList();
  }, []);

  const handleChangeCategories = async (id, title) => {
    setCategories(id);
    if (loading) return;
    setLoading(true);
    try {
      let params = {};
      if (id !== ID_CATE_ALL_POST) params = {categories: title};
      const response = await postApi.getAll(params);
      setPostList(response.data);
      setLoading(false);
    } catch (error) { setLoading(false); }
  };

  return (
    <Container>
      <WrapperBox>
        <StyledCate>
          {cateList.map((cate) => (
            <CateItem key={cate.id}>
              <span onClick={() => handleChangeCategories(cate.id, cate.title)} className={cate.id === categories ? "active" : ""}>{cate.title}</span>
            </CateItem>
          ))}
        </StyledCate>
        <Grid container spacing={2}>
          {loading ?
            <LoadingListPost />
          :
            postList.map((post) => (
              <Post key={post.id} item={post}/>
            ))
          }
        </Grid>
      </WrapperBox>
    </Container>
  )
}

const WrapperBox = styled(Box)`
  border: 1px solid #86848a;
  margin: 15px 0;
  padding: 15px;
  border-radius: 5px;
`;

const StyledCate = styled.ul`
  display: inline-block;
  list-style: none;
  margin: 0 0 15px;
  padding: 0 0 5px;
  border-bottom: 1px solid #B0AEB5;
`;

const CateItem = styled.li`
  display: inline-block;
  padding: 5px 20px 5px 0;
  cursor: pointer;
  font-weight: bold;
  &:last-child {
    padding-right: 0;
  }
  span.active,
  &.active,
  &:hover {
    color: #C33020;
  }
`;

export default ListPost;
import React, { useState, useEffect } from 'react';
import { Container } from '@mui/material';
import { useParams } from "react-router-dom";
import postApi from '../../api/postApi';
import PostDetail from '../../components/custom/PostDetail';
import LoadingDetailPost from '../../components/display/Loading/detailpost';

function PostScreen(props) {
  const params = useParams();
  const [postItem, setPostItem] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductList = async () => {
      setLoading(true);
      try {
        const response = await postApi.getDetail(params);
        setPostItem(response.data);
        setLoading(false);
      } catch (error) { setLoading(false); }
    }
    fetchProductList();
  }, []);

  return (
    <Container>
      {loading ? <LoadingDetailPost /> : <PostDetail post={postItem}/>}
    </Container>
  )
}

export default PostScreen;
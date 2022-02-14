import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { Typography } from '@mui/material';
import postApi from 'api/postApi';
import ArticleDetail from 'components/display/ArticleDetail';
import LoadingDetailPost from 'components/display/Loading/detailpost';

function PostScreen() {
  const params = useParams();
  const [articleItem, setArticleItem] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductList = async () => {
      setLoading(true);
      try {
        const response = await postApi.getDetail(params);
        setArticleItem(response.data);
        setLoading(false);
      } catch (error) { setLoading(false); }
    }
    fetchProductList();
  }, [params]);

  return (
    <div>
      {loading ? <LoadingDetailPost /> : (
        <>
        {!articleItem.name ? (
          <ArticleDetail article={articleItem}/>
        ) : (<Typography variant='h2' sx={{ paddingTop: '15px' }}>404 - Article not found</Typography>)}
        </>
        )
      }
    </div>
  )
}

export default PostScreen;
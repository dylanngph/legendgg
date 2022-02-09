import React, { useState, useEffect } from 'react';
import ArticleItem from "../ArticleItem";
import postApi from 'api/postApi';
import { Box } from '@mui/material';
import LoadingArticleSm from 'components/display/Loading/articleSm';

function ListPopular() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const PAG = {page: 1, limit: 5};
        const response = await postApi.getPopular(PAG.page, PAG.limit);
        setList(response.data);
        setLoading(false);
      } catch (error) { setLoading(false); }
    }
    fetchList();
  }, []);

  return (
    <Box sx={{padding: '0 25px'}}>
      {loading?
      (
        <>
          <LoadingArticleSm />
          <LoadingArticleSm />
          <LoadingArticleSm />
          <LoadingArticleSm />
          <LoadingArticleSm />
        </>
      ):
      (
        <>
        {list.map((article) => (
          <ArticleItem key={article._id} viewType="sm" article={article} />
        ))}
        </>
      )}
    </Box>
  )
}

export default ListPopular;
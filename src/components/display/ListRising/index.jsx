import React, { useState, useEffect } from 'react';
import ArticleItem from "../ArticleItem";
import postApi from 'api/postApi';
import { Box } from '@mui/material';
import LoadingArticleThumbSm from 'components/display/Loading/articleThumbSm';

function ListRising() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const params = {
          page: 1,
          limit: 4,
          tagSlugs: 'rising',
          sortBy: '-nViews'
        };
        const response = await postApi.getAll(params);
        setList(response.data);
        setLoading(false);
      } catch (error) { setLoading(false); }
    }
    fetchList();
  }, []);

  return (
    <Box sx={{padding: '25px', position: {lg: 'sticky'}, top: {lg: '56px'}}}>
      {loading?
      (
        <>
          <LoadingArticleThumbSm />
          <LoadingArticleThumbSm />
          <LoadingArticleThumbSm />
        </>
      ):
      (
        <>
        {list.map((article) => (
          <ArticleItem key={article._id} viewType="thumbSm" article={article} />
        ))}
        </>
      )}
    </Box>
  )
}

export default ListRising;
import React, { useState, useEffect } from 'react';
import ArticleItem from "components/display/ArticleItem";
import postApi from 'api/postApi';
import { Box } from '@mui/material';
import LoadingArticleLg from 'components/display/Loading/articleLg';

function LastestScreen() {
  const [list, setList] = useState([]);
  const [pag, setPag] = useState({
    page: 1,
    limit: 10,
    totalPages: 1,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const params = {
          page: pag.page,
          limit: pag.limit,
          sortBy: '-createdAt'
        };
        const response = await postApi.getAll(params);
        setList(response.data);
        setLoading(false);
      } catch (error) { setLoading(false); }
    }
    fetchList();
  }, []);

  return (
    <Box sx={{padding: '25px'}}>
      {loading?
      (
        <>
          <LoadingArticleLg />
        </>
      ):
      (
        <>
        {list.map((article) => (
          <ArticleItem key={article._id} viewType="lg" article={article} />
        ))}
        </>
      )}
    </Box>
  )
}

export default LastestScreen;
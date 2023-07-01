import React, { useState, useEffect } from 'react';
import ArticleItem from "../ArticleItem";
import postApi from 'api/postApi';
import { Grid, Box } from '@mui/material';
import LoadingArticleThumbLg from 'components/display/Loading/articleThumbLg';

function ListNew() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const params = {
          page: 1,
          limit: 3,
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
    <>
      {loading?
        <LoadingArticleThumbLg />
      :
      <>
        {list.length >=3 && (
          <Box sx={{padding: '0 25px', borderLeft: { md: '1px solid #eeeeee'}, borderRight: { md: '1px solid #eeeeee'}}}>
            <ArticleItem viewType="thumb_lg" article={list[0]} />
          </Box>
        )}
      </>
      }
    </>
  )
}

export default ListNew;
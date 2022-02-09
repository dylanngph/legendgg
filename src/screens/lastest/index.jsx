import React, { useState, useEffect, useCallback } from 'react';
import ArticleItem from "components/display/ArticleItem";
import postApi from 'api/postApi';
import { Box } from '@mui/material';
import LoadingArticleLg from 'components/display/Loading/articleLg';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

function LastestScreen() {
  const [loading, setLoading] = useState(false);
  const [loadingPag, setLoadingPag] = useState(false);
  const [list, setList] = useState([]);
  const [pag, setPag] = useState({
    hasNextPage: false,
    page: 1,
    limit: 10,
    totalPages: 1,
    sortBy: '-createdAt',
  });
  

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const params = {
          page: pag.page,
          limit: pag.limit,
          sortBy: pag.sortBy
        };
        const response = await postApi.getAll(params);
        setList(response.data);
        let pagTmp = pag;
        pagTmp.hasNextPage = response.hasNextPage;
        pagTmp.totalPages = response.hasNextPage;
        setPag(pagTmp);
        setLoading(false);
      } catch (error) { setLoading(false); }
    }
    fetchList();
  }, []);

  const checkLoadNextPage = async () => {
    if (!pag.hasNextPage || loadingPag) return;
    try {
      setLoadingPag(true);
      let params = {
        page: pag.page+1,
        limit: pag.limit,
        sortBy: pag.sortBy,
      };
      const response = await postApi.getAll(params);
      if (response.data) {
        setList(list => [...list, ...response.data]);
        let pagTmp = pag;
        pagTmp.page = params.page;
        pagTmp.hasNextPage = response.hasNextPage;
        pagTmp.totalPages = response.hasNextPage;
        setPag(pagTmp);
      }
      setLoadingPag(false);
    } catch (e) {
      setLoadingPag(false);
    }
  }

  const handleOnDocumentBottom = useCallback(() => {
    if (!pag.hasNextPage || loadingPag) return;
    checkLoadNextPage();
  }, []);

  useBottomScrollListener(handleOnDocumentBottom, {
    offset: 100,
    debounce: 500,
  });

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
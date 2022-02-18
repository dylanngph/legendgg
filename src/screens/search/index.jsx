import React, { useState, useCallback } from 'react';
import { Box, TextField, Typography, Skeleton } from '@mui/material';
import postApi from 'api/postApi';
import ArticleItem from "components/display/ArticleItem";
import LoadingArticleLg from 'components/display/Loading/articleLg';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

function SearchScreen() {
  const CONFIG_PAG = {
    page: 1,
    limit: 10
  };

  const [stateSearch, setStateSearch] = useState(false);
  const [inputSearch, setInputSearch] = useState('');
  const [listSearch, setListSearch] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingPag, setLoadingPag] = useState(false);
  const [pag, setPag] = useState({
    hasNextPage: false,
    page: CONFIG_PAG.page,
    limit: CONFIG_PAG.limit,
    totalPages: CONFIG_PAG.page,
    keyword: '',
  });

  const handleChangeSearch = (event) => {
    setInputSearch(event.target.value);
  };

  const handleSubmitSearch = (event) => {
    setStateSearch(true);
    if (!event.target[0].value) return;
    event.preventDefault();
    event.target[0].blur();
    fetchSearchList(event.target[0].value);
  }

  const fetchSearchList = async (keyword) => {
    setLoading(true);
    try {
      let params = {
        page: CONFIG_PAG.page,
        limit: CONFIG_PAG.limit,
        keyword: keyword,
      };
      const response = await postApi.getAll(params);
      if (response.data) {
        setListSearch(response.data);
        let pagTmp = pag;
        pagTmp.hasNextPage = response.hasNextPage;
        pagTmp.totalPages = response.hasNextPage;
        pagTmp.keyword = keyword;
        setPag(pagTmp);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  const checkLoadNextPage = async () => {
    if (!pag.hasNextPage || loadingPag) return;
    try {
      setLoadingPag(true);
      let params = {
        page: pag.page+1,
        limit: pag.limit,
        keyword: pag.keyword,
      };
      const response = await postApi.getAll(params);
      if (response.data) {
        setListSearch(listSearch => [...listSearch, ...response.data]);
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
      <Typography variant='h1' sx={{color: '#888888', marginBottom: '10px', fontSize: '30px'}}>Tìm kiếm</Typography>
      <form onSubmit={handleSubmitSearch}>
        <Box sx={{maxWidth: '100%'}}>
          <TextField
            fullWidth 
            label="Tìm kiếm trong Legend Guild Game"
            id="search"
            value={inputSearch}
            onChange={handleChangeSearch}
          />
        </Box>
      </form>
      <Box sx={{paddingTop: '25px'}}>
        {loading?
          <>
            <Skeleton variant="text" width="80%" />
            <Skeleton variant="text" width="100%" />
          </>
        :
        <>
          {listSearch.length ? (
            <>
              {listSearch.map((article, index) => (
                <ArticleItem key={index} viewType="lg" article={article} />
              ))}
            </>
          ):
          (
            <div>{stateSearch && 'Thông tin không được tìm thấy'}</div>
          )}
          {loadingPag && <LoadingArticleLg />}
        </>}
      </Box>
    </Box>
  )
}

export default SearchScreen;
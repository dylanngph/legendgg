import React, { useState, useEffect, useCallback } from 'react';
import { useParams } from "react-router-dom";
import ArticleItem from "components/display/ArticleItem";
import postApi from 'api/postApi';
import { Box, Tabs, Tab, Typography } from '@mui/material';
import LoadingArticleLg from 'components/display/Loading/articleLg';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import SectionRising from 'components/display/SectionRising';
import styled from 'styled-components';

const TAB_CONFIG = [
  {
    id: 0,
    title: 'Lastest',
    keySortby: '-createdAt'
  },
  {
    id: 1,
    title: 'Popular',
    keySortby: '-nViews'
  }
]

function CateScreen() {
  const params = useParams();
  const [valueSortby, setValueSortby] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingPag, setLoadingPag] = useState(false);
  const [list, setList] = useState([]);
  const [pag, setPag] = useState({
    hasNextPage: false,
    page: 1,
    limit: 10,
    totalPages: 1,
    categorySlugs: params.cateSlug,
    sortBy: TAB_CONFIG[0].keySortby,
  });

  const handleChangeSortby = (event, newValue) => {
    let pagTmp = pag;
    pagTmp.sortBy = TAB_CONFIG[newValue].keySortby;
    setPag(pagTmp);
    setValueSortby(newValue);
  };

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const paramItem = {
          page: pag.page,
          limit: pag.limit,
          sortBy: pag.sortBy,
          categorySlugs: params.cateSlug
        };
        const response = await postApi.getAll(paramItem);
        setList(response.data);
        let pagTmp = pag;
        pagTmp.hasNextPage = response.hasNextPage;
        pagTmp.totalPages = response.hasNextPage;
        setPag(pagTmp);
        setLoading(false);
      } catch (error) { setLoading(false); }
    }
    fetchList();
  }, [valueSortby, params]);

  const checkLoadNextPage = async () => {
    if (!pag.hasNextPage || loadingPag) return;
    try {
      setLoadingPag(true);
      let paramItem = {
        page: pag.page+1,
        limit: pag.limit,
        sortBy: pag.sortBy,
        categorySlugs: params.cateSlug
      };
      const response = await postApi.getAll(paramItem);
      if (response.data) {
        setList(list => [...list, ...response.data]);
        let pagTmp = pag;
        pagTmp.page = response.page;
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
      <SectionRising categorySlugs={params.cateSlug} />
      <WrapperTab>
        <Tabs
          value={valueSortby}
          onChange={handleChangeSortby}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {TAB_CONFIG.map((tabItem) => (
            <Tab key={tabItem.id} label={tabItem.title} />
          ))}
        </Tabs>
      </WrapperTab>
      <Box sx={{padding: '25px 0'}}>
      {loading?
      (
        <>
          <LoadingArticleLg />
        </>
      ):
      (
        <>
        {list.length ? (
          <>
            {list.map((article, index) => (
              <ArticleItem key={article._id+index} viewType="lg" article={article} />
            ))}
          </>
        ):
        (
          <div>Chưa có bài viết</div>
        )}
        {loadingPag && <LoadingArticleLg />}
        </>
      )}
      </Box>
    </Box>
  )
}

const WrapperTab = styled(Box)`
  margin: '30px 0';
  padding: '0 25px';
  .MuiTabs-scroller {
    border-bottom: 1px solid #eeeeee;
  }
  .MuiTab-root {
    text-transform: inherit;
    font-size: 18px;
  }
  .MuiTabs-indicator {
    background-color: #111111;
    height: 4px;
  }
`;

export default CateScreen;
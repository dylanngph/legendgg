import React, { useState, useEffect, useCallback } from 'react';
import { Box, Tabs, Tab, Select, MenuItem } from '@mui/material';
import ArticleItem from "../ArticleItem";
import postApi from 'api/postApi';
import styled from 'styled-components';
import { cateList } from 'constants/data/category';
import LoadingArticleLg from 'components/display/Loading/articleLg';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';

function ListArticleSection() {

  const CONFIG_PAG = {
    page: 1,
    limit: 10
  };

  const [valueCate, setValueCate] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingPag, setLoadingPag] = useState(false);
  const [list, setList] = useState([]);
  const [pag, setPag] = useState({
    hasNextPage: false,
    page: CONFIG_PAG.page,
    limit: CONFIG_PAG.limit,
    totalPages: CONFIG_PAG.page,
    sortBy: '',
    categorySlugs: '',
    tagSlugs: '',
  });

  useEffect(() => {
    setList([]);
    const fetchList = async () => {
      setLoading(true);
      try {
        let params = {
          page: CONFIG_PAG.page,
          limit: CONFIG_PAG.limit,
          sortBy: pag.sortBy,
          categorySlugs: pag.categorySlugs,
        };
        const titleCate = cateList[valueCate].key;
        switch (titleCate) {
          case 'lastest':
            params.sortBy = '-createdAt';
            params.categorySlugs = '';
            break;
          case 'popular':
            params.sortBy = '-nViews';
            params.categorySlugs = '';
            break;
          default:
            params.tagSlugs = cateList[valueCate].key;
            params.categorySlugs = '';
            params.sortBy = '-createdAt';
            break;
        }
        const response = await postApi.getAll(params);
        if (response.data) {
          setList(response.data);
          let pagTmp = pag;
          pagTmp.categorySlugs = params.categorySlugs;
          pagTmp.tagSlugs = params.tagSlugs;
          pagTmp.sortBy = params.sortBy;
          pagTmp.hasNextPage = response.hasNextPage;
          pagTmp.totalPages = response.hasNextPage;
          setPag(pagTmp);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    }
    fetchList();
  }, [valueCate]);

  const handleChange = (event, newValue) => {
    setValueCate(newValue);
  };

  const handleChangeSelect = (event) => {
    setValueCate(event.target.value);
  };

  const checkLoadNextPage = async () => {
    if (!pag.hasNextPage || loadingPag) return;
    try {
      setLoadingPag(true);
      let params = {
        page: pag.page+1,
        limit: pag.limit,
        sortBy: pag.sortBy,
        categorySlugs: pag.categorySlugs,
        tagSlugs: pag.tagSlugs,
      };
      const response = await postApi.getAll(params);
      if (response.data) {
        setList(list => [...list, ...response.data]);
        let pagTmp = pag;
        pagTmp.categorySlugs = params.categorySlugs;
        pagTmp.tagSlugs = params.tagSlugs;
        pagTmp.sortBy = params.sortBy;
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
    <WrapperTab sx={{ margin: '30px 0', padding: '0 25px' }}>
      <Box sx={{ display: {sm: 'none', xs: 'block'}, width: '50%', '&>.MuiOutlinedInput-root': {
        width: '100%'
      } }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={valueCate}
          onChange={handleChangeSelect}
        >
          {cateList.map((cate) => (
            <MenuItem key={cate.id} value={cate.id}>{cate.title}</MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={{ visibility: {sm: 'visible', xs: 'hidden'}, height: {sm: 'inherit', xs: '1px'} }}>
        <Tabs
          value={valueCate}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {cateList.map((cate, index) => (
            <Tab key={index} label={cate.title} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{paddingTop: '25px'}}>
        {loading?
        <LoadingArticleLg />
        :
        <>
          {list.length ? (
            <>
              {list.map((article, index) => (
                <ArticleItem key={index} viewType="lg" article={article} />
              ))}
            </>
          ):
          (
            <div>Chưa có bài viết</div>
          )}
          {loadingPag && <LoadingArticleLg />}
        </>}
      </Box>
    </WrapperTab>
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

export default ListArticleSection;
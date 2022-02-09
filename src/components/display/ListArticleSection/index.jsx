import React, { useState, useEffect } from 'react';
import { Box, Tabs, Tab, Select, MenuItem } from '@mui/material';
import ArticleItem from "../ArticleItem";
import postApi from 'api/postApi';
import styled from 'styled-components';
import { cateList, SPECIAL_CATE } from 'constants/data/category';
import LoadingArticleLg from 'components/display/Loading/articleLg';

function ListArticleSection() {
  const [value, setValue] = useState(0);

  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('>> value: ', value);
    const fetchList = async () => {
      setLoading(true);
      try {
        const params = {
          page: 1,
          limit: 10,
        };
        // if (!SPECIAL_CATE.include(cateList[value].title)) {
        //   params.categories = cateList[value].title;
        // }
        const response = await postApi.getAll(params);
        setList(response.data);
        setLoading(false);
      } catch (error) { setLoading(false); }
    }
    fetchList();
  }, [value]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeSelect = (event) => {
    setValue(event.target.value);
  };

  return (
    <WrapperTab sx={{ margin: '30px 0', padding: '0 25px' }}>
      <Box sx={{ display: {sm: 'none', xs: 'block'}, width: '50%', '&>.MuiOutlinedInput-root': {
        width: '100%'
      } }}>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={value}
          onChange={handleChangeSelect}
        >
          {cateList.map((cate) => (
            <MenuItem key={cate.id} value={cate.id}>{cate.title}</MenuItem>
          ))}
        </Select>
      </Box>
      <Box sx={{ visibility: {sm: 'visible', xs: 'hidden'}, height: {sm: 'inherit', xs: '1px'} }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="secondary"
          textColor="inherit"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          {cateList.map((cate) => (
            <Tab key={cate.id} label={cate.title} />
          ))}
        </Tabs>
      </Box>
      <Box sx={{paddingTop: '25px'}}>
        {loading?
        <>
          <LoadingArticleLg />
        </>
        :
        <>
          {list.map((article) => (
            <ArticleItem key={article.id} viewType="lg" article={article} />
          ))}
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
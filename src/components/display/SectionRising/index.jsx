import React, { useState, useEffect } from 'react';
import ArticleItem from "../ArticleItem";
import postApi from 'api/postApi';
import { Grid, Box } from '@mui/material';
import LoadingArticleThumbLg from 'components/display/Loading/articleThumbLg';
import LoadingArticleThumbSm from 'components/display/Loading/articleThumbSm';
import PropTypes from 'prop-types';

function SectionRising({categorySlugs}) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const params = {
          page: 1,
          limit: 3,
          tagSlugs: 'rising',
          categorySlugs: categorySlugs
        };
        const response = await postApi.getAll(params);
        setList(response.data);
        setLoading(false);
      } catch (error) { setLoading(false); }
    }
    fetchList();
  }, [categorySlugs]);

  return (
    <>
      {loading?
      <Grid container sx={{borderBottom: '1px solid #eeeeee', paddingBottom: '25px'}}>
        <Grid item xs={12} md={8}>
          <LoadingArticleThumbLg />
        </Grid>
        <Grid item xs={12} md={4}>
          <Box sx={{padding: '0 25px'}}>
            <LoadingArticleThumbSm />
            <LoadingArticleThumbSm />
          </Box>
        </Grid>
      </Grid>
      :
      <>
        {list.length >=3 && (
          <Grid container sx={{borderBottom: '1px solid #eeeeee', paddingBottom: '25px'}}>
            <Grid item xs={12} md={8} sx={{ borderRight: { md: '1px solid #eeeeee'} }}>
              <Box sx={{padding: '0 25px'}}>
                <ArticleItem viewType="thumb_lg" article={list[0]} />
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box sx={{padding: '0 25px'}}>
                <ArticleItem viewType="thumb_sm" article={list[1]} />
                <ArticleItem viewType="thumb_sm" article={list[2]} />
              </Box>
            </Grid>
          </Grid>
        )}
      </>
      }
    </>
  )
}

SectionRising.propTypes = {
  categorySlugs: PropTypes.string,
};

export default SectionRising;
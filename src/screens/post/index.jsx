import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import postApi from 'api/postApi';
import ArticleDetail from 'components/display/ArticleDetail';
import LoadingDetailPost from 'components/display/Loading/detailpost';

function PostScreen() {
  const params = useParams();
  const [articleItem, setArticleItem] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProductList = async () => {
      setLoading(true);
      try {
        const response = await postApi.getDetail(params);
        setArticleItem(response.data);
        setLoading(false);
      } catch (error) { setLoading(false); }
    }
    fetchProductList();
  }, []);

  return (
    <div>
      {loading ? <LoadingDetailPost /> : <ArticleDetail article={articleItem}/>}
    </div>
  )
}

export default PostScreen;
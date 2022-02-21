import React, { useState, useEffect } from 'react';
import ArticleItem from "../ArticleItem";
import postApi from 'api/postApi';
import PropTypes from 'prop-types';

function ListRelated({articleId}) {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchList = async () => {
      setLoading(true);
      try {
        const params = {
          articleId: articleId
        };
        const response = await postApi.getRelated(params);
        setList(response.data);
        setLoading(false);
      } catch (error) { setLoading(false); }
    }
    fetchList();
  }, []);

  return (
    <div>
      <h3>What To Read Next</h3>
      {list.map((article) => (
        <ArticleItem key={article._id} viewType="lg" article={article} />
      ))}
    </div>
  )
}

ListRelated.propTypes = {
  articleId: PropTypes.string,
};

export default ListRelated;
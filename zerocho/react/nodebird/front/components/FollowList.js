import React from 'react';
import { List, Button } from 'antd';
import PropTypes from 'prop-types';

const FollowList = ({ header, data }) => {
  const onLoadMore = () => {

  };

  return (
    <List
      header={<div>{header}</div>}
      gutter={8}
      size="small"
      itemLayout="horizontal"
      dataSource={data}
      bordered
      loadMore={(
        <div
          style={{
            textAlign: 'center',
            marginTop: 12,
            height: 32,
            lineHeight: '32px',
          }}
        >
          <Button onClick={onLoadMore}>loading more</Button>
        </div>
      )}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta title={item.nickname} />
        </List.Item>
      )}
    />
  );
};

FollowList.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
};

export default FollowList;

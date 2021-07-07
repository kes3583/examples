/* eslint-disable no-unreachable */
import React from 'react';
import Link from 'next/link';
import PropType from 'prop-types';

const PostCardContent = (postContent) => {
  const data = postContent;
  console.log('postContent :>> ', postContent);
  return (
    <div>
      {/* {data.split(/(#[^\s#]+)/g).map((v, i) => {
        if (v.match(/(#[^\s#]+)/)) {
          return (
            <Link
            // eslint-disable-next-line react/no-array-index-key
              key={`id${i}`}
              href={`/hashtag/${v.slice(1)}`}
            >
              <a>{v}</a>
            </Link>
          );
        }
        return v;
      })} */}
    </div>
  );
};

PostCardContent.propType = {
  postContent: PropType.string.isRequired,
};

export default PostCardContent;

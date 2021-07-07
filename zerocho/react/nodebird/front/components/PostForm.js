import React, { useCallback, useRef, useState, useEffect } from 'react';
import { Form, Input, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import useInput from '../hooks/useInput';
import { addPost } from '../reducers/post';

const PostForm = () => {
  const dispatch = useDispatch();
  const { imagePaths, addPostDone } = useSelector((state) => state.post);
  const [text, onChangeText, setText] = useInput('');
  const [image, setImage] = useState({ preview: '', raw: '' });

  useEffect(() => {
    if (addPostDone) {
      setText('');
    }
  }, [addPostDone]);

  const onChangeHandler = (e) => {
    if (e.target.files.length) {
      setImage({
        preview: URL.createObjectURL(e.target.files[0]),
        raw: e.target.files[0],
      });
    }
  };

  const hiddenFileInput = useRef(null);
  const handleClick = useCallback(() => {
    hiddenFileInput.current.click();
  }, [hiddenFileInput.current]);

  const onSubmit = useCallback(() => {
    console.log('onsubmit', onsubmit);
    dispatch(addPost({ Content: text, image: image.raw }));
    setText('');
  }, [text, image]);

  return (
    <Form
      onFinish={onSubmit}
      encType="multipart/form-data"
    >
      <Form.Item>
        <Input.TextArea
          onChange={onChangeText}
          value={text}
          maxLength={140}
          placeholder="what do you want to say?"
        />
      </Form.Item>
      <Form.Item>
        <input
          type="file"
          multiple
          hidden
          ref={hiddenFileInput}
          onChange={onChangeHandler}
        />
        <Button
          style={{ float: 'left' }}
          onClick={handleClick}
        >
          Upload images
        </Button>
        {image.raw ? <span>{image.raw.name}</span> : <span />}
        <Button
          type="primary"
          htmlType="submit"
          style={{ float: 'right' }}
        >
          Submit
        </Button>
      </Form.Item>
      <div>
        {imagePaths
          && imagePaths.map((v) => (
            <div>
              <div key={v}>
                <img
                  src={v}
                  alt={v}
                />
              </div>
              <Button>remove</Button>
            </div>
          ))}
      </div>
    </Form>
  );
};

export default PostForm;

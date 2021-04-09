import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import styles from '../styles/LoginForm.module.scss';
import useInput from '../hooks/useInput';
import Link from 'next/link';
import { useDispatch } from 'react-redux';
import { loginAction } from '../reducers/user';

const LoginForm = () => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');
  const dispatch = useDispatch();

  const onSubmitForm = useCallback(() => {
    console.log('id,password :>> ', id, password);
    dispatch(loginAction({ id, password }));
  }, [id, password]);

  return (
    <Form onFinish={onSubmitForm}>
      <label htmlFor="user-id">ID</label>
      <Input
        name="user-id"
        type="text"
        value={id}
        onChange={onChangeId}
        required
      />
      <label htmlFor="user-password">Password</label>
      <Input
        name="user-password"
        type="password"
        value={password}
        onChange={onChangePassword}
        required
      />
      <div className={styles.buttonWrapper}>
        <Button type="primary" htmlType="submit" loading={false}>
          Login
        </Button>
        <Link href="/signup">
          <a>
            <Button>회원가입</Button>
          </a>
        </Link>
      </div>
    </Form>
  );
};

export default LoginForm;

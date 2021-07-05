import React, { useCallback } from 'react';
import { Form, Input, Button } from 'antd';
import styles from '../styles/LoginForm.module.scss';
import useInput from '../hooks/useInput';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequestAction } from '../reducers/user';

const LoginForm = () => {
  const dispatch = useDispatch();
  const loginLoading = useSelector((state) => state.user);
  const [email, onChangeEmail] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback(() => {
    console.log('email, password :>> ', email, password);
    dispatch(loginRequestAction({ email, password }));
  }, [email, password]);

  return (
    <Form onFinish={onSubmitForm}>
      <label htmlFor="user-email">email</label>
      <Input
        name="user-email"
        type="email"
        value={email}
        onChange={onChangeEmail}
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
        <Button
          type="primary"
          htmlType="submit"
          loading={loginLoading}
        >
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

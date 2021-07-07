import React, { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import AppLayout from '../components/AppLayout';
import Head from 'next/head';
import { Form, Input, Button, Checkbox } from 'antd';
import useInput from '../hooks/useInput';
import styles from '../styles/LoginForm.module.scss';
import { SIGN_UP_REQUEST } from '../reducers/user';

const Signup = () => {
  const dispatch = useDispatch();
  const { signUpLoading } = useSelector(state => state.user);
  const [email, onChangeEmail] = useInput('');
  const [nickname, onChangeNickname] = useInput('');
  const [password, onChangePassword] = useInput('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState(false);
  const onChangeConfirmPassword = useCallback(
    e => {
      setConfirmPassword(e.target.value);
      setPasswordError(e.target.value !== password);
    },
    [password],
  );

  const [term, setTerm] = useState('');
  const [termError, setTermError] = useState(false);
  const onChangeTerm = useCallback(e => {
    setTerm(e.target.checked);
    setTermError(false);
  }, []);

  const onSubmit = useCallback(() => {
    if (password !== confirmPassword) {
      return setPasswordError(true);
    }
    if (!term) {
      return setTermError(true);
    }
    console.log('email,password,nickname', email, password, nickname);
    dispatch({
      type: SIGN_UP_REQUEST,
      data: {email, password, nickname}
    })
  }, [password, confirmPassword, term]);

  return (
    <AppLayout>
      <Head>
        <title>sign up</title>
      </Head>
      <Form onFinish={onSubmit}>
        <label htmlFor="user-email">email</label>
        <Input
          name="user-email"
          type="email"
          value={email}
          onChange={onChangeEmail}
          required
        />
        <label htmlFor="user-nickname">nickname</label>
        <Input
          name="user-nickname"
          type="text"
          value={nickname}
          onChange={onChangeNickname}
          required
        />
        <label htmlFor="user-password">password</label>
        <Input
          name="user-password"
          type="password"
          value={password}
          onChange={onChangePassword}
          required
        />
        <label htmlFor="user-confirm-password">confirm password</label>
        <Input
          name="user-confirm-password"
          type="password"
          value={confirmPassword}
          onChange={onChangeConfirmPassword}
          required
        />
        {passwordError && (
          <div className={styles.warning}>invalid password!</div>
        )}

        <Checkbox name="user-term" checked={term} onChange={onChangeTerm}>
          {' '}
          I agree to the Terms and Conditions
        </Checkbox>
        {termError && (
          <div className={styles.warning}>
            Please indicate that you have read and agree to the Terms and
            Conditions and Privacy Policy
          </div>
        )}
        <Button type="primary" htmlType="submit" loading={signUpLoading}>
          Sign Up{' '}
        </Button>
      </Form>
    </AppLayout>
  );
};

export default Signup;

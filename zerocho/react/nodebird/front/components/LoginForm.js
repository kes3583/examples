import React, {useCallback} from 'react';
import { Form, Input, Button} from 'antd';
import styles from '../styles/LoginForm.module.scss'
import useInput from '../hooks/useInput'
import PropTypes from 'prop-types'
import Link from 'next/link';

const LoginForm = ({setIsLoggedIn}) => {
  const [id, onChangeId] = useInput('');
  const [password, onChangePassword] = useInput('');

  const onSubmitForm = useCallback((e) => {
    console.log('id,password :>> ', id,password);
    setIsLoggedIn(true)
  }, [id, password])
  
  return (
    <Form onFinish={onSubmitForm}>
      <label htmlFor="user-id">ID</label>
      <Input name="user-id" type="text" value={id} onChange={onChangeId} required />
      <label htmlFor="user-password">Password</label>
      <Input 
        name="user-password"
        type="password"
        value={password}
        onChange={onChangePassword}
        required />
        <div className={styles.buttonWrapper}>
          <Button type="primary" htmlType="submit" loading={false} >
            Login
          </Button>
          <Link href="/signup"><a><Button>회원가입</Button></a></Link>
        </div>
        
    </Form>
  );
}

LoginForm.propTypes = {
  setIsLoggedIn: PropTypes.func.isRequired,
}
export default LoginForm;
import React, {useState, useCallback} from 'react';
import { Form, Input, Button} from 'antd';
import styles from '../styles/LoginForm.module.scss'

const LoginForm = () => {
  const [id, setId] = useState();
  const [password, setPassword] = useState();

  const onChangeId = useCallback((e) => {
    setId (e.target.value);
  }, [])

  cr

  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, [])
  
  return (
    <Form>
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
          <Button type="primary" htmlType="submit" loading={false}>
            Login
          </Button>
        </div>
        
    </Form>
  );
}

export default LoginForm;
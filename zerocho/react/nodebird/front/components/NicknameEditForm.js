import React, {useMemo, useCallback} from 'react';
import {Form, Input} from 'antd'
import {changeName} from '../reducers/action'
import {useDispatch} from 'react-redux'
import useInput from '../hooks/useInput'

const NicknameEditForm = () => {
  const [name, onChangeName] = useInput('');
  //const dispatch = useDispatch();

  const onSubmitForm = useCallback((e) => {
    console.log(`name`, name)
    e.preventDefault();
    //dispatch(changeName(name))
  }, [name])

  const styles = useMemo(() => ({marginBottom:'20px', border:'1px solid #d9d9d9', padding: '20px'}), []); //리렌더링 방지 급할때만 쓰도록하자 
  return (
    <Form onFinish={onSubmitForm}>
      <Input.Search addonBefore="nickname" enterButton="수정"  value={name} onChange={onChangeName} />
    </Form>
  );
}

export default NicknameEditForm;
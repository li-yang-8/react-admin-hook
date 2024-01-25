import React, { FC } from 'react';
import { Button, Form, Card, Input, message } from 'antd';
import langPageCardImg from '@/assets/img/land-page-card.jpg';
import { useNavigate } from 'react-router-dom';


const Login: FC = () => {

  const [messageApi,contextHolder] = message.useMessage();
  const navigate = useNavigate()

  const onFinish = (values: any) => {
    console.log('Success:', values);
    navigate('/land-page')
  };

  const onFinishFailed = () => {
    messageApi.error('请输入正确的用户名和密码');
  };

  return (
    <>
      {contextHolder}
      <div
        className="flex justify-center items-center h-screen bg"
        style={{ backgroundImage: `url(${langPageCardImg})` }}
      >
        <Card
          title='用户登入'
          hoverable
          headStyle={{
            textAlign: 'center'
          }}
        >
          <Form
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 800, minWidth:600 }}
            initialValues={{
              username:'admin',
              password: '123456'
            }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              labelCol={{span: 4, offset: 2}}
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input size="middle" />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              labelCol={{span: 4, offset: 2}}
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password size="middle"/>
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
              <Button type="primary" htmlType="submit">
              登入
              </Button>
            </Form.Item>
          </Form>
        </Card>

      </div>
    </>

  )
}
export default Login
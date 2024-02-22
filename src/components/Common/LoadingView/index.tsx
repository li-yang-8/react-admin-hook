import React from 'react';
import { Card } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';


const LoadingView: React.FC = () => {
  return (
    <section className="h-full w-full flex justify-center items-center">
      <Card
        className='flex justify-center items-center text-5xl text-center'
        style={{ width: '60%', height: '40%' }}
      >
        <LoadingOutlined />
        <p className='mt-4'>Loading</p>
      </Card>
    </section>
  )
}

export default LoadingView;
import React, {
  useState,
  useEffect
} from 'react';
import { Card } from 'antd';
const { Meta } = Card;

import langPageCardImg from '@/assets/img/land-page-card.jpg'

const LangPage: React.FC = () => {
  const [ loading, setLoading ] = useState<boolean>(false);

  useEffect(()=>{
    setLoading(true);
    const timer = setTimeout(()=> {
      setLoading(false)
    }, 1000)
    return ()=> {
      clearTimeout(timer)
    }
  }, [])

  return (
    <section className="h-full w-full flex justify-center items-center">
      <Card
        hoverable
        loading={loading}
        style={{ width: 400 }}
        cover={<img className="p-1" src={ langPageCardImg}/>}
      >
        <Meta title="React-admin-hook" description="https://blog.csdn.net/weixin_49405038?type=blog" />
      </Card>
    </section>
  )
}

export default LangPage
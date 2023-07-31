import React from "react";
import { Space, Table, Tag, Pagination,Button } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, addUserItem, clearAllData } from "@/utils/db";


interface DataType {
  id?: number;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'id',
    key: 'id',
    // render: (_,_1, index)=> <span>{ index}</span>
  },
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '地址',
    dataIndex: 'address',
    key: 'address',
  },
  {
    title: '标签',
    key: 'tags',
    dataIndex: 'tags',
    render: (_, { tags }) => (
      <>
        {tags.map((tag) => {
          let color = tag.length > 5 ? 'geekblue' : 'green';
          if (tag === 'loser') {
            color = 'volcano';
          }
          return (
            <Tag color={color} key={tag}>
              {tag.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
  },
  {
    title: '操作',
    key: 'action',
    render: (_, record) => (
      <Space size="middle">
        <a>Invite {record.name}</a>
        <a>Delete</a>
      </Space>
    ),
  },
];

// const data: DataType[] = [
//   {
//     id: 1,
//     name: 'John Brown',
//     age: 32,
//     address: 'New York No. 1 Lake Park',
//     tags: ['nice', 'developer'],
//   },
//   {
//     id: 2,
//     name: 'Jim Green',
//     age: 42,
//     address: 'London No. 1 Lake Park',
//     tags: ['loser'],
//   },
//   {
//     id: 2,
//     name: 'Joe Black',
//     age: 32,
//     address: 'Sydney No. 1 Lake Park',
//     tags: ['cool', 'teacher'],
//   },
// ];

const handleSizeChange = (page:number, pageSize:number) => {
  console.log(page, pageSize)
}

const handleAddItem = async () => {
  try {
    await addUserItem('zhangsan', 21, 'aaa', ['a','b'])
  } catch (error) {
    console.log('error', error)
  }
}

const handleClearItem = async () => {
  try {
    await clearAllData()
  } catch (error) {
    console.log('清除失败', error);
  }
}


const DbTable: React.FC = () => {
  const displayList = useLiveQuery(() => db.user.toArray(), []);
  return (
    <>
      <Table
        className="h-[70vh]"
        scroll={{ x: 'max-content', y: '80vh' }}
        pagination={false}
        columns={columns}
        rowKey={(record) => (record.id || 1).toString()}
        dataSource={displayList} />
      <div className="flex justify-end">
      <Button type='primary' onClick={handleAddItem}>添加</Button>
      <Button type='primary' onClick={handleClearItem}>清除</Button>
        <Pagination
          defaultCurrent={1}
          total={50}
          defaultPageSize={20}
          onChange={handleSizeChange} />
      </div>
    </>
  )
}
export default DbTable
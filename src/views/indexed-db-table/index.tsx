import React from "react";
import { Space, Table, Tag, Pagination } from 'antd';
import type { ColumnsType } from 'antd/es/table';


interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string[];
}

const columns: ColumnsType<DataType> = [
  {
    title: 'ID',
    dataIndex: 'key',
    key: 'key',
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

const data: DataType[] = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
    tags: ['nice', 'developer'],
  },
  {
    key: '2',
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
    tags: ['loser'],
  },
  {
    key: '3',
    name: 'Joe Black',
    age: 32,
    address: 'Sydney No. 1 Lake Park',
    tags: ['cool', 'teacher'],
  },
];

const handleSizeChange = (page:number, pageSize:number) => {
  console.log(page, pageSize)
}


const DbTable: React.FC = () => {
  return (
    <>
      <Table
        className="h-[80vh]"
        scroll={{ x: 'max-content', y: '80vh' }}
        pagination={false}
        columns={columns}
        dataSource={data} />
      <div className="flex justify-end">
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
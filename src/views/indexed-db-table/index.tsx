import React, { useState, useEffect } from 'react';
import { Space, Table, Tag, Button, Card, Modal, Form, Input, Select, InputNumber } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { useLiveQuery } from 'dexie-react-hooks';
import { db, clearAllData, updatedUser, deleteUserItem, UserList, searchUser } from '@/utils/db';


const { Option } = Select;
const { Search } = Input

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};

const handleClearItem = async () => {
  try {
    await clearAllData()
  } catch (error) {
    console.log('清除失败', error);
  }
}


const DbTable: React.FC = () => {
  const displayList: UserList[] = useLiveQuery(() => db.user.toArray(), []) as UserList[];
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalLoading, setModalLoading] = useState<boolean>(false);
  const [form] = Form.useForm();
  const [itemId, setItemId] = useState<number | null>(null)
  const [searchValue, setSearchValue] = useState<string>('')
  const [tableData, setTableData] = useState<UserList[]>([])
  const [searchData, setSearchData] = useState<UserList[]>([])

  useEffect(() => {
    if (searchValue) {
      setTableData(searchData)
    } else {
      setTableData(displayList)
    }
  }, [searchValue, displayList, searchData])

  const columns: ColumnsType<UserList> = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
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
            const color = tag.length > 5 ? 'geekblue' : 'green';
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
          <a onClick={()=>handleEditUserInfo(record)}>编辑</a>
          <a onClick={()=> handleDeleteUser(record.id)}>删除</a>
        </Space>
      ),
    },
  ];

  const handleEditUserInfo = (value: UserList) => {
    form.setFieldsValue(value)
    setItemId(value?.id || null)
    setModalVisible(true)
  }

  const handleDeleteUser = async (id: number) => {
    try {
      await deleteUserItem(id)
    } catch(error) {
      console.log('删除失败', error)
    }
  }

  const handleOpenAddModal = () => {
    form.resetFields()
    setItemId(null)
    setModalVisible(true)

  }

  const handleAddItem = async () => {
    try {
      setModalLoading(true)
      const values: Omit<UserList, 'id'> = await form.validateFields()
      try {
        const params: any= {...values}
        if (itemId) {
          params.id = itemId
        }
        await updatedUser(params)
      } catch (error) {
        console.log('error', error)
      } finally {
        setModalVisible(false)
      }
    } catch (error) {
      console.log('表单校验失败', error)
    } finally {
      setModalLoading(false)
    }
  }

  const handleSearchUser = async (value:string) => {
    try {
      setSearchValue(value)
      const data = await searchUser(value) as UserList[]
      setSearchData(data)
    } catch (error) {
      console.log('查询失败', error)
    }
  }

  const handleCancel = () => {
    console.log('取消')
    setModalVisible(false)
  }

  return (
    <>
      <Card className="mb-4 ">
        <div className="flex items-center justify-between w-full">
          <div>
            <Button type='primary' onClick={handleOpenAddModal}>添加用户</Button>
            <Button className="ml-4" type='primary' onClick={handleClearItem}>清除全部用户</Button>
          </div>
          <div>
            <Search placeholder="请输入姓名进行查询" onSearch={handleSearchUser} style={{ width: 200 }} />
          </div>
        </div>
      </Card>
      <Table
        scroll={{ x: 'max-content', y: '70vh' }}
        columns={columns}
        bordered
        rowKey={(record) => (record?.id || 1).toString()}
        dataSource={tableData}
        pagination={{ showSizeChanger: true, total: tableData?.length }}
      // onChange={handleSizeChange}
      />
      <Modal
        title="添加用户"
        open={modalVisible}
        onOk={handleAddItem}
        confirmLoading={modalLoading}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          labelAlign='left'
          form={form}
          name="control-hooks"
        >
          <Form.Item name="name" label="姓名" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="age" label="年龄" rules={[{ required: true }]}>
            <InputNumber className="w-full" controls={ false } />
          </Form.Item>
          <Form.Item name="address" label="地址" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="tags" label="标签" rules={[{ required: true }]}>
            <Select
              placeholder="选择标签"
              allowClear
              mode="multiple"
            >
              <Option value="前端工程师">前端工程师</Option>
              <Option value="java工程师">java工程师</Option>
              <Option value="golang工程师">golang工程师</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default DbTable
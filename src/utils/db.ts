import Dexie from 'dexie';
// import { useLiveQuery } from 'dexie-react-hooks'

export type UserList = {
  id: number;
  name: string;
  address: string;
  tags: string[]
  age:number
}

class Userlist extends Dexie {
  user!: Dexie.Table<UserList | Omit<UserList, 'id'>, number>
  constructor() {
    super('userList');
    this.version(1).stores({
      user: '++id, name,age, address, *tags'
    })
  }
}

export const db = new Userlist();

export const addUserItem = (name:string, age: number,address:string, tags:string[]) => {
  return db.user.add({
    name,
    address,
    tags,
    age,
  })
}

export const updatedUser = (
  {
    name,
    age,
    address, 
    tags,
    id
  }: {
      name: string,
      age: number,
      address: string,
      tags: string[],
      id?: number
}
) => {
  return db.user.put({
    id,
    name,
    address,
    tags,
    age,
  })
}

export const deleteUserItem = (id: number) => {
  db.user.delete(id)
}

export const searchUser = (value: string) => {
  return db.user.where('name').equals(value).toArray()
}

export const clearAllData = () => {
  return db.user.clear()
}
import Dexie from 'dexie';
// import { useLiveQuery } from 'dexie-react-hooks'

export interface UserList {
  id?: number;
  name: string;
  address: string;
  tags: string[]
  age:number
}

class Userlist extends Dexie {
  user!: Dexie.Table<UserList, number>
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

export const clearAllData = () => {
  return db.user.clear()
}
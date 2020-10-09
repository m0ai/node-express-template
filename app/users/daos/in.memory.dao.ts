export class GenericInMemoryDao {
  private static instance: GenericInMemoryDao
  users: any = []

  constructor() {
    console.log('Created new instance of GenericInMemoryDao')
  }

  static getInstance(): GenericInMemoryDao {
    if (!GenericInMemoryDao.instance) {
      GenericInMemoryDao.instance = new GenericInMemoryDao()
    }
    return GenericInMemoryDao.instance
  }

  addUser(user: any) {
    user.id = (this.users.length + 1).toString()
    this.users.push(user)
    return user.id
  }

  getUsers() {
    return this.users
  }

  getUserById(userId: string) {
    return this.users.find((user: { id: string }) => user.id === userId)
  }

  getByEmail(email: string) {
    return this.users.find((user: { email: string }) => user.email === email)
  }

  putUserById(user: any) {
    const objIndex = this.users.findIndex((obj: { id: any }) => obj.id === user.id)
    const updateUsers = [
      ...this.users.slice(0, objIndex),
      user,
      ...this.users.slice(objIndex + 1),
    ]
    this.users = updateUsers
    return `${user.id} updated via put`;
  }

  patchUserById(user: any) {
    const objIndex = this.users.findIndex((obj: { id: any }) => obj.id === user.id)
    let currentUser = this.users[objIndex]
    for (let i in user) {
      if (i !== 'id') {
        currentUser[i] = user[i]
      }
    }
    const updateUsers = [
      ...this.users.slice(0, objIndex),
      currentUser,
      ...this.users.slice(objIndex + 1),
    ]
    return `${user.id} patched`;
  }

  removeUserById(userId: string) {
    const objIndex = this.users.findIndex((obj: { id: any }) => obj.id === userId)
    this.users.splice(objIndex, 1)

    return `${userId} removed`;
  }
}

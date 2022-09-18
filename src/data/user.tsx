import axios from 'axios';
import { makeAutoObservable } from 'mobx';
import User from '../interfaces/User';

export const getAllUsers = async () => {
    try {
        const users = await axios.get('https://final-waze-project.uc.r.appspot.com/user');
        console.log(users.data);
        return users.data;
    }
    catch (error) {
        console.log('error-getUserFromServer ');
    }
}
export const getUserById = async (uid: string) => {
    try {
        const user = await axios.get(`https://final-waze-project.uc.r.appspot.com/user/${uid}`);
        console.log(user.data);
        return (user.data);
    }
    catch (error) {
        console.log('error-getUserFromServer ',error);
    }
}
export async function createUser(newUser:User){
    try {
    const user= await axios.post('https://final-waze-project.uc.r.appspot.com/user/', newUser);
    console.log(user.data);
    }
    catch (error) {
        console.log('error-createUser',error);
    }
}
class Store {

    user: User | any = null;
    users: User[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async get():Promise<User[]> {
        this.users = await getAllUsers();
        return this.users;
    }

    async getById(id: string): Promise<User>{
        this.user = await getUserById(id);
        return this.user;
    }

    async add(user: User): Promise<User>{
        await createUser(user);
        this.users = await this.get();
        return this.user;
    }
}

const UserStore = new Store();
export default UserStore;


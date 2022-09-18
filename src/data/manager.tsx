import axios from "axios";
import { makeAutoObservable } from 'mobx';
import Manager from "../interfaces/Manager";

export const getManager = async (managerId:string) => {

    try {
        const res= await axios.get(`https://final-waze-project.uc.r.appspot.com/manager/${managerId}`);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

export const createManager = async (manager:Manager) => {

    try {
        const res= await axios.post(`https://final-waze-project.uc.r.appspot.com/manager`,manager);
        return res.data;
    } catch (error) {
        console.error(error);
    }
}

class Store{

    manager:Manager|any=null;
    managers:Manager[]=[];

    constructor(){
        makeAutoObservable(this);
    }
    async getManager(managerId:string):Promise<Manager[]>{
        this.managers = await getManager(managerId);
        return this.managers;
    }
    async createManager(manager:Manager):Promise<Manager>{
        this.manager = await createManager(manager);
        return this.manager;
    }

}

const managerStore = new Store();
export default managerStore;
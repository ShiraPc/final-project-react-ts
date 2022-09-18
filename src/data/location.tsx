import axios from "axios";
import { makeAutoObservable } from 'mobx';
import Location from "../interfaces/Location";

 
const getLocations = async () => {
    try {
        const locations = await axios.get(`https://final-waze-project.uc.r.appspot.com/location`);
        return locations.data;
    } catch (error) {
        console.error(error);
    }
};

const getLocationsBySystemId = async (id:string) => {
    try {
        const locations = await axios.get(`https://final-waze-project.uc.r.appspot.com/location/${id}`);
        return locations.data;
    } catch (error) {
        console.error(error);
    }
}

const createLocationsBySystemId = async (location: Location) => {
    try {
        const newLocation = await axios.post(`https://final-waze-project.uc.r.appspot.com/location`, location);
        return newLocation.data;
    } catch (error) {
        console.error(error);
    }

}

const deleteLocation = async (id: string) => {
    try {
        await axios.delete(`https://final-waze-project.uc.r.appspot.com/location/${id}`);
    } catch (error) {
        console.error(error);
    }
};

const updateLocation = async (id: string, location: Location) => {
    try {
        const newLocation = await axios.put(`https://final-waze-project.uc.r.appspot.com/location/${id}`, location);
        return newLocation.data;
    } catch (error) {
        console.error(error);
    }
}

class Store {

    location: Location | any = null;
    locations: Location[] = [];
    allLocations: Location[] = [];

    constructor() {
        makeAutoObservable(this);
    }

    async getLocations(): Promise<Location[]> {
        this.allLocations = await getLocations();
        return this.allLocations;
    }

    async getLocationsBySystemId(id: string): Promise<Location[]> {
        this.locations = await getLocationsBySystemId(id);
        return this.locations;
    }

    async createLocationsBySystemId(location: Location): Promise<Location> {
        this.location = await createLocationsBySystemId(location);
        this.locations.push(location);
        return this.location;
    }

    async deleteLocation(id: string): Promise<void> {
        await deleteLocation(id);
        this.allLocations= await this.getLocations();
    }

    async updateLocation(id: string, location: Location): Promise<Location> {
        this.location = await updateLocation(id, location);
        return this.location;
    }

}

const locationStore = new Store();
export default locationStore;
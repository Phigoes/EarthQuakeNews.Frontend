import { EarthquakeAPI } from "@/plugins/EarthquakeAPI";
import type { Earthquake } from "@/types/earthquake";

export const getEarthquakes = async () : Promise<Earthquake[]> => {
    const response = await EarthquakeAPI.get('earthquakes')
    return response.data
}
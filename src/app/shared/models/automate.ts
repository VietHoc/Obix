import {SensorData} from './sensorData';


export class Automate {
  id: number;
  name: string;
  ip: string;
  uri: string;
  floor: number;
  active: boolean;
}

export class AutomateDetail {
  locationName: string;
  sensorsData: SensorData[];
}

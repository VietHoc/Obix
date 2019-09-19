import {SensorData} from './sensor-data';


export class Automate {
  id: number;
  name: string;
  ip: string;
  uri: string;
  floor: number;
  active: boolean;
}

export class AutomateDetail {
  locationIdentifier: string;
  sensorsData: SensorData[];
}

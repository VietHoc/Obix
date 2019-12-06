import {SensorData} from './sensor-data';


export class Automate {
  id: number;
  name: string;
  ip: string;
  uri: string;
  floor: number;
  sensorsCount?: number;
  active: boolean;
  constructor(init?: Partial<Automate>) {
    Object.assign(this, init);
  }
}

export class AutomateDetail {
  locationIdentifier: string;
  sensorsData: SensorData[];
}

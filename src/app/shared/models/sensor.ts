import {Time} from '@angular/common';

export class Sensor {
  id: number;
  automateId: string;
  sensortypeId: string;
  automateName: string;
  sensorTypeName: string;
  uri: string;
  name: string;
  locationName: string;
  locationIdentifier: string;
  status: number;
  creationDate: Time;
  modificationDate: Time;
}

export class SensorResponse {
  items: Sensor[];
  totalCount: number;
}

import {Time} from '@angular/common';

export class Sensor {
  id: number;
  automateId: string;
  sensorTypeId: string;
  automateName: string;
  sensorTypeName: string;
  sensorTypeType: string;
  uri: string;
  name: string;
  locationName: string;
  locationIdentifier: string;
  isActive: boolean;
  creationDate: Time;
  modificationDate: Time;

  constructor(init?: Partial<Sensor>) {
    Object.assign(this, init);
  }
}

export class SensorResponse {
  items: Sensor[];
  totalCount: number;
}

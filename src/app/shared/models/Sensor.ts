import {Time} from '@angular/common';

export interface Sensor {
  id: number;
  automateId: string;
  sensortypeId: string;
  uri: string;
  name: string;
  locationName: string;
  locationIdentifier: string;
  status: boolean;
  creationDate: Time;
  modificationDate: Time;
}

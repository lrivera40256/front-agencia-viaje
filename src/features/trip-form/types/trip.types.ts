import { Segment } from "./segment.types";

export interface Trip {
  startDate: string;
  endDate: string;
  destination: string;
  segments: Segment[];
}

interface baseDataType {
    id: number;
    name: string;
}
interface Departament extends baseDataType { }
interface City extends baseDataType { }
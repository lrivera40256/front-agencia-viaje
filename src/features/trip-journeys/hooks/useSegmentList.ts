// maneja journeys en memoria, dentro de tu wizard

import { useSegmentsContainer } from '@/features/trip-form/hooks/useSegementsContainer';
import { Segment } from '../../trip-form/types/segment.types'

export const useSegmentList = () => {
  const { segments } = useSegmentsContainer();
  // {
  //   order: 1,
  //   dateFrom: new Date("2023-11-01"),
  //   dateTo: new Date("2023-11-02"),
  //   departamentFrom: 1,
  //   departamentTo: 2,
  //   cityFrom: 10,
  //   cityTo: 20,
  //   vehicle: undefined,
  //   hotel: 5
  // },
  // {
  //   order: 2,
  //   dateFrom: new Date("2023-12-05"),
  //   dateTo: new Date("2023-12-10"),
  //   departamentFrom: 3,
  //   departamentTo: 4,
  //   cityFrom: 30,
  //   cityTo: 40,
  //   vehicle: undefined,
  //   hotel: 8
  // }
  return { segments };
};

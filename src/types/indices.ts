// Utility type to generate array indices from 0 to N-1
export type Indices<
  N extends number,
  Result extends number[] = []
> = number extends N
  ? number
  : Result["length"] extends N
  ? Result[number]
  : Indices<N, [...Result, Result["length"]]>;

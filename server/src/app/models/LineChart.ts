export interface LineChartResponse {
  title: TitleChartResponse;
  chart: ChartResponse;
  xaxis: XAxisResponse;
  series: Array<SeriesResponse>;
}

export interface TitleChartResponse {
  text: string;
}

export interface ChartResponse {
  height: number;
  type: string;
}

export interface XAxisResponse {
  categories: Array<string>;
}

export interface SeriesResponse {
  name: string;
  color: string;
  data: Array<number>;
}

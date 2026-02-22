declare module "react-simple-maps" {
  import type { ComponentType, ReactNode, MouseEvent } from "react";

  interface ProjectionConfig {
    scale?: number;
    center?: [number, number];
    rotate?: [number, number, number];
  }

  interface ComposableMapProps {
    projectionConfig?: ProjectionConfig;
    className?: string;
    children?: ReactNode;
  }

  interface ZoomableGroupProps {
    center?: [number, number];
    zoom?: number;
    minZoom?: number;
    maxZoom?: number;
    children?: ReactNode;
  }

  export interface GeoData {
    rsmKey: string;
    id: string | number;
    properties: { name: string; [key: string]: string };
    geometry: object;
    type: string;
  }

  interface GeographiesRenderProps {
    geographies: GeoData[];
  }

  interface GeographiesProps {
    geography: string | object;
    children: (props: GeographiesRenderProps) => ReactNode;
  }

  interface GeographyStyleState {
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    outline?: string;
    cursor?: string;
  }

  interface GeographyProps {
    geography: GeoData;
    fill?: string;
    stroke?: string;
    strokeWidth?: number;
    style?: {
      default?: GeographyStyleState;
      hover?: GeographyStyleState;
      pressed?: GeographyStyleState;
    };
    onMouseEnter?: (event: MouseEvent<SVGPathElement>) => void;
    onMouseMove?: (event: MouseEvent<SVGPathElement>) => void;
    onMouseLeave?: (event: MouseEvent<SVGPathElement>) => void;
    onClick?: (event: MouseEvent<SVGPathElement>) => void;
  }

  export const ComposableMap: ComponentType<ComposableMapProps>;
  export const Geographies: ComponentType<GeographiesProps>;
  export const Geography: ComponentType<GeographyProps>;
  export const ZoomableGroup: ComponentType<ZoomableGroupProps>;
}

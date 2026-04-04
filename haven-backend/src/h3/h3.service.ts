import { Injectable, Logger } from '@nestjs/common';
import * as h3 from 'h3-js';

@Injectable()
export class H3Service {
  private readonly logger = new Logger(H3Service.name);

  /**
   * Converts a lat/lng pair to an H3 index at a given resolution.
   */
  latLngToCell(lat: number, lng: number, res: number = 7): string {
    return h3.latLngToCell(lat, lng, res);
  }

  /**
   * Gets the center coordinates of an H3 cell.
   */
  cellToLatLng(h3Index: string): [number, number] {
    return h3.cellToLatLng(h3Index);
  }

  /**
   * Returns all neighboring cells within a certain distance (k-ring).
   */
  gridDisk(h3Index: string, k: number): string[] {
    return h3.gridDisk(h3Index, k);
  }

  /**
   * Checks if a point is within a given H3 cell.
   */
  isWithinCell(lat: number, lng: number, h3Index: string): boolean {
    const cell = this.latLngToCell(lat, lng, h3.getResolution(h3Index));
    return cell === h3Index;
  }

  /**
   * Calculates the distance between two H3 cells in kilometers.
   */
  getDistance(h3IndexA: string, h3IndexB: string): number {
    const coordsA = this.cellToLatLng(h3IndexA);
    const coordsB = this.cellToLatLng(h3IndexB);
    return h3.greatCircleDistance(coordsA, coordsB, 'km');
  }
}

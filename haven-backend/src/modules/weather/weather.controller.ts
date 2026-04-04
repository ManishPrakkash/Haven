import { Controller, Get, Query, Logger } from '@nestjs/common';
import { WeatherService } from './weather.service';

@Controller('weather')
export class WeatherController {
  private readonly logger = new Logger(WeatherController.name);

  constructor(private readonly weatherService: WeatherService) {}

  /**
   * Manually polls weather consensus for a specific location.
   * Useful for testing OWM vs IMD variance logic.
   */
  @Get('consensus')
  async getConsensus(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
  ) {
    this.logger.log(`Polling weather consensus for [${lat}, ${lon}]`);
    return await this.weatherService.getConsensusWeather(lat, lon);
  }

  /**
   * Returns current raw weather data from primary oracle.
   */
  @Get('current')
  async getCurrent(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
  ) {
    return await this.weatherService.getCurrentWeather(lat, lon);
  }
}

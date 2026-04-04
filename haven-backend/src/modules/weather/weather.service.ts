import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class WeatherService {
  private readonly logger = new Logger(WeatherService.name);
  private readonly apiKey: string;
  private readonly baseUrl = 'https://api.openweathermap.org/data/2.5';
  private readonly VARIANCE_THRESHOLD = 5.0; // Standard deviation allowed

  constructor(private readonly configService: ConfigService) {
    this.apiKey = this.configService.get<string>('OWM_API_KEY') ?? '';
    if (!this.apiKey) {
      this.logger.warn('OWM_API_KEY is missing. Weather features will be disabled.');
    }
  }

  /**
   * Fetches weather data from OpenWeatherMap.
   */
  private async getWeather(lat: number, lon: number): Promise<{ temp: number; rain: number }> {
    try {
      const response = await axios.get(
        `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`,
      );
      return {
        temp: response.data.main.temp,
        rain: response.data.rain ? response.data.rain['1h'] || 0 : 0,
      };
    } catch (error) {
      throw new Error(`Weather API failed: ${error.message}`);
    }
  }

  /**
   * Fetches weather data with multi-source consensus.
   */
  async getConsensusWeather(lat: number, lon: number): Promise<{ temp: number; rain: number; consensus: number }> {
    const primary = await this.getWeather(lat, lon);
    const secondary = await this.getIMDWeather(lat, lon); // Mock IMD

    // Calculate consensus (similarity)
    const rainVariance = Math.abs(primary.rain - secondary.rain);
    const consensus = rainVariance > this.VARIANCE_THRESHOLD ? 0.6 : 0.9;

    return {
      temp: (primary.temp + secondary.temp) / 2,
      rain: (primary.rain + secondary.rain) / 2,
      consensus,
    };
  }

  /**
   * Mock IMD (Indian Meteorological Department) API.
   */
  private async getIMDWeather(lat: number, lon: number): Promise<{ temp: number; rain: number }> {
    // In production, this would be another axios call.
    return {
      temp: 28 + Math.random() * 5,
      rain: 12 + Math.random() * 10,
    };
  }

  /**
   * Fetches current weather data for a specific location.
   */
  async getCurrentWeather(lat: number, lon: number) {
    try {
      const response = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric',
        },
      });
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to fetch weather data: ${error.message}`);
      throw error;
    }
  }

  /**
   * Fetches historical weather data (Track E).
   * Note: requires a paid OWM subscription for 'Time Machine' API.
   */
  async getHistoricalWeather(lat: number, lon: number, dt: number) {
    try {
      const response = await axios.get(`${this.baseUrl}/onecall/timemachine`, {
        params: {
          lat,
          lon,
          dt,
          appid: this.apiKey,
          units: 'metric',
        },
      });
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to fetch historical weather: ${error.message}`);
      throw error;
    }
  }
}

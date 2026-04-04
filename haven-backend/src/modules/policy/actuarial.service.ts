import { Injectable, Logger } from '@nestjs/common';

export class PricingQuoteRequest {
  avgDailySalary: number;
  city: string;
  age: number;
  planLevel: 'ECONOMY' | 'VALUE' | 'ELITE';
  isCleanRecord?: boolean; // Represents 8-week clean record
}

@Injectable()
export class ActuarialService {
  private readonly logger = new Logger(ActuarialService.name);

  // Hardcoded City Risk Index array representing our proxy for the XGBoost model outputs.
  private readonly cityRiskMap: Record<string, number> = {
    'Chennai': 1.15,     // High coastal flood risk
    'Bangalore': 1.05,   // Medium traffic/outage risk
    'Coimbatore': 0.95,  // Low risk
    'Hyderabad': 1.10,   // Medium-High heatwave risk
  };

  private readonly baseRates = {
    'ECONOMY': 0.07, // 7%
    'VALUE': 0.10,   // 10%
    'ELITE': 0.20,   // 20%
  };

  /**
   * Mathematically calculates the personalized premium utilizing ML-driven proxies.
   */
  calculateDynamicPremium(quoteReq: PricingQuoteRequest) {
    const cri = this.cityRiskMap[quoteReq.city] || 1.0;
    
    // Simulate age multiplier (younger/less experienced = slightly higher variance)
    const ageMultiplier = quoteReq.age < 25 ? 1.05 : quoteReq.age > 40 ? 1.02 : 1.0;
    
    // Base rate specific to the chosen Lock-in plan tier
    const baseRate = this.baseRates[quoteReq.planLevel];
    
    // Safety Score Multiplier (SSM)
    // Clean 8-week history grants a 12% automated discount
    let ssm = quoteReq.isCleanRecord ? 0.88 : 1.0;

    const premiumDaily = quoteReq.avgDailySalary * baseRate * cri * ageMultiplier * ssm;
    
    // Weekly premium formulation (working 6 days a week avg)
    const premiumWeekly = Math.round(premiumDaily * 6);
    
    // Payout limits
    const maxPayout = quoteReq.planLevel === 'ECONOMY' 
      ? Math.round(quoteReq.avgDailySalary * 0.7) 
      : quoteReq.avgDailySalary;

    return {
      premiumWeekly,
      maxPayout,
      appliedCRI: cri,
      appliedSSM: ssm,
    };
  }
}

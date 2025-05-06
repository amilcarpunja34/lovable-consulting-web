
export interface SimulatorLog {
  id: string;
  created_at: string;
  answers: Record<string, string>;
  result: {
    title: string;
    description: string;
    recommendedService: string;
    ctaText: string;
  };
}

export interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  quote: string;
  image_url: string;
  featured: boolean;
  created_at: string;
}

export type Product = {
  name: string;
  category: string;
  price: number;
  currency: string;
  image: string | { src: string; alt: string };
  bestseller: boolean;
  featured: boolean;
  details?: {
    dimmentions: { width: number; height: number };
    size: number;
    description: string;
    recommendations: [
      { src: string; alt: string },
      { src: string; alt: string },
      { src: string; alt: string }
    ];
  };
};

export interface MenuProduct {
  id: string;
  name: string;
  price: number;
  image?: string;
  description?: string;

  ingredients?: string[];

  proteinOptions?: string[];
  vegetableOptions?: string[];

  sauces?: string[];

  pieces?: number;

  details?: string[];

  note?: string;
}
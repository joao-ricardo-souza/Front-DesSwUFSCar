declare interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  pictureUrl: string;
}

declare interface NewProduct {
  name: string;
  description: string;
  price: number;
  category: string;
  pictureUrl: string;
}

declare interface ImportProduct {
  selected: boolean;
  name: string;
  description: string;
  price: number;
  category: string;
  pictureUrl: string;
  onToggle?: () => void;
}

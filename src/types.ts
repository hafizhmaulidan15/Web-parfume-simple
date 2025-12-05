export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  description: string;
  notes: string[]; // e.g., ["Oud", "Rose", "Amber"]
  image: string;
  isNew?: boolean;
  category: 'Men' | 'Women' | 'Unisex';
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

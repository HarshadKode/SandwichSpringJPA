export type BreadType = 'WHITE' | 'BROWN';

export interface Sandwich {
  id: number;
  name: string;
  description: string;
  category: string;
  basePrice: number;
}

export interface Person {
  firstName: string;
  lastName: string;
}

export interface Course {
  title: string;
}

export interface SandwichOrder {
  orderDate: string; // yyyy-MM-dd
  course: Course;
}

export interface SandwichOrderDetail {
  sandwich: Sandwich;
  amount: number;
  breadType: BreadType;
  vegetables: boolean;
  comment: string;
  person: Person;
  sandwichOrder: SandwichOrder;
}

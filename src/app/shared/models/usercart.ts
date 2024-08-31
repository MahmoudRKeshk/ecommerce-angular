export interface UserCart {
    status: string;
    numOfCartItems: number;
    data: Data;
  }
  
  interface Data {
    _id: string;
    cartOwner: string;
    products: CartProduct[];
    createdAt: string;
    updatedAt: string;
    __v: number;
    totalCartPrice: number;
  }
  
  interface CartProduct {
    count: number;
    _id: string;
    product: Product;
    price: number;
  }
  
  interface Product {
    subcategory: Subcategory[];
    _id: string;
    title: string;
    quantity: number;
    imageCover: string;
    category: Category;
    brand: Category;
    ratingsAverage: number;
    id: string;
  }
  
  interface Category {
    _id: string;
    name: string;
    slug: string;
    image: string;
  }
  
  interface Subcategory {
    _id: string;
    name: string;
    slug: string;
    category: string;
  }
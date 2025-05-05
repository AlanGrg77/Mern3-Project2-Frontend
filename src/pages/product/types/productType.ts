export interface ICategory { 
    id: string;
    categoryName: string;
  }
  
  export interface Review {
    userId: string | null;
    username: string | null | undefined
    rating: number; // 1 to 5
    comment: string;
    createdAt: string; // ISO string
    updatedAt: string;
  }
  
  export interface IProduct {
    id: string;
    productName: string;
    productDescription: string;
    productPrice: number;
    productTotalStock: number;
    discount: number;
    productImageUrl: string;
    createdAt: string;
    updatedAt: string; // fixed typo here
    category: ICategory;
    reviews?: Review[]; // optional unless always included
  }
  
  export interface IProductState {
    products: IProduct[];
    status: string | null;
    error: string | null;
    product: IProduct | null;
  }
  
import { Status } from "../../../globals/types/authType";


export interface ICategory{ 
    id : string,
    categoryName: string
}
export interface IProduct{
    id : string,
    productName : string,
    productDescription : string
    productPrice : number,
    productTotalStock : number,
    discount : number,
    productImageUrl : string,
    createdAt : string,
    updateAt : string,
    category : ICategory
}

export interface IProductState{
    products : IProduct[],
    status : string | null,
    error : string | null
    product : IProduct | null
}
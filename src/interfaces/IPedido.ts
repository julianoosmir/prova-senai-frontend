import { ICliente } from "./ICliente";

export interface IPedido{
    id?:number,
    descricao:string,
    valor:number,
    cliente: ICliente
}
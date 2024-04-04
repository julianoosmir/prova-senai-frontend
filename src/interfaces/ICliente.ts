import { IEndereco } from "./IEndereco";

export interface ICliente{
    id?:number,
    nome:string,
    endereco:IEndereco
}
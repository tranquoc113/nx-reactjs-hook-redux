export interface Navigation{
  title?:string;
  icon?:any;
  key?:string;
  submenu?:[
    {
      key?:string;
      title?:string;
    }
  ]
}

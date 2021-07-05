export interface Navigation{
  title?:string;
  icon?:any;
  key?:string;
  url?:string;
  items?:[
    {
      title?:any;
      url?:any;
    }
  ]
}

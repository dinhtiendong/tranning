export interface TodoProp {
    id: string;
    name: string;
    status: boolean;
    point: number;
    priority: string;
    flag: boolean;
  }

export interface AddTodoProp
{
   name: string;
   status: boolean;
   point: number;
   priority: string;
   flag: boolean;

}
//  .d.ts laf vì file này k cần combine ra js vì js ko cần nghĩa các kiểu nên có để để tránh combine

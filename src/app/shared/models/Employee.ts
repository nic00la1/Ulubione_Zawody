export class Employee {
    constructor(
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public profession: string,
        public salary: number,
        public startDate: string,
        public isFullTime: boolean,
        public id?: string
    ) {}
} 

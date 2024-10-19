export default class Contract{
    private _salary: number
    private _years: number
    private _endYear: number

    public constructor(salary: number, years: number, endYear: number){
        this._salary = salary
        this._years = years
        this._endYear = endYear
    }
    public get salary(): number{
        return this._salary
    }
    public get years(): number{
        return this._years
    }
    public get endYear(): number{
        return this._endYear
    }
    public set salary(value: number){
        this._salary = value
    }
    public set years(value: number){
        this._years = value
    }
    public set endYear(value: number){
        this._endYear = value
    }
    public toObject(){
        return{
            salary: this._salary,
            years: this._years,
            endYear: this._endYear
        }
    }
}
export default class Attributes{
    private _age: number
    private _level: number
    private _exp: number
    private _overall: number
    //QB: throwing accuracy, WR & RB & TE: catching, OL: blocking, DL: tackling, LB & CB & S: coverage, K & P: kick accuracy
    private _skill: number
    private _speed: number
    //QB: throwing power, K & P: kick power
    private _strength: number
    private _endurance: number
    private _overallPotential: number
    private _skillPotential: number
    private _speedPotential: number
    private _strengthPotential: number
    private _endurancePotential: number

    public constructor(age: number, skill: number, speed: number, strength: number, endurance: number, skillPotential: number, speedPotential: number, strengthPotential: number, enduracePotential: number){
        this._age = age
        this._level = 1
        this._exp = 0
        this._overall = Math.round((skill + speed + strength + endurance) / 4)
        this._skill = skill
        this._speed = speed
        this._strength = strength
        this._endurance = endurance
        this._overallPotential = Math.round((skillPotential + speedPotential + strengthPotential + enduracePotential) / 4)
        this._skillPotential = skillPotential
        this._speedPotential = speedPotential
        this._strengthPotential = strengthPotential
        this._endurancePotential = enduracePotential
    }
    public get age(): number{
        return this._age
    }
    public get level(): number{
        return this._level
    }
    public get exp(): number{
        return this._exp
    }
    public get overall(): number{
        return this._overall
    }
    public get skill(): number{
        return this._skill
    }
    public get speed(): number{
        return this._speed
    }
    public get strength(): number{
        return this._strength
    }
    public get endurance(): number{
        return this._endurance
    }
    public get skillPotential(): number{
        return this._skillPotential
    }
    public get speedPotential(): number{
        return this._speedPotential
    }
    public get strengthPotential(): number{
        return this._strengthPotential
    }
    public get endurancePotential(): number{
        return this._endurancePotential
    }
    public get expString(): string{
        return this._exp + " / " + Math.round(100 * 1.1**(this._level - 1))
    }
    public set age(value: number){
        this._age = value
    }
    public checkLevel(){
        if(this._exp >= Math.round(100 * 1.1**(this._level - 1))){
            this._exp -= Math.round(100 * 1.1**(this._level - 1))
            this._level ++
            this._skill += (this._skillPotential - this._skill) / 9
            this._speed += (this._speedPotential - this._speed) / 9
            this._strength += (this._strengthPotential - this._strength) / 9
            this._endurance += (this._endurancePotential - this._endurance) / 9
            this._overall = (this._skill + this._speed + this._strength + this._endurance) / 4
        }
    }
    public toObject(){
        return{
            age: this._age,
            level: this._level,
            exp: this._exp,
            overall: this._overall,
            skill: this._skill,
            speed: this._speed,
            strength: this._strength,
            endurance: this._endurance,
            overallPotential: this._overallPotential,
            skillPotential: this._skillPotential,
            speedPotential: this._speedPotential,
            strengthPotential: this._strengthPotential,
            endurancePotential: this._endurancePotential
        }
    }
}
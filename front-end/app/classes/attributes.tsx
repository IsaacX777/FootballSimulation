export default class Attributes{
    private _age: number
    private _level: number
    private _exp: number
    private _overall: number
    private _power: number
    private _accuracy: number
    private _speed: number
    private _strength: number
    private _endurance: number
    private _powerPotential: number
    private _accuracyPotential: number
    private _speedPotential: number
    private _strengthPotential: number
    private _endurancePotential: number

    public constructor(age: number, overall: number, power: number, accuracy: number, speed: number, strength: number, endurance: number, powerPotential: number, accuracyPotential: number, speedPotential: number, strengthPotential: number, enduracePotential: number){
        this._age = age
        this._level = 1
        this._exp = 0
        this._overall = overall
        this._power = power
        this._accuracy = accuracy
        this._speed = speed
        this._strength = strength
        this._endurance = endurance
        this._powerPotential = powerPotential
        this._accuracyPotential = accuracyPotential
        this._speedPotential = speedPotential
        this._strengthPotential = strengthPotential
        this._endurancePotential = enduracePotential
    }
    public get age(): number{
        return this._age
    }
    public set age(value: number){
        this._age = value
    }
    public checkLevel(){
        if(this._exp >= 100 * 1.1**(this._level - 1)){
            this._exp -= 100 * 1.1**(this._level - 1)
            this._level ++
            this._power += (this._powerPotential - this._power) / 9
            this._accuracy += (this._accuracyPotential - this._accuracy) / 9
            this._speed += (this._speedPotential - this._speed) / 9
            this._strength += (this._strengthPotential - this._strength) / 9
            this._endurance += (this._endurancePotential - this._endurance) / 9
        }
    }
}
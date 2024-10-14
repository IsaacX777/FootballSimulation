import Contract from "./contract"
import Stats from "./stats"
import Attributes from "./attributes"

export default class Player{
    private _name: string
    private _position: string
    private _contract: Contract
    private _stats: Stats[][]
    private _injuryWeeks: number
    private _attributes: Attributes

    public constructor(name: string, position: string, contract: Contract, attributes: Attributes){
        this._name = name
        this._position = position
        this._contract = contract
        this._attributes = attributes
        this._stats = new Array<Stats[]>()
        this._injuryWeeks = 0
    }
    public get name(): string{
        return this._name
    }
    public get position(): string{
        return this._position
    }
    public get contract(): Contract{
        return this._contract
    }
    public get attributes(): Attributes{
        return this._attributes
    }
    public get stats(): Stats[][]{
        return this._stats
    }
    public get injuryWeeks(): number{
        return this._injuryWeeks
    }
    public set name(value: string){
        this._name = value
    }
    public set position(value: string){
        this._position = value
    }
    public set contract(value: Contract){
        this._contract = value
    }
    public set injuryWeeks(value: number){
        this._injuryWeeks = value
    }
    public addStats(value: Stats, newSeason: boolean){
        if(newSeason){
            this._stats.push(new Array<Stats>())
        }
        this._stats[this._stats.length - 1].push(value)
    }
}
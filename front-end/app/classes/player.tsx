import Contract from "./contract"
import Stats from "./stats"
import Attributes from "./attributes"

export default class Player{
    private _name: string
    private _position: string
    private _contract: Contract
    private _stats: Map<number, Map<string, Stats>>
    private _injuryWeeks: number
    private _attributes: Attributes

    public constructor(name: string, position: string, contract: Contract, attributes: Attributes){
        this._name = name
        this._position = position
        this._contract = contract
        this._attributes = attributes
        this._stats = new Map<number, Map<string, Stats>>()
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
    public get stats(): Map<number, Map<string, Stats>>{
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
    public addStats(value: Stats, season: number, opponent: string){
        if(!this._stats.has(season)){
            this._stats.set(season, new Map<string, Stats>())
        }
        this._stats.get(season)!.set(opponent, value)
    }
    public toObject(){
        const convertStats = (map: Map<number, Map<string, Stats>>) => {
            return Object.fromEntries(
                Array.from(map.entries()).map(([key, statsMap]) => [
                    key, 
                    Object.fromEntries(
                        Array.from(statsMap.entries()).map(([innerKey, stats]) => [
                            innerKey,
                            stats.toObject()
                        ])
                    )
                ])
            )
        }
        return{
            name: this._name,
            position: this._position,
            contract: this._contract.toObject(),
            careerStats: convertStats(this.stats),
            injuryWeeks: this._injuryWeeks,
            attributes: this._attributes.toObject()
        }
    }
}
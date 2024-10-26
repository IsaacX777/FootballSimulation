import Contract from "./contract"
import Stats from "./stats"
import Attributes from "./attributes"

export default class Player{
    private _position: string
    private _contract: Contract
    private _stats: Map<string, Map<string, Stats>>
    private _injuryWeeks: number
    private _attributes: Attributes
    private _isStarter: boolean

    public constructor(position: string, contract: Contract, attributes: Attributes, stats: Map<string, Map<string, Stats>>, injuryWeeks: number, isStarter: boolean){
        this._position = position
        this._contract = contract
        this._attributes = attributes
        this._stats = stats
        this._injuryWeeks = injuryWeeks
        this._isStarter = isStarter
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
    public get stats(): Map<string, Map<string, Stats>>{
        return this._stats
    }
    public get injuryWeeks(): number{
        return this._injuryWeeks
    }
    public get isStarter(): boolean{
        return this._isStarter
    }
    public get injuryWeeksString(): string{
        return this._injuryWeeks === 0 ? "N/A" : this._injuryWeeks + " weeks"
    }
    public get contractString(): string{
        if(this._contract.years === 1){
            return this._contract.salary > 1000000 ? "$" + this._contract.salary/1000000 + "M for " + this._contract.years + " year" : "$" + this._contract.salary/1000 + "K for " + this._contract.years + " year"
        }
        return this._contract.salary > 1000000 ? "$" + this._contract.salary/1000000 + "M for " + this._contract.years + " years" : "$" + this._contract.salary/1000 + "K for " + this._contract.years + " years"
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
    public set stats(value: Map<string, Map<string, Stats>>){
        this._stats = value
    }
    public set isStarter(value: boolean){
        this._isStarter = value
    }
    public addStats(value: Stats, season: string, opponent: string){
        if(!this._stats.has(season)){
            this._stats.set(season, new Map<string, Stats>())
        }
        this._stats.get(season)!.set(opponent, value)
    }
    public toObject(){
        const convertStats = (map: Map<string, Map<string, Stats>>) => {
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
            position: this._position,
            contract: this._contract.toObject(),
            careerStats: convertStats(this.stats),
            injuryWeeks: this._injuryWeeks,
            attributes: this._attributes.toObject(),
            isStarter: this._isStarter
        }
    }
}
export default class Stats{
    private _passingYD: number
    private _passingTD: number
    private _intsThrown: number
    private _passingATT: number
    private _completions: number
    private _rushingYD: number
    private _rushingTD: number
    private _rushingATT: number
    private _fumbles: number
    private _targets: number
    private _receptions: number
    private _receivengYD: number
    private _receivengTD: number
    private _blockWinRate: number
    private _sacksAllowed: number
    private _tackles: number
    private _sacks: number
    private _defensiveTD: number
    private _interceptions: number
    private _forcedFumbles: number
    private _fumbleRecoveries: number
    private _extraPointATT: number
    private _extraPointGood: number
    private _fieldGoalATT: number
    private _fieldGoalGood: number
    private _puntATT: number
    private _puntYD: number
    private _kickReturnATT: number
    private _kickReturnYD: number
    private _kickReturnTD: number
    private _puntReturnATT: number
    private _puntReturnYD: number
    private _puntReturnTD: number

    public constructor(stats: number[]){
        this._passingYD = stats[0]
        this._passingTD = stats[1]
        this._intsThrown = stats[2]
        this._passingATT = stats[3]
        this._completions = stats[4]
        this._rushingYD = stats[5]
        this._rushingTD = stats[6]
        this._rushingATT = stats[7]
        this._fumbles = stats[8]
        this._targets = stats[9]
        this._receptions = stats[10]
        this._receivengYD = stats[11]
        this._receivengTD = stats[12]
        this._blockWinRate = stats[13]
        this._sacksAllowed = stats[14]
        this._tackles = stats[15]
        this._sacks = stats[16]
        this._defensiveTD = stats[17]
        this._interceptions = stats[18]
        this._forcedFumbles = stats[19]
        this._fumbleRecoveries = stats[20]
        this._extraPointATT = stats[21]
        this._extraPointGood = stats[22]
        this._fieldGoalATT = stats[23]
        this._fieldGoalGood = stats[24]
        this._puntATT = stats[25]
        this._puntYD = stats[26]
        this._kickReturnATT = stats[27]
        this._kickReturnYD = stats[28]
        this._kickReturnTD = stats[29]
        this._puntReturnATT = stats[30]
        this._puntReturnYD = stats[31]
        this._puntReturnTD = stats[32]
    }
    public get passingYD(): number{
        return this._passingYD
    }
    public toObject(){
        return{
            passingYD: this._passingYD,
            passingTD: this._passingTD,
            intsThrown: this._intsThrown,
            passingATT: this._passingATT,
            completions: this._completions,
            rushingYD: this._rushingYD,
            rushingTD: this._rushingTD,
            rushingATT: this._rushingATT,
            fumbles: this._fumbles,
            targets: this._targets,
            receptions: this._receptions,
            receivengYD: this._receivengYD,
            receivengTD: this._receivengTD,
            blockWinRate: this._blockWinRate,
            sacksAllowed: this._sacksAllowed,
            tackles: this._tackles,
            sacks: this._sacks,
            defensiveTD: this._defensiveTD,
            interceptions: this._interceptions,
            forcedFumbles: this._forcedFumbles,
            fumbleRecoveries: this._fumbleRecoveries,
            extraPointATT: this._extraPointATT,
            extraPointGood: this._extraPointGood,
            fieldGoalATT: this._fieldGoalATT,
            fieldGoalGood: this._fieldGoalGood,
            puntATT: this._puntATT,
            puntYD: this._puntYD,
            kickReturnATT: this._kickReturnATT,
            kickReturnYD: this._kickReturnYD,
            kickReturnTD: this._kickReturnTD,
            puntReturnATT: this._puntReturnATT,
            puntReturnYD: this._puntReturnYD,
            puntReturnTD: this._puntReturnTD
        }
    }
}
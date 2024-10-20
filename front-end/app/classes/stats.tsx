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
    private _receivingYD: number
    private _receivingTD: number
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

    public constructor(passingYD: number, passingTD: number, intsThrown: number, passingATT: number, completions: number, rushingYD: number, rushingTD: number, rushingATT: number, fumbles: number, targets: number, receptions: number, receivingYD: number, receivingTD: number, blockWinRate: number, sacksAllowed: number, tackles: number, sacks: number, defensiveTD: number, interceptions: number, forcedFumbles: number, fumbleRecoveries: number, extraPointATT: number, extraPointGood: number, fieldGoalATT: number, fieldGoalGood: number, puntATT: number, puntYD: number, kickReturnATT: number, kickReturnYD: number, kickReturnTD: number, puntReturnATT: number, puntReturnYD: number, puntReturnTD: number){
        this._passingYD = passingYD
        this._passingTD = passingTD
        this._intsThrown = intsThrown
        this._passingATT = passingATT
        this._completions = completions
        this._rushingYD = rushingYD
        this._rushingTD = rushingTD
        this._rushingATT = rushingATT
        this._fumbles = fumbles
        this._targets = targets
        this._receptions = receptions
        this._receivingYD = receivingYD
        this._receivingTD = receivingTD
        this._blockWinRate = blockWinRate
        this._sacksAllowed = sacksAllowed
        this._tackles = tackles
        this._sacks = sacks
        this._defensiveTD = defensiveTD
        this._interceptions = interceptions
        this._forcedFumbles = forcedFumbles
        this._fumbleRecoveries = fumbleRecoveries
        this._extraPointATT = extraPointATT
        this._extraPointGood = extraPointGood
        this._fieldGoalATT = fieldGoalATT
        this._fieldGoalGood = fieldGoalGood
        this._puntATT = puntATT
        this._puntYD = puntYD
        this._kickReturnATT = kickReturnATT
        this._kickReturnYD = kickReturnYD
        this._kickReturnTD = kickReturnTD
        this._puntReturnATT = puntReturnATT
        this._puntReturnYD = puntReturnYD
        this._puntReturnTD = puntReturnTD
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
            receivengYD: this._receivingYD,
            receivengTD: this._receivingTD,
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
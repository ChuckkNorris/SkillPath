import {BaseModel} from '../export'

// 'tags/<tierKey>/<tagKey>'
export class TagModel extends BaseModel {
    
    private _name : string;
    public get name() : string {
        return this._name;
    }
    public set name(v : string) {
        this._name = v;
        this.key = v;
    }
    tier: number;
}
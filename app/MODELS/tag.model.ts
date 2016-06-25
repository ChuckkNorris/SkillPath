import {BaseModel} from '../export'

// 'tags/<tierKey>/<tagKey>'
export class TagModel extends BaseModel {

    constructor(tier?: number, tagObject?: any) {
        super();
        if (tier)
            this.tier = tier;
        if (tagObject) {
            this.createTagFromObject(tagObject);
        }

        
    }
    private _name : string;
    public get name() : string {
        return this._name;
    }
    public set name(v : string) {
        this._name = v;
        this.key = v;
    }
    tier: number;

    parent: TagModel;

    private createTagFromObject(tagObject: any) {
        
    }
}
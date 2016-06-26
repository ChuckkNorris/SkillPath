import {BaseModel} from '../export'

// 'tags/<tierKey>/<tagKey>'
export class TagModel extends BaseModel {

    constructor(tier?: number) {
        super();
        if (tier)
            this.tier = tier;
        // if (tagObject) {
        //     this.createTagFromObject(tagObject);
        // }
        // , tagObject?: any
    }
    public _name : string;
    public get name() : string {
        return this._name;
    }
    public set name(v : string) {
        this._name = v;
        this.key = v;
    }
    tier: number;

    parent: TagModel;

    public toFirebaseObject(): any {
        let toReturn = {
            name: this._name,
        };
        return toReturn;
    }

    private removeUnderstoreKeys(object: any): any{
        
    }

   
}

class TagFirebaseModel {

}
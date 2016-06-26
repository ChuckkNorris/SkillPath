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
    public name : string;
    public get _name() : string {
        return this.name;
    }
    public set _name(v : string) {
        this.name = v;
        this.key = v;
    }
    tier: number;

    parent: TagModel;

    public toFirebaseObject(): any {
        let toReturn = {
            name: this.name,
        };
        return toReturn;
    }

    private removeUnderstoreKeys(object: any): any{
        
    }

   
}

class TagFirebaseModel {

}
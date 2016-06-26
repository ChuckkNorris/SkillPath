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

    public static formatParentKey(parentTag: TagModel): string{
        let toReturn = undefined;
        if (parentTag)
            toReturn = parentTag.tier + '_' + parentTag.key;
        return toReturn;
    }

    public static getAllParentKeysFormatted(parentTag: TagModel): string[] {
        let toReturn = [];
        if (parentTag) {
            toReturn.push(TagModel.formatParentKey(parentTag));
            if (parentTag.parent){
                toReturn.push(TagModel.formatParentKey(parentTag.parent));
                if (parentTag.parent.parent) {
                    toReturn.push(TagModel.formatParentKey(parentTag.parent.parent));
                    if (parentTag.parent.parent.parent) {
                        toReturn.push(TagModel.formatParentKey(parentTag.parent.parent.parent));
                    }
                }
                
            }
        }
        return  toReturn;
    }

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
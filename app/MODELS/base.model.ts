export abstract class BaseModel {
    
    private _key : string;
    public get key() : string {
        return this._key;
    }
    public set key(v : string) {
        this._key = BaseModel.formatAsKey(v);
    }
    
    //key: string;

    private static formatAsKey(unformattedKey: string) : string {
        return  unformattedKey.trim().toLowerCase().replace(' ', '-').replace('/','-');
    }
}
import {BaseModel, TagModel} from '../export';

export class TierModel extends BaseModel {
    title: string;
    tags: TagModel[];
    tutorialUrl: string;
}
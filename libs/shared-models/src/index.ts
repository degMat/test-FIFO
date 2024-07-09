export * from './lib/shared-models';

export enum EntityState {
  ARCHIVED = 'ARCHIVED',
  NON_CONSUMED ='NON_CONSUMED',
  CONSUMED = 'CONSUMED'
}

export interface Action {
  id: number;
  libelle: string;
  typeActionId: number;
  createdAt: Date;
  state : EntityState
}
export interface TypeAction {
  id: number;
  //TODO
}
export interface Credit {
  id: number;
  //TODO
}

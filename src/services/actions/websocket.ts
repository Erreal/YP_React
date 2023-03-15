import { IWsData } from '../../utils/types';

export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' =
  'WS_CONNECTION_SUCCESS';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' =
  'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_END: 'WS_CONNECTION_END' = 'WS_CONNECTION_END';
export const WS_GET_DATA: 'WS_GET_DATA' = 'WS_GET_DATA';

export const WS_CONNECTION_START_PROFILE: 'WS_CONNECTION_START_PROFILE' =
  'WS_CONNECTION_START_PROFILE';
export const WS_CONNECTION_SUCCESS_PROFILE: 'WS_CONNECTION_SUCCESS_PROFILE' =
  'WS_CONNECTION_SUCCESS_PROFILE';
export const WS_CONNECTION_ERROR_PROFILE: 'WS_CONNECTION_ERROR_PROFILE' =
  'WS_CONNECTION_ERROR_PROFILE';
export const WS_CONNECTION_CLOSED_PROFILE: 'WS_CONNECTION_CLOSED_PROFILE' =
  'WS_CONNECTION_CLOSED_PROFILE';
export const WS_CONNECTION_END_PROFILE: 'WS_CONNECTION_END_PROFILE' =
  'WS_CONNECTION_END_PROFILE';
export const WS_GET_DATA_PROFILE: 'WS_GET_DATA_PROFILE' = 'WS_GET_DATA_PROFILE';

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
}
export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}
export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}
export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}
export interface IWsGetData {
  readonly type: typeof WS_GET_DATA;
  payload: IWsData;
}
export interface IWsConnectionEnd {
  readonly type: typeof WS_CONNECTION_END;
}

export type TWSActionsFeed =
  | IWsConnectionStart
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsConnectionClosed
  | IWsGetData
  | IWsConnectionEnd;

export interface IWsConnectionStartProfile {
  readonly type: typeof WS_CONNECTION_START_PROFILE;
  payload: string;
}
export interface IWsConnectionSuccessProfile {
  readonly type: typeof WS_CONNECTION_SUCCESS_PROFILE;
}
export interface IWsConnectionErrorProfile {
  readonly type: typeof WS_CONNECTION_ERROR_PROFILE;
}
export interface IWsConnectionClosedProfile {
  readonly type: typeof WS_CONNECTION_CLOSED_PROFILE;
}
export interface IWsGetDataProfile {
  readonly type: typeof WS_GET_DATA_PROFILE;
  payload: IWsData;
}
export interface IWsConnectionEndProfile {
  readonly type: typeof WS_CONNECTION_END_PROFILE;
}

export type TWSActionsProfile =
  | IWsConnectionStartProfile
  | IWsConnectionSuccessProfile
  | IWsConnectionErrorProfile
  | IWsConnectionClosedProfile
  | IWsGetDataProfile
  | IWsConnectionEndProfile;

export type TWSActions = TWSActionsFeed | TWSActionsProfile;

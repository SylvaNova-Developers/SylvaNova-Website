export interface McServerStatusPayload {
  online: boolean;
  playersOnline: number;
  playersMax: number;
}

export const EMPTY_MC_SERVER_STATUS: McServerStatusPayload = {
  online: false,
  playersOnline: 0,
  playersMax: 0,
};

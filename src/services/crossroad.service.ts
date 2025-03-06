import client from "../lib/api/client";

export const getCrossroadState = async (crossroadId: number) => {
  return await client.get(`/api/crossroads/${String(crossroadId)}/state`);
};

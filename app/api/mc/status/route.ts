import { NextResponse } from "next/server";
import { MINECRAFT_SERVER_ADDRESS } from "@/lib/constants";
import {
  EMPTY_MC_SERVER_STATUS,
  type McServerStatusPayload,
} from "@/lib/mc-server-status";

export async function GET(): Promise<NextResponse<McServerStatusPayload>> {
  try {
    const response = await fetch(
      `https://api.mcsrvstat.us/3/${MINECRAFT_SERVER_ADDRESS}`,
      { next: { revalidate: 45 } }
    );

    if (!response.ok) {
      return NextResponse.json(EMPTY_MC_SERVER_STATUS);
    }

    const data = (await response.json()) as {
      online?: boolean;
      players?: { online?: number; max?: number };
    };

    return NextResponse.json({
      online: Boolean(data.online),
      playersOnline: data.players?.online ?? 0,
      playersMax: data.players?.max ?? 0,
    });
  } catch {
    return NextResponse.json(EMPTY_MC_SERVER_STATUS);
  }
}

/** @format */

import { acceptChallenge, streamOfGameEvents } from "../../../lib/games";
import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import { Challenge } from "../../../types";

type Data = {
  name: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<void>
): Promise<any> {
  interface Challenge {
    type: string;
    challenge: {
      id: string;
    };
  }
  try {
    const myGames = await streamOfGameEvents().then((res) => {
      const challenges = res.filter((event: Challenge) => {
        console.log("event", event);
        return event.type === "challenge";
      });

      return challenges;
    });
    if (myGames.length > 0) {
      myGames.forEach((challenge: Challenge) => {
        return acceptChallenge(challenge.challenge.id);
      });
    }
    res.end();
  } catch (err) {
    console.log(err);
  }
  setTimeout(() => {
    fetch("http://localhost:3000/api/hello");
    console.log("hello");
  }, 10000);
}

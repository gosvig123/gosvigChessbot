/** @format */
import { Challenge } from "../types";
export const getListOfBots = async () => {
  try {
    const listOfBots = await fetch("https://lichess.org/api/bot/online", {
      method: "GET",
      headers: {
        Authorization: `Bearer lip_nLhxdI6qVHlb4Zvnf1L2`,
      },
    })
      .then((res) => res.text()) // Get response text instead of JSON
      .then((data) => data);
    return console.log(listOfBots);
  } catch (error) {
    console.error(error);
  }
};

export const RequestChallenge = async () => {
  try {
    const myAccount = await fetch(
      "https://lichess.org/api/challenge/actual_magnus",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer lip_nLhxdI6qVHlb4Zvnf1L2`,
        },
        body: JSON.stringify({
          rated: false,
          clockLimit: 300,
          clockIncrement: 0,
          color: "white",
          variant: "standard",
          days: 1,
          acceptByToken: false,
          challengerColor: "white",
          challengerVariant: "standard",
          challengerClockLimit: 300,
          challengerClockIncrement: 0,
          challengerDays: 1,
          challengerRated: false,
          challengerAcceptByToken: false,
          challengerId: "actual_magnus",
          challengerName: "actual_magnus",
          challengerRating: 0,
          challengerRatingDiff: 0,
          keepAlive: true,
        }),
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
    console.log(myAccount);
  } catch (error) {
    console.error(error);
  }
};

export const getMyAccount = async () => {
  try {
    const myAccount = await fetch("https://lichess.org/api/account", {
      method: "GET",
      headers: {
        Authorization: `Bearer lip_nLhxdI6qVHlb4Zvnf1L2`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => console.log(data));
    return myAccount;
  } catch (error) {
    console.error(error);
  }
};

export const getMyGames = async () => {
  try {
    const myGames: any = await fetch(
      "https://lichess.org/api/account/playing",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer lip_nLhxdI6qVHlb4Zvnf1L2`,
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => data);

    return myGames;
  } catch (error) {
    console.error(error);
  }
};

export const streamOfGameEvents = async (): Promise<any> => {
  try {
    const response = await fetch("https://lichess.org/api/stream/event", {
      method: "GET",
      headers: {
        Authorization: `Bearer lip_nLhxdI6qVHlb4Zvnf1L2`,
        "Content-Type": "application/json",

        cors: "no-cors",
      },
    });

    const reader = response.body?.getReader();
    let buffer = "";
    let resArray: any = [];
    while (true) {
      const { done, value } = await reader!.read();
      if (done) break;
      buffer += new TextDecoder().decode(value!);
      const lines = buffer.split("\n");
      buffer = lines.pop()!;
      for (let i = 0; i < lines.length; i++) {
        try {
          const data = JSON.parse(lines[i]);
          console.log(data);
          resArray.push(data); // This will only return the first object
        } catch (error) {
          console.error(error);
        }
      }

      return resArray;
    }
  } catch (error) {
    console.error(error);
  }
};

export const makeAMove = async (gameId: string, move: string) => {
  try {
    console.log(gameId, move);
    const myMove = await fetch(
      `https://lichess.org/api/bot/game/${gameId}/move/${move}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer lip_nLhxdI6qVHlb4Zvnf1L2`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => console.log(data));
    return myMove;
  } catch (error) {
    console.error(error);
  }
};

export const streamOfSpecificGame = async (gameId: string) => {
  try {
    const myGame = await fetch(
      `https://lichess.org/api/bot/game/stream/${gameId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer lip_nLhxdI6qVHlb4Zvnf1L2`,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => data);
    return myGame;
  } catch (error) {
    console.error(error);
  }
};

export const acceptChallenge = async (challengeId: string) => {
  try {
    const challengeAccepted = await fetch(
      `https://lichess.org/api/challenge/${challengeId}/accept`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer lip_nLhxdI6qVHlb4Zvnf1L2`,
        },
      }
    );
  } catch (error) {
    console.error(error);
  }
};
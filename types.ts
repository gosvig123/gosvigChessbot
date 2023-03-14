/** @format */

interface activeGame {
  id: string;
}
export interface Challenge {
  type: string;
  challenge: {
    id: string;
    status: string;
    challenger: {
      id: string;
      name: string;
      title: string;
      rating: number;
      ratingDiff: number;
    };
    destUser: {
      id: string;
      name: string;
      title: string;
      rating: number;

      ratingDiff: number;
    };
    variant: {
      key: string;
      name: string;
      short: string;
    };
    speed: string;
    timeControl: {
      type: string;
      limit: number;
      increment: number;
      show: string;
    };
    color: string;
    perf: {
      icon: string;
      name: string;
    };
    rated: boolean;
    initialFen: string;
    createdAt: number;
    expiresAt: number;
  };
}

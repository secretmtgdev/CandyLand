export enum Color {
    Pink,
    Red,
    Yellow,
    Blue,
    Orange,
    Purple,
    Green,
    Multi
}

type GameState = {
    discardPile: Card.Card[];
    deck: Card.Card[];
    isGameOver: boolean;
    players: Player[];
    board: Board.Space[][];
}

interface Player {
    currentLocation: Location;
}

namespace Board {
    export type Location = {
        row: number;
        column: number;
    }

    export type Bridge = {
        source: Location;
        destination: Location;
    }

    export type Space = {
        location: Location,
        color: Color,
        picture: string;
        isLocorise: boolean;
        bridge?: Bridge;
    }
}

namespace Card {
    export enum SpecialCardType {
        Gumdrop,
        Lollipop,
        CandyCane,
        IceCream,
        Peanut,
        CupCake
    }

    export interface Card {
        color: Color;
    }

    export interface BlockCard extends Card {
        blockCount: number;
    }

    export interface SpecialCard extends Card {
        type: SpecialCardType;
    }
}

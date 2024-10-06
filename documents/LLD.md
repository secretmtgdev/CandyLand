# Candy Land - Low level design
## Description
This is a little bit of practice with low level design on the frontend and backend aspect.

## Frontend
The tech here is going to be very basic React.

### Blueprints
**Color**
There are 7 different colors in the game. Each color is used for a space on the board as well as color on a card.
```typescript
enum Color {
    Pink,
    Red,
    Yellow,
    Blue,
    Orange,
    Purple,
    Green,
    Multi
}
```

**Location**
Location is used to determine where a player is on the board, where certain colors and special events are, and where a bridge should go.
```typescript
type Location {
    row: number;
    column: number;
}

type Bridge {
    source: Location;
    destination: Location;
}
```

**GameState**
Like many games, we will follow the singleton pattern here. There should only be one game state at a time and for this we will leverage Redux. Actions taken by a player will trigger events to update various portions of the overall game state.

```typescript
type GameState {
    discardPile: Card[];
    deck: Card[];
    isGameOver: boolean;
    players: Player[];
    board: Space[][];
}
```

**Player**
We really only care about the location of the player. When determining who the winner is we will use the game state to get the specific index.
```typescript
interface Player {
    currentLocation: Location;
}
```

**Space**
```typescript
interface Space {
    color: Color;
}
```

**Card**
There are a couple of card types and we want to ensure that we support them. We leverage a generic interface that contains the core properties of what it means to be a Card supertype and then split off into sub types.
```typescript
enum SpecialCardType {
    Gumdrop,
    Lollipop,
    CandyCane,
    IceCream,
    Peanut,
    CupCake
}

interface Card {
    color: Color;
}

interface BlockCard extends Card {
    blockCount: number;
}

interface SpecialCard extends Card {
    type: SpecialCardType
}
```

### Backend
First question, do we really need a backend for this project or can we leverage simple caching for this game? Good question! I'm going to say that it really depends on the scale of this. If it's just myself or a couple of friends, then no. If we want to add more players and more features (user specific information such as total games one, username, password, etc) then most definitely. For an excerise we will assume this is the case and expand upon this as we go.

The tech here is going leverage Python and Postgresql.

**Location Model**
Location:
    - Row: number
    - Column: number

**Card Model**
Card:
    - Color: string
    - BlockCount: number | undefined
    - type: string | undefined

**Space Model**
Space:
    - Location: Location
    - Color: string
    - Picture: string | undefined

**Gamestate Model**
GameState:
    - DiscardPile: Card[]
    - Deck: Card[]
    - IsGameOver: boolean
    - Players: Location[]
    - Board: Space[][]

### Strategies
#### Caching
**The solo player** - Local cache
Let's say that a player is playing a solo game and suddenly their computer crashes. Players want to be able to pick up where they left off. Since we are tailoring the experience for just this specific user we will leverage local storage. We will provide a way for the user to start a new game, clearing the local storage for the associated game details.
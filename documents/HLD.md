# Candy Land - High level design
## Requirements
### Functional requirements
- There should be up to four players in a game
- Players can shuffle the deck at the start of the game
- If the deck is empty, the active player will shuffle all cards from the discard pile and this becomes the new deck
- The game ends when a player reaches the multicolored space
- Players who land on licorise skip their next turn
- Players who land on a bridge space will move to the destination spot
- If a player doesn't draw a card within 15 seconds, their turn will be automatically skipped

### Non-functional requirements
- Gamestate information should be stored on local cache for solo games
- Gamestate information should be stored on the server for multiplayer games
- The game must support a large traffic volume
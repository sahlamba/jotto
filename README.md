# Jotto

## Game events required by client
- Player joined game
- Player left game
- Player idle for too long (i.e. kicked out => game cancelled)
- Player ready
- Game state changes

## Cross-cutting concerns

- Player leaving game session: Closing the browser window mid-game after joining a game.
- Player rejoining game session: Reopening the browser window for a game that player joined but left previously.
- Player idle in game session: Every game session opens 1 socket connection per player; to avoid players abusing these connections, connections need to be released if player is idle for too long.
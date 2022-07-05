export const validatePlayer = (player) => {
  if (!player || !player.id || !player.name) {
    throw new Error(`Invalid player: ${JSON.stringify(player)}`)
  }
}

export const validateSettings = (settings) => {
  if (!settings || !settings.maxPlayers || !settings.wordLength) {
    throw new Error(`Invalid settings: ${JSON.stringify(settings)}`)
  }
}

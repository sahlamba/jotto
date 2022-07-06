export const validateGameId = (id) => {
  if (!id || id.length === 0) {
    throw new Error(`Missing game ID`)
  }
}

export const validatePlayer = (player) => {
  if (!player || !player.id || !player.name || player.name.length === 0) {
    throw new Error(`Invalid player: ${JSON.stringify(player)}`)
  }
}

export const validateSettings = (settings) => {
  if (!settings || !settings.maxPlayers || !settings.wordLength) {
    throw new Error(`Invalid settings: ${JSON.stringify(settings)}`)
  }
}

export const validateJottoWord = (jottoWord) => {
  if (!jottoWord || jottoWord.length === 0) {
    throw new Error(`Missing Jotto word`)
  }
}

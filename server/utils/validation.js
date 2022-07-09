export const validateGameCode = (code) => {
  if (!code || code.length === 0) {
    throw new Error(`Missing game code`)
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

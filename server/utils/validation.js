export const validateUser = (user) => {
  if (!user || !user.id || !user.name) {
    throw new Error(`Invalid user: ${JSON.stringify(user)}`)
  }
}

export const validateSettings = (settings) => {
  if (!settings || !settings.maxPlayers || !settings.wordLength) {
    throw new Error(`Invalid settings: ${JSON.stringify(settings)}`)
  }
}

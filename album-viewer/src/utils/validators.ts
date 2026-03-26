export const validateDate = (input: string): Date | null => {
  const normalizedInput = input.trim()

  if (!/^\d{2}\/\d{2}\/\d{4}$/.test(normalizedInput)) {
    return null
  }

  const [dayText, monthText, yearText] = normalizedInput.split('/')
  const day = Number(dayText)
  const month = Number(monthText)
  const year = Number(yearText)

  if (month < 1 || month > 12) {
    return null
  }

  const date = new Date(year, month - 1, day)

  if (
    Number.isNaN(date.getTime()) ||
    date.getFullYear() !== year ||
    date.getMonth() !== month - 1 ||
    date.getDate() !== day
  ) {
    return null
  }

  return date
}

// Validates that the input string is a valid GUID/UUID format
export const validateGuid = (input: string): boolean => {
  const normalizedInput = input.trim()

  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(normalizedInput)
}
// Validates that the input string is a valid IPv6 address
export const validateIPV6 = (input: string): boolean => {
  const normalizedInput = input.trim()

  return /^(?:([\t ]*(?:[0-9a-f]{1,4}):){7}(?:[0-9a-f]{1,4}|:)|([	 ]*(?:[0-9a-f]{1,4}):){1,7}:|([	 ]*(?:[0-9a-f]{1,4}):){1,6}:[0-9a-f]{1,4}|([	 ]*(?:[0-9a-f]{1,4}):){1,5}(?::[0-9a-f]{1,4}){1,2}|([	 ]*(?:[0-9a-f]{1,4}):){1,4}(?::[0-9a-f]{1,4}){1,3}|([	 ]*(?:[0-9a-f]{1,4}):){1,3}(?::[0-9a-f]{1,4}){1,4}|([	 ]*(?:[0-9a-f]{1,4}):){1,2}(?::[0-9a-f]{1,4}){1,5}|[0-9a-f]{1,4}:(?:(?::[0-9a-f]{1,4}){1,6})|:(?:(?::[0-9a-f]{1,4}){1,7}|:))$/i.test(normalizedInput)
}
export const checkStatus = async (response) => {
  const parsed = await response.json()
  if (!response.ok) return Promise.reject(new Error(parsed))
  return parsed
}
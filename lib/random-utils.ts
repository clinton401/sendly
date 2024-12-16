export const createErrorResponse = (message: string, redirectUrl: undefined | string = undefined) => ({
    error: message,
    success: undefined,
    redirectUrl,
    isTwoFA: undefined
  });
export type ApiValidationError = {
  loc: string[]
  msg: string
  type: string
}

export type ApiErrorResponse = {
  detail: ApiValidationError[] | string
}

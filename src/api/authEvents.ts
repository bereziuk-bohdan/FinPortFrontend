type UnauthorizedHandler = () => void

const handlers = new Set<UnauthorizedHandler>()

export function onUnauthorized(handler: UnauthorizedHandler): void {
  handlers.add(handler)
}

export function notifyUnauthorized(): void {
  handlers.forEach((handler) => handler())
}

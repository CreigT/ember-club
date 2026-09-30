export type ShopEvent = {
  id: string;
  time: string;
  kind: string;
  detail: string;
};

const events: ShopEvent[] = [];

export function logEvent(kind: string, detail: string) {
  events.unshift({
    id: `${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    time: new Date().toISOString(),
    kind,
    detail,
  });
  if (events.length > 80) events.pop();
  return events[0];
}

export function listEvents() {
  return events;
}

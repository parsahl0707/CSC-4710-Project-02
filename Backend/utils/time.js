const date = new Date();

export function getTime() {
  return date.toISOString().slice(0, 19).replace("T", " ");
}

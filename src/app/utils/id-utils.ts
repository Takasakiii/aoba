import {createId} from "@paralleldrive/cuid2";

export function generateId(): string {
  return createId();
}

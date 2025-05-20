import type { RenderContent, RenderItem } from "./template";

export type AppMessage = {
  cancel: never;
  goto: number;
  pause: never;
  resume: never;
  step: number | undefined;
  update: {
    frameIndex: number;
    frame: {
      items: RenderItem[];
    };
  };
};

export type RendererMessage = {
  done: never;
  edit:
    | {
        frameIndex: number;
        itemIndex: number;
        key: keyof RenderContent;
        top: number;
        left: number;
        width: number;
        height: number;
      }
    | undefined;
  frame: number;
  paused: never;
  ready: never;
  running: never;
};

export type TypedMessage<Messages, Type extends keyof Messages> = Messages[Type] extends never
  ? {
      type: Type;
    }
  : {
      type: Type;
      payload: Messages[Type];
    };

type MessageArgs<Messages> = {
  [K in keyof Messages]: Messages[K] extends never ? [K] : [K, Messages[K]];
}[keyof Messages];

export function createMessage<Messages extends Record<string, unknown>>(
  ...args: MessageArgs<Messages>
): TypedMessage<Messages, (typeof args)[0]> {
  return {
    type: args[0],
    ...(args.length > 1 ? { payload: args[1] } : {}),
  } as TypedMessage<Messages, (typeof args)[0]>;
}

type Handlers<Messages> = {
  [K in keyof Messages]: Messages[K] extends never ? () => void : (payload: Messages[K]) => void;
};

export function handleMessage<Messages extends Record<string, unknown>>(
  data: unknown,
  handlers: Handlers<Messages>
) {
  const valid =
    typeof data === "object" &&
    data !== null &&
    "type" in data &&
    typeof data.type === "string" &&
    data.type in handlers;
  if (valid) {
    const type = data.type as keyof typeof handlers;
    if ("payload" in data) {
      handlers[type](data.payload as Messages[keyof Messages]);
    } else {
      (handlers[type] as () => void)();
    }
  }
}

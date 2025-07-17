import type { EditableDetails } from "./editable/context";
import type { ContextId } from "./template";

/**
 * Message names and payloads sent from the app to the renderer.
 */
type AppMessage<V extends Record<string, any>> = {
  edit: ContextId | undefined;
  goto: number;
  pause: never;
  resume: never;
  step: number | undefined;
  update: V;
};

/**
 * Message names and payloads sent from the renderer to the app.
 */
type RendererMessage = {
  done: never;
  frame: number;
  paused: {
    components: Record<string, EditableDetails>;
    frameIndex: number;
  };
  position: DOMRect;
  ready: never;
  running: never;
};

export type TypedMessage<
  Messages,
  Type extends keyof Messages
> = Messages[Type] extends never
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

function createMessage<Messages extends Record<string, unknown>>(
  ...args: MessageArgs<Messages>
): TypedMessage<Messages, (typeof args)[0]> {
  return {
    type: args[0],
    ...(args.length > 1 ? { payload: args[1] } : {}),
  } as TypedMessage<Messages, (typeof args)[0]>;
}

type Handlers<Messages> = {
  [K in keyof Messages]: Messages[K] extends never
    ? () => void
    : (payload: Messages[K]) => void;
};

function handleMessage<Messages extends Record<string, unknown>>(
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

function sendMessage<Messages extends Record<string, unknown>>(
  ...args: MessageArgs<Messages>
) {
  const message = createMessage<Messages>(...args);
  // Write to the console for the builder
  if ("payload" in message) {
    console.log(message.type, message.payload);
  } else {
    console.log(message.type);
  }
  // Write to the parent window for the app
  window.parent?.postMessage(message, "*");
}

export const createRendererMessage =
  createMessage as typeof createMessage<RendererMessage>;

export const handleAppMessage = handleMessage as <
  V extends Record<string, any>
>(
  data: unknown,
  handlers: Handlers<AppMessage<V>>
) => void;

export const sendRendererMessage =
  sendMessage as typeof sendMessage<RendererMessage>;

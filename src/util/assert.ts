export class AssertionError extends Error {
  private internalMsg_?: string;

  private userMsg_?: string;

  constructor(readonly msg: string, internalMsg?: string, userMsg?: string) {
    super(msg);
    Object.setPrototypeOf(this, AssertionError.prototype);
    this.internalMsg_ = internalMsg;
    this.userMsg_ = userMsg;
  }

  get internalMessage(): string | undefined {
    return this.internalMsg_;
  }

  get userMessage(): string | undefined {
    return this.userMsg_;
  }
}

export function assert(
  condition: any,
  internalMsg?: string,
  userMsg?: string
): asserts condition {
  if (!condition)
    throw new AssertionError(
      `Assertion failed${internalMsg ? ' - ' + internalMsg : '.'}`,
      internalMsg,
      userMsg
    );
}

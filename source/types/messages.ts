type messageId = { string: string; __branded: "MessageId" };
export interface Message {
  _id: messageId;
  meetingId: string;
  senderId: string;
  content: string;
  timestamp: Date;
  createdAt: Date;
  updatedAt: Date;
}

export function createMessageId(id: string): messageId {
  return id as unknown as messageId;
}

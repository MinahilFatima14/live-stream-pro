export interface Room {
  _id: string
  roomId: string
  hostId: string
  status: 'waiting' | 'live' | 'ended'
  title?: string
  createdAt?: string
}

import { Item } from './common/item'

export interface Artist extends Item {
  otherUrls: OtherUrl[]
}

export interface OtherUrl {
  label: string
  url: string
}

/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import { SetRelation, Merge } from "../core/ModelUtils"

export interface StorePostCartsCartLineItemsItemReq {
  /**
   * The quantity to set the Line Item to.
   */
  quantity: number
  /**
   * An optional key-value map with additional details about the Line Item.
   */
  metadata?: Record<string, any>
}

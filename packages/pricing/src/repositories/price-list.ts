import { Context, DAL } from "@medusajs/types"
import { DALUtils, GetIsoStringFromDate, MedusaError } from "@medusajs/utils"
import {
  LoadStrategy,
  FilterQuery as MikroFilterQuery,
  FindOptions as MikroOptions,
} from "@mikro-orm/core"

import { PriceList } from "@models"
import { RepositoryTypes } from "@types"
import { SqlEntityManager } from "@mikro-orm/postgresql"

export class PriceListRepository extends DALUtils.MikroOrmBaseRepository {
  protected readonly manager_: SqlEntityManager

  constructor({ manager }: { manager: SqlEntityManager }) {
    // @ts-ignore
    // eslint-disable-next-line prefer-rest-params
    super(...arguments)
    this.manager_ = manager
  }

  async find(
    findOptions: DAL.FindOptions<PriceList> = { where: {} },
    context: Context = {}
  ): Promise<PriceList[]> {
    const manager = this.getActiveManager<SqlEntityManager>(context)

    const findOptions_ = { ...findOptions }
    findOptions_.options ??= {}

    Object.assign(findOptions_.options, {
      strategy: LoadStrategy.SELECT_IN,
    })

    return await manager.find(
      PriceList,
      findOptions_.where as MikroFilterQuery<PriceList>,
      findOptions_.options as MikroOptions<PriceList>
    )
  }

  async findAndCount(
    findOptions: DAL.FindOptions<PriceList> = { where: {} },
    context: Context = {}
  ): Promise<[PriceList[], number]> {
    const manager = this.getActiveManager<SqlEntityManager>(context)

    const findOptions_ = { ...findOptions }
    findOptions_.options ??= {}

    Object.assign(findOptions_.options, {
      strategy: LoadStrategy.SELECT_IN,
    })

    return await manager.findAndCount(
      PriceList,
      findOptions_.where as MikroFilterQuery<PriceList>,
      findOptions_.options as MikroOptions<PriceList>
    )
  }

  async delete(ids: string[], context: Context = {}): Promise<void> {
    const manager = this.getActiveManager<SqlEntityManager>(context)
    await manager.nativeDelete(PriceList, { id: { $in: ids } }, {})
  }

  async create(
    data: RepositoryTypes.CreatePriceListDTO[],
    context: Context = {}
  ): Promise<PriceList[]> {
    const manager = this.getActiveManager<SqlEntityManager>(context)

    const priceLists = data.map((priceListData: any) => {
      if (!!priceListData.starts_at) {
        priceListData.starts_at = GetIsoStringFromDate(priceListData.starts_at)
      }

      if (!!priceListData.ends_at) {
        priceListData.ends_at = GetIsoStringFromDate(priceListData.ends_at)
      }

      return manager.create(PriceList, priceListData)
    })

    manager.persist(priceLists)

    return priceLists
  }

  async update(
    data: RepositoryTypes.UpdatePriceListDTO[],
    context: Context = {}
  ): Promise<PriceList[]> {
    const manager = this.getActiveManager<SqlEntityManager>(context)
    const priceListIds = data.map((priceListData) => priceListData.id)
    const existingPriceLists = await this.find(
      {
        where: {
          id: {
            $in: priceListIds,
          },
        },
      },
      context
    )

    const existingPriceListMap = new Map(
      existingPriceLists.map<[string, PriceList]>((priceList) => [
        priceList.id,
        priceList,
      ])
    )

    const priceLists = data.map((priceListData: any) => {
      const existingPriceList = existingPriceListMap.get(priceListData.id)

      if (!existingPriceList) {
        throw new MedusaError(
          MedusaError.Types.NOT_FOUND,
          `PriceList with id "${priceListData.id}" not found`
        )
      }

      if (!!priceListData.starts_at) {
        priceListData.starts_at = GetIsoStringFromDate(priceListData.starts_at)
      }

      if (!!priceListData.ends_at) {
        priceListData.ends_at = GetIsoStringFromDate(priceListData.ends_at)
      }

      return manager.assign(existingPriceList, priceListData)
    })

    manager.persist(priceLists)

    return priceLists
  }
}

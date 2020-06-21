import {
  fetchTradeAll,
  fetchCarBrandSelectAll,
  fetchDistributorAll,
  fetchAuditName,
  fetchGaugeSelectAll,
  fetchGuageAll,
  fetchYeWu
} from '@/api/common.js'
// 车城
export const getAllTrade = async () => {
  const { code, results } = await fetchTradeAll()
  if (code) {
    return results
  }
}
// 经销商
export const getDistSelectAll = async () => {
  const { code, results } = await fetchDistributorAll()
  if (code) {
    return results
  }
}
// 品牌
export const getBrandSelectAll = async () => {
  const { code, results } = await fetchCarBrandSelectAll()
  if (code) {
    return results
  }
}
// 车系
export const getAuditSelectAll = async () => {
  const { code, results } = await fetchAuditName()
  if (code) {
    return results
  }
}
// 车型
export const getGaugeSelectAll = async () => {
  const { code, results } = await fetchGaugeSelectAll()
  if (code) {
    return results
  }
}
// 车规
export const getGuageAll = async () => {
  const { code, results } = await fetchGuageAll()
  if (code) {
    return results
  }
}
// 业务
export const getYeWuSelect = async () => {
  const { code, results } = await fetchYeWu()
  if (code) {
    return results
  }
}

import { fetchApi } from '@/plugins/fetchApi'
// 品牌
export const fetchCarBrandSelectAll = data => fetchApi('select/carbrand', data)
// 所有车城
export const fetchTradeAll = data => fetchApi('trade/trade', data)

// 经销商
export const fetchDistributorAll = data =>
  fetchApi('distributor/distributor', data)
// 所有车系 车系查询（只显示车系名称）
export const fetchAuditName = data => fetchApi('audi/cname', data)
// 车型
export const fetchGaugeSelectAll = data => fetchApi('select/gauge', data)
// 车规
export const fetchGuageAll = data => fetchApi('gauge', data)
export const fetchYeWu = data => fetchApi('select/yewu', data)

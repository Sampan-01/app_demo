import { fetchApi } from '@/plugins/fetchApi'

/**
 * @type{*} 管理员设置
 * @param {*} 查询、添加、编辑
 */
export const fetchUserList = data => fetchApi('user/search', data)
export const fetchUserAdd = data => fetchApi('user', data, 'POST')

/**
 * @type{*} 保证金
 * @param {*} 查询、添加、编辑、删除、是否禁用
 */
export const fetchDepositList = data => fetchApi('depositmoney/search', data)
export const fetchDepositEdit = data => fetchApi('depositmoney', data, 'POST')
export const fetchDepositAdd = data =>
  fetchApi('depositmoney/insert', data, 'POST')
export const fetchDepositState = data => fetchApi('depositmoney/state', data)
export const fetchDepositDel = data => fetchApi('depositmoney/delete', data)

/**
 * @type{*} 关于我们
 * @param {*} 查询、添加、编辑
 */
export const fetchLogAbout = data => fetchApi('log/aboutme', data, 'POST')
export const fetchLogAboutInfo = data => fetchApi('log/aboutme', data)

/**
 * @type{*} 操作日志
 * @param {*} 查询
 */
export const fetchLogList = data => fetchApi('log/search', data)

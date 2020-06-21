import { fetchApi } from '@/plugins/fetchApi'
// 热门资讯 + 搜索
export const fetchNewList = data => fetchApi('new/search', data)
// 发布文章
export const fetchNewArticle = data => fetchApi('new/insert', data, 'POST')

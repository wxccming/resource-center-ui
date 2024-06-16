import { DELETE, get, post, put } from "@/utils/request";

const http = "http://111.231.60.214:48080"

export const creatByCode = (params) => post(`${http}/admin-api/infra/book-qtcode-item/create`, params); // 二维码创建项目

export const deleteCodeProject = (params) => DELETE(`${http}/admin-api/infra/book-qtcode-item/delete`, params); // 删除二维码项目

export const updateCodeProject = (params) => put(`${http}/admin-api/infra/book-qtcode-item/update`, params); // 更新二维码项目

export const queryBooklist = (params) => get(`${http}/admin-api/infra/book-info/page`, params); // 获取图书列表信息

export const getdictionary = () => get("http://111.231.60.214:48080/admin-api/system/dict-data/list-all-simple"); // 数据字典

export const queryQtcodeList = (params) => get(`${http}/admin-api/infra/book-qtcode-item/page`, params); // 查询图书二维码项目列表

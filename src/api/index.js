import {download, get,put, post, postForm,DELETE, getFilePrevGet, upFile} from "@/utils/request";


export const getdictionary = (params) => get("http://111.231.60.214:48080/admin-api/system/dict-data/list-all-simple"); // 数据字典
export const getoss = (params) => get("http://111.231.60.214:48080/admin-api/infra/file-oss/sts"); // 汇聚资源管理
export const Gathering = (params) => get("http://111.231.60.214:48080/admin-api/infra/source-info/page",params); // 汇聚资源管理

// 图书信息
export const getbooks = (params) => get("http://111.231.60.214:48080/admin-api/infra/book-info/page",params); // 图书信息
export const addbooks = (params) => post("http://111.231.60.214:48080/admin-api/infra/book-info/create",params); // 新增图书信息
export const exticbooks = (params) => get("http://111.231.60.214:48080/admin-api/infra/book-info/get",params); // 修改图书信息
export const deletebooks = (params) => DELETE("http://111.231.60.214:48080/admin-api/infra/book-info/delete",params); // 删除图书信息
export const putbooks = (params) => put("http://111.231.60.214:48080/admin-api/infra/book-info/update",params); // 更新图书信息
// 章节信息
export const addchapter = (params) => post("http://111.231.60.214:48080/admin-api/infra/book-chapter/create",params); // 新增章节
export const getchapter = (params) => get("http://111.231.60.214:48080/admin-api/infra/book-chapter/page",params); // 获取章节信息


//资源信息
export const addinformation = (params) => post("http://111.231.60.214:48080/admin-api/infra/source-info/create",params); // 上传资源信息





export const login = (params) => post("/apis/auth/login/login", params); // 系统登录接口
export const findButton = (params) => post("/apis/auth/login/findButton", params); // 系统按钮权限接口

// -------首页
// 左侧树结构
//  首页查询电压
export const indexVoltageTree = (params) =>  post("/apis/account/rfHdTower/indexVoltageTree", params);
// 查询线路
export const indexLineTree = (params) =>  post("/apis/account/rfHdTower/indexLineTree", params);
// 查询杆塔
export const indexTowerTree = (params) =>  post("/apis/account/rfHdTower/indexTowerTree", params);
// 根据线路ID查询点云
export const findLinePointCloud = (params) =>  post("/apis/account/rfHdTower/findLinePointCloud", params);
// 查询巡检成果照片列表
export const findTaskPhotosList = (params) =>  post("/apis/transportationInspection/task/findTaskPhotosList", params);
export const findIndexTaskPhotosList = (params) =>  post("/apis/transportationInspection/task/findIndexTaskPhotosList", params);
// 查360全景
export const findPanoramicImage = (params) =>  post("/apis/account/rfHdTower/findPanoramicImage", params);
// 查询巡检缺陷照片列表
export const findTaskDefectList = (params) =>  post("/apis/transportationInspection/task/findTaskDefectList", params);
// 提交工况摸拟数据
export const simulation = (params) =>  post("/apis/account/rfHdTower/simulation", params);
// 获取工况摸拟数据
export const workFile = (params) =>  post("/apis/account/rfHdTower/workFile", params);
//  首页在线无人机
export const getOnLineUav = (params) =>  post("/apis/flyMonitor/communal/getOnLineUav", params);

//  首页统计
export const indexStatistics = (params) =>  post("/apis/transportationInspection/task/indexStatistics", params);


export const findParentOrgTypeNameList = (params) =>  post("/apis/auth/common/findParentOrgTypeNameList", params);
// 通过杆塔ID下载航线
export const downLoadRouteByTower = (params) =>  post("/apis/account/route/downLoadRouteByTower", params);

export const downloadTemplate = (params) =>  download("/apis/account/rfHdTower/downloadTemplate", params);

// ------------------------菜单树
// 组织信息
export const findAllorgList = (params) =>  post("/apis/auth/common/findAllorgList", params);
// 电压层级
export const findVoltage = (params) =>  post("/apis/account/rfHdLine/findVoltage", params);
// 线路层级
export const selectRfHdLineTree = (params) => post("/apis/account/rfHdLine/selectRfHdLineTree", params);
// 杆塔
export const selectRfHdTowerTree = (params) => post("/apis/account/rfHdLine/selectRfHdTowerTree", params);

// 角色类别

export const findRoleType = (params) => post("/apis/auth/user/findRoleType", params);

// 审核人员
export const findUserPerson = (params) => post("/apis/auth/user/findUserPerson", params);
export const addReview = (params) => post("/apis/auth/user/addReview", params);
export const delReview = (params) => post("/apis/auth/user/delReview", params);
export const findReviewList = (params) => post("/apis/auth/user/findReviewList", params);
export const downloadImg = (params) => {
  // debugger
  if (process.env.VUE_APP_TYPE == 1) {
    // return Promise.resolve({data: '/imgUrl/' + params.filePath })
    return Promise.resolve({data: params.filePath.includes('http') ? params.filePath + `?time=${new Date().getTime()}` : process.env.VUE_APP_IMAGEASE + params.filePath })
  }
  // post("/apis/auth/common/downloadImg", params)
  return post("/apis/auth/common/downloadImg", params)
}; // 预览下载图片
export const downloadImgList = (params) => {
  // 获取图片的两种方式，当后端把图片存在本地时，就不用再次掉接口
  if (process.env.VUE_APP_TYPE == 1) {
    
    params.imgList = params.imgList.map(ele => {
      if (ele.includes('http')) return ele
      return process.env.VUE_APP_IMAGEASE + ele
    })
    return Promise.resolve({data: params.imgList })
  }
  return post("/apis/auth/common/downloadImgList", params)
}; // 预览杆塔巡检图片

  // 系统设置
// 配置管理 - 字典管理
// 查询字典列表
export const findDictionariesList = params => post('/apis/auth/dictionaries/findDictionariesByParemtId', params);
// 字典禁用激活
// export const activateDictionaries = params => post('/apis/auth/dictionaries/activateDictionaries', params);
// 添加字典
export const insertDictionaries = params => post('/apis/auth/dictionaries/insertDictionaries', params);
// 编辑字典
export const updateDictionaries = params => post('/apis/auth/dictionaries/upadteDictionariesByParemtId', params);
// 冻结激活字典
export const activateDictionaries = params => post('/apis/auth/dictionaries/activateDictionaries', params);
// 查字典类型
export const findDictionariesParemt = params => post('/apis/auth/dictionaries/findDictionariesParemt', params);
// 查询父级编码
export const findDictionariesParent = () => post('/apis/auth/dictionaries/findDictionariesParent');

// 人员管理
// 查询班组信息
export const findOrgRecodeList = params => post('/apis/auth/common/findOrgRecodeList',params);
// 查询班组类型
export const findOrgTypeNameList = params => post('/apis/auth/common/findOrgTypeNameList',params);
export const findIsc = params => post('/apis/account/dronePilot/findIsc',params);


// 查询通道隐患
export const findTaskDangerList = params => post('/apis/transportationInspection/task/findTaskDangerList',params);
export const updatePower = params => post('/apis/transportationInspection/task/updatePower',params);
export const updateDangerPower = params => post('/apis/transportationInspection/task/updateDangerPower',params);

export const delDanger = params => post('/apis/transportationInspection/task/delDanger',params);
// 无人机管理
// 查询无人机
export const findUavList = params => post('/apis/account/uav/findUavList',params);
export const insertUav = params => post('/apis/account/uav/insertUav',params);

export const checkExamineTreePass = params => post('/apis/transportationInspection/inspectDefect/checkExamineTreePass',params);
export const checkUpImg = params => post('/apis/transportationInspection/inspectDefect/checkUpImg',params);

export const updateUav = params => post('/apis/account/uav/updateUav',params);

// 查无人机维保记录
export const findUavMaintainList = params => post('/apis/account/maintain/findUavMaintainList',params);
// 删除人机维保记录
export const delMaintains = params => post('/apis/account/maintain/delMaintains',params);
// 修改人机维保记录
export const updateMaintain = params => post('/apis/account/maintain/updateMaintain',params);
// 查无人机维保记录
export const addMaintain = params => post('/apis/account/maintain/addMaintain',params);
// 删除无人机记录
export const delUav = params => post('/apis/account/uav/delUav',params);

// 导入缺陷管理
export const importDefectRemarks = (params,headers) => post('/apis/auth/rfHdDefect/importDefectRemarks', params,headers);

// 查询机巢
export const findAirdromeList = params => post('/apis/account/uavAirdrome/findAirdromeList',params);
export const insertAirdrome = params => post('/apis/account/uavAirdrome/insertAirdrome',params);
export const updateAirdrome = params => post('/apis/account/uavAirdrome/updateAirdrome',params);
export const delAirdrome = params => post('/apis/account/uavAirdrome/delAirdrome',params);

// 查询电池
export const findBatteryList = params => post('/apis/account/uavBattery/findBatteryList',params);
export const insertBattery = params => post('/apis/account/uavBattery/insertBattery',params);
export const updateBattery = params => post('/apis/account/uavBattery/updateBattery',params);
export const delBattery = params => post('/apis/account/uavBattery/delBattery',params);

// 查询设备
export const findCarryList = params => post('/apis/account/uavCarry/findCarryList',params);
export const insertCarry = params => post('/apis/account/uavCarry/insertCarry',params);
export const updateCarry = params => post('/apis/account/uavCarry/updateCarry',params);
export const delCarry = params => post('/apis/account/uavCarry/delCarry',params);

// 角色管理
// 查询角色列表
export const getRoleList = params => post('/apis/auth/user/findRoleList', params);
// 添加角色
export const insertRole = params => post('/apis/auth/user/insertRole', params);
// 修改角色
export const updateRole = params => post('/apis/auth/user/updateRole', params);
// 删除角色
export const delRole = params => post('/apis/auth/user/delRole', params);
// 激活冻结用户
export const activateUser = params => post('/apis/auth/user/activateUser', params);
// 查询用户集
export const findUserDictionaries = params => post('/apis/auth/common/findUserDictionaries', params);
// 根据角色Id查询用户
export const findReoleIdByuserList = params => post('/apis/auth/user/findReoleIdByuserList', params);
// 组织关联
export const updateRoleByUserList = params => post('/apis/auth/user/updateRoleByUserList', params);
// 查询菜单列表
export const findMenuList = params => post('/apis/auth/user/findMenuList', params);
// 查询选中菜单列表
export const findCheckedMenuList = params => post('/apis/auth/user/findCheckedMenuList', params);
// 新增角色菜单
export const insertRoleMenu = params => post('/apis/auth/user/insertRoleMenu', params);

// 组织管理

// 查询组织列表
export const findorgListConfig = params => post('/apis/auth/common/findorgList', params);
// 添加组织
export const insertorgConfig = params => post('/apis/auth/user/insertorg', params);
// 编辑组织
export const updateOrgConfig = params => post('/apis/auth/user/updateOrg', params);
// 删除组织
export const delOrg = params => post('/apis/auth/user/delOrg', params);

// 人员管理
// 查询人员信息
export const findUserList = params => post('/apis/auth/user/findUserList', params);
// 用户关联组织
export const updateUserByOrg = params => post('/apis/auth/user/updateUserByOrg', params);
// 用户绑定职责
export const insertUserDuty = params => post('/apis/auth/user/insertUserDuty', params);
// 新增人员
export const addUser = params => post('/apis//auth/user/addUser', params);
// 修改人员
export const updateUser = params => post('/apis//auth/user/updateUser', params);
// 删除人员
export const delUser = params => post('/apis//auth/user/delUser', params);
// 用户操作管理
// 查询日志列表
export const findLogList = params => post('/apis/auth/log/findLogList', params);
// 查询操作描述列表
export const findPortDictionaries = params => post('/apis/auth/common/findPortDictionaries', params)
// 下载  // 下载维修记录
export const downloadFileExcel = params => download('/apis/auth/common/downloadFileExcel', params);

// 修改通道任务
export const updateChannelTask = params => post('/apis/transportationInspection/task/updateChannelTask', params)
export const importChannelReport = params => upFile('/apis/transportationInspection/task/importChannelReport', params)
export const downSeeFile = params => getFilePrevGet('/apis/transportationInspection/task/downSeeFile', params)
export const approveChannelReport = params => post('/apis/transportationInspection/task/approveChannelReport', params)
// 任务管理
// 精细化任务管理
export const addTask = params => post('/apis/transportationInspection/task/addTask', params);
export const findTaskList = params => post('/apis/transportationInspection/task/findTaskList', params);
export const findTaskListStatistics = params => post('/apis/transportationInspection/task/findTaskListStatistics', params);
export const findExamineTaskRole = params => post('/apis/transportationInspection/task/findExamineTaskRole', params);
export const delTask = params => post('/apis/transportationInspection/task/delTask', params);
export const updateTask = params => post('/apis/transportationInspection/task/updateTask', params);
export const examineTask = params => post('/apis/transportationInspection/task/examineTask', params);
export const deliveryTask = params => post('/apis/transportationInspection/task/deliveryTask', params);
// export const updateTask = params => post('/apis/transportationInspection/task/updateTask', params);

export const changeNoDefect = params => post('/apis/transportationInspection/inspectDefect/changeNoDefect', params);
// 图片处理
export const taskTree = params => post('/apis/transportationInspection/inspectDefect/taskTree', params);
// 图片审核
export const examineTree = params => post('/apis/transportationInspection/inspectDefect/examineTree', params);



export const refinementStatistics = params => post('/apis/transportationInspection/task/refinementStatistics', params);

// 基本数据管理
// 线路管理
// 查
export const findRfHdLineList = params => post('/apis/account/rfHdLine/findRfHdLineList', params)
export const addLine = params => upFile('/apis/account/rfHdLine/addLine', params)
export const updateLine = params => post('/apis/account/rfHdLine/updateLine', params)
export const delLine = params => post('/apis/account/rfHdLine/delLine', params)
export const uploadLine = params => upFile('/apis/account/rfHdLine/uploadLine', params)

// 杆塔管理
export const addTower = params => post('/apis/account/rfHdTower/addTower', params)
export const findRfHdTowerList = params => post('/apis/account/rfHdTower/findRfHdTowerList', params)
export const updateTower = params => post('/apis/account/rfHdTower/updateTower', params)
export const delTower = params => post('/apis/account/rfHdTower/delTower', params)
// 飞手管理
export const uploadFile = params => upFile('/apis/auth/common/uploadFile', params)
export const findDronePilotList = params => post('/apis/account/dronePilot/findDronePilotList', params)
export const addDronePilot = params => post('/apis/account/dronePilot/addDronePilot', params)
export const updateDronePilot = params => post('/apis/account/dronePilot/updateDronePilot', params)
export const delDronePilot = params => post('/apis/account/dronePilot/delDronePilot', params)

// 工况摸拟 判断是否是最后一个杆塔 data:1  是最后一个杆塔    data:0  不是最后一个杆塔
export const checkSimulation = (params) =>  post("/apis/account/rfHdTower/checkSimulation", params);

// 导出缺陷
export const getFineDefectReport = params => download('/apis/transportationInspection/reportWord/getFineDefectReport', params)
export const checkLineDefectReport = params => post('/apis/transportationInspection/reportWord/checkLineDefectReport', params)
export const delDefect = params => post('/apis/transportationInspection/task/delDefect', params)

export const uploadSolveImage = params => upFile('/apis/transportationInspection/task/uploadSolveImage', params)
// 导出报告
export const checkTaskDefectReport = params => post('/apis/transportationInspection/reportWord/checkTaskDefectReport', params)
export const getTaskDefectReport = params => download('/apis/transportationInspection/reportWord/getTaskDefectReport', params)

// 下载报告
export const getLineDefectReport = params => download('/apis/transportationInspection/reportWord/getLineDefectReport', params)
// export const updatePower = params => post('/apis/transportationInspection/task/updatePower', params)

// 上传360全景照片
export const uploadPanoramicImage = params => upFile('/apis/account/rfHdTower/uploadPanoramicImage', params)

export const uploadNewImage = params => upFile('/apis/transportationInspection/task/uploadNewImage', params)

export const uploadDanger = params => upFile('/apis/transportationInspection/task/uploadDanger', params)
// 航迹管理
export const importRoute = params => upFile('/apis/account/route/importRoute', params)
export const findRouteList = params => post('/apis/account/route/findRouteList', params)
export const delRoute = params => post('/apis/account/route/delRoute', params)
export const downLoadRoute = params => download('/apis/account/route/downLoadRoute', params)


//查询项目现勘或竣工验收类型的计划  {taskType,towerCode,routeName,time}
export const listAcceptancePlans = params => post('/apis/completionAcceptance/acceptancePlan/pageQuery', params);
//删除计划  {planId}
export const deleteAcceptancePlan = params => post('/apis/completionAcceptance/acceptancePlan/deleteAcceptancePlan', params);
//获取计划  {}
export const pullAcceptancePlans = params => post('/apis/completionAcceptance/acceptancePlan/getPlans', params);

//新增计划 {planCode,taskType,lineName,voltage,planStartTime,planEndTime,remark}
export const addAcceptancePlan = params => post('/apis/completionAcceptance/acceptancePlan/add', params);
//更新计划（暂未使用）  {id,planCode,taskType,lineName,voltage,planStartTime,planEndTime,remark}
export const updateAcceptancePlan = params => post('/apis/completionAcceptance/acceptancePlan/edit', params);

//查询指定计划，或指定类型的任务 {planId,taskType,planCode,lineName,time}
export const listAcceptanceTasks = params => post('/apis/completionAcceptance/acceptanceTask/listAcceptanceTasks', params);
//删除任务  {taskId}
export const deleteAcceptanceTask = params => post('/apis/completionAcceptance/acceptanceTask/deleteAcceptanceTask', params);
//获取单个任务
export const getCommonTaskInfo = params => post('/apis/completionAcceptance/acceptanceTask/queryByID', params);

//添加任务  {taskType,planId,lineName,voltage,planBeginTime,planEndTime,remark}
export const addAcceptanceTask = params => post('/apis/completionAcceptance/acceptanceTask/addAcceptanceTask', params);
//下发任务  {taskId,approval,}
export const sendAcceptanceTask = params => post('/apis/completionAcceptance/acceptanceTask/sendTask', params);

//审核任务  {taskId,isPass,opinions}
export const applayAcceptanceTask = params => post('/apis/completionAcceptance/acceptanceTask/saveReviewComment', params);


//导入任务分析用的图片（包含项目现勘和竣工验收两种）{taskId,file[]}
export const importAcceptanceTaskImages = params => post('/apis/completionAcceptance/acceptanceTask/uploadPictures', params);

//查询任务对应的台账（杆塔列表，包括线路信息，Tree结构 {children,label,id,.....}）  {taskId}
export const listAcceptanceTaskAccountsTree = params => post('/apis/completionAcceptance/acceptanceTower/listAcceptanceTaskAccountsTree', params);
//查询任务对应的台账 三种台账
export const listAcceptanceTaskAccounts = params => post('/apis/completionAcceptance/acceptanceTower/listAcceptanceTaskAccounts', params);
//导入台账 {type,taskId,file}
export const importAcceptanceTaskAccounts = params => post('/apis/completionAcceptance/acceptanceTower/importAccountExcel', params);

export const deleteAcceptanceAccount = params => post('/apis/completionAcceptance/acceptanceTower/deleteAcceptanceAccount', params);
//获取任务的分析图片，（包含项目现勘和竣工验收两种）  {taskId,towerId}
export const listAcceptanceTowerImages = params => post('/apis/completionAcceptance/acceptanceTower/listAcceptanceTowerImages', params);
//删除杆塔图片
export const delAcceptanceTowerImage = params => post('/apis/completionAcceptance/acceptanceTower/delAcceptanceTowerImage', params);

//提交台账 校验结果 {taskId}
export const submitAcceptanceTaskAccount = params => post('/apis/completionAcceptance/acceptanceTower/submitTowerAccount', params);
//更新任务杆塔 {id,towerCode,towerMaterial,towerType,lon,lat,loopRoad,samePole}
export const updateAcceptanceTower = params => post('/apis/completionAcceptance/acceptanceTower/editTowerAccount', params);
//上传任务杆塔台账图片 id可选 {taskId,towerId,file[]}
export const uploadAcceptanceTowerImages = params => post('/apis/completionAcceptance/acceptanceTower/uploadAcceptanceTowerImages', params);

export const listChangePlans = params => post('/apis/accountChanges/changesPlan/list', params);
export const addChangePlan = params => post('/apis/accountChanges/changesPlan/add', params);
export const updateChangePlan = params => post('/apis/accountChanges/changesPlan/edit', params);
export const deleteChangePlan = params => post('/apis/accountChanges/changesPlan/delete', params);
export const pullChangePlans = params => post('/apis/accountChanges/', params);

export const listChangeTasks = params => post('/apis/accountChanges/changesTask/list', params);
export const addChangeTask = params => post('/apis/accountChanges/changesTask/add', params);
export const deleteChangeTask = params => post('/apis/accountChanges/changesTask/deleteChangesTask', params);
export const applayChangeTask = params => post('/apis/accountChanges/changesTask/sendTask', params);
//审核任务  {taskId,isPass,opinions}
export const approvalChangeTask = params => post('/apis/accountChanges/changesTask/approvalChangeTask', params);
export const createChangesReport = params => post('/apis/accountChanges/changesTask/generateReport', params);

export const importChangeTaskAccounts = params => post('/apis/accountChanges/changesTower/importAccountExcel', params);
export const deleteChangesAccount = params => post('/apis/accountChanges/changesTower/deleteChangesAccount', params);
export const listChangesTaskAccountsTree = params => post('/apis/accountChanges/changesTower/listChangesTaskAccountsTree', params);
export const listChangeTaskAccounts = params => post('/apis/accountChanges/changesTower/listChangesTaskAccounts', params);


// 查询竣工验收台账校验状态
// export const findChangesTaskType = params => post('/apis/completionAcceptance/acceptanceTower/findChangesTaskType', params);
// 查询台账异动台账校验状态
export const changesTower = params => post('/apis/accountChanges/changesTower/findChangesTaskType', params);
// 实时推送最新无人机坐标
export const flightWebSocket = params => post('/apis/flyMonitor/control/flight/webSocket', params);
// 关闭实时推送最新无人机坐标
export const closeFlightWebSocket = params => post('/apis/flyMonitor/control/flight/webSocket/close', params);
// 查询交跨点和危险点
export const findDangerAndCrossList = params => post('/apistransportationInspection/inspectDefect/findDangerAndCrossList', params);


// 运检管理 - 任务执行 - 数据处理
export const findUserByOrg = params => post('/apis/auth/common/findUserByOrg', params); //根据用户权限查询组织
export const findOrgCodeByKilovolt = params => post('/apis/transportationInspection/inspectDefect/findOrgCodeByKilovolt', params); //根据组织代码查询千伏
export const findOrgCodeByLine = params => post('/apis/transportationInspection/inspectDefect/findOrgCodeByLine', params); //根据组织代码查询线路
export const findOrgCodeByTower = params => post('/apis/transportationInspection/inspectDefect/findOrgCodeByTower', params); //根据线路代码查询杆塔
export const findTowerByImg = params => post('/apis/transportationInspection/inspectDefect/findTowerByImg', params) //查询杆塔下所有照片


export const findDefect = params => post('/apis//auth/common/findDefect', params); //查询缺陷库


export const qrySchedule = params => post('/apis/transportationInspection/inspectDefect/qrySchedule', params); // 识别
// 图片审核
export const examineTreePass = params => post('/apis/transportationInspection/inspectDefect/examineTreePass', params); //查询缺陷库

export const insertImgFile = (params) => upFile('/apis/transportationInspection/inspectDefect/insertImgFile', params); //导入照片
export const delTowerImg = params => post('/apis/transportationInspection/inspectDefect/delTowerImg', params); //删除缺陷照片
export const distinguishDefect = params => post('/apis/transportationInspection/inspectDefect/distinguishDefect', params); // 标记缺陷
export const updateDefect = params => post('/apis/transportationInspection/inspectDefect/updateDefect', params); // 编辑标记缺陷
export const distinguishNoDefect = params => post('/apis/transportationInspection/inspectDefect/distinguishNoDefect', params); // 标记无缺陷
export const deleteInspectDefect = params => post('/apis/transportationInspection/inspectDefect/deleteInspectDefect', params); // 删除缺陷
export const deleteInspectDefectList = params => post('/apis/transportationInspection/inspectDefect/deleteInspectDefectList', params); // 删除多条缺陷
export const findimgByDefect = params => post('/apis/transportationInspection/inspectDefect/findImgByDefect', params); // 查询数据处理缺陷列表
export const automaticDistinguishDefect = params => post('/apis/transportationInspection/inspectDefect/automaticDistinguishDefect', params); // 缺陷识别
export const findInspectDefectList = params => post('/apis/transportationInspection/inspectDefect/findInspectDefectList', params); // 查询缺陷管理列表
export const findCross = params => post('/apis/transportationInspection/inspectDefect/findCross', params); // 根据任务查询交跨点隐患
export const findSwDefectList = params => post('/apis/transportationInspection/inspectDefect/findSwDefectList', params); // 根据任务查询危险点隐患
export const findPointCloud = params => post('/apis/transportationInspection/inspectDefect/findPointCloud', params); // 查询杆塔点云 通道工况报告
export const findPlanPointCloud = params => post('/apis/transportationInspection/inspectDefect/findPlanPointCloud', params); // 查询任务点云
export const findUavInspectReportList = params => post('/apis/transportationInspection/uavInspectReport/findUavInspectReportList', params); //精细化报告列表
export const updateUavInspectReport = params => post('/apis/transportationInspection/uavInspectReport/updateUavInspectReport', params); //审核报告
export const findInspectList = params => post('/apis/transportationInspection/inspectDefect/findInspectList', params); //查询点云通道报告
export const saveUavPassagewayInspectReport = params => post('/apis/transportationInspection/uavInspectReport/saveUavPassagewayInspectReport', params); //同步通道报告
export const generateDefectReport = params => post('/apis/transportationInspection/reportWord/getDefectReport', params); // 生成精细化报告
// export const taskAllList = params => post('/apis/transportationInspection/uavInspectTask/taskAllList', params); // 参与任务统计


export const examineDefect = params => post('/apis/transportationInspection/inspectDefect/examineDefect', params); // 缺陷列表审核

// 统计分析
export const inspectionStatistics = params => post('/apis/transportationInspection/task/inspectionStatistics', params);
export const findPerson = params => post('/apis/transportationInspection/task/findPerson', params); // 通过班组查询人员
export const inspectionStatisticsList = params => post('/apis/transportationInspection/task/inspectionStatisticsList', params); // 巡视任务查看详情
export const inspectionStatisticsListSee = params => post('/apis/transportationInspection/task/inspectionStatisticsListSee', params); // 统计分析详情查看
export const inspectionVoltage = params => post('/apis/transportationInspection/task/inspectionVoltage', params);
export const defectStatistics = params => post('/apis/transportationInspection/task/defectStatistics', params);  // 缺陷统计
export const defectStatisticsList = params => post('/apis/transportationInspection/task/defectStatisticsList', params); // 缺陷列表
export const barrierStatistics = params => post('/apis/transportationInspection/task/barrierStatistics', params); // 树障隐患统计


export const barrierStatisticsList = params => post('/apis/transportationInspection/task/barrierStatisticsList', params);
// 树障电压
export const barrierVoltage = params => post('/apis/transportationInspection/task/barrierVoltage', params);

// 用户修改自己的信息
export const updateMyselfUser = params => post('/apis/auth/user/updateMyselfUser', params); //  所有字典查询
export const findDictionaries = params => post('/apis/auth/common/findDictionaries', params); //  所有字典查询
export const findorgList = params => post('/apis/auth/common/findorgList', params); //  树结构
export const selectRfHdLineList = params => post('/apis/account/rfHdLine/selectRfHdLineList', params); //  电压地区线路查询
export const getCityName = params => post('/apis/auth/common/getCityName', params); //  根据运维id所属地市名称
export const getUserInfo = params => post('/apis/auth/login/getUserInfo', params); //  根据运维id所属地市名称
export const redisWarningMessage = params =>post("/apis/account/airworthiness/redisWarningMessage", params); // 获取告警消息


//巡航管理
export const cruisemanagement = params =>post("/apis/transportationInspection/tour/findTourPoint", params); // 巡航管理查询
export const addcruisemanagement = params =>post("/apis/transportationInspection/tour/insertTourPoint", params); // 新增
export const modifycruisemanagement = params =>post("/apis/transportationInspection/tour/updateTourPoint", params); // 修改
export const delcruisemanagement = params =>post("/apis/transportationInspection/tour/delTourPoint", params); // 删除

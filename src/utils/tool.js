// 格式化数据
/*
export function dataProcessing(oldData) {

    let lineId = null;

    function formatData(data) {
        let target = [];
        data.forEach(item => {
            if (item.type === 3) {
                if (!lineId) lineId = item.id;
                target.push({id: item.id, name: item.name, type: item.type ? item.type : 0});
            } else {
                target.push({
                    id: item.id,
                    name: item.name,
                    type: item.type ? item.type : 0,
                    children: formatData(item.persontCompanyLineList)
                });
            }
        });
        return target;
    }

    return {data: formatData(oldData), lineId};

}
*/
export function dataProcessing(oldData) {

    let line = null;
    let lineId = null;

    function formatData(data) {
        let target = [];
        data && data.forEach(item => {

            if (item.type === 3) if (!lineId) {
                line = item;
                lineId = item.id;
            }

            target.push({
                ...item,
                id: item.id,
                name: item.name,
                type: item.type ? item.type : 0,
                children: formatData(item.persontCompanyLineList)
            });

        });
        return target;
    }

    return {data: formatData(oldData), lineId, line};

}
UGIS.createTDTLayer("img")
// 初始化地球
export function initMap(sign, mode = false) {

    let pattern = sign === 'DashboardMap' ? 3:2

    let {sceneMode,imageryProvider, terrainProvider, loadData} = window.webConfig.cesiumConfig;
    let viewer = UGIS.createViewer(sign, {
        imageryProvider,
        terrainProvider,
        sceneMode: pattern === 3 ? sceneMode : 2,

    });

    loadData(viewer, pattern);

    return viewer;
}

/**
 * @desc 函数节流
 * @param func 函数
 * @param wait 延迟执行毫秒数
 */
export function throttle(func, wait) {
    let timeout = null
    return function () {
        let context = this
        let args = arguments
        if (!timeout) {
            timeout = setTimeout(() => {
                timeout = null
                func.apply(context, args)
            }, wait)
        }
    }
}

/**
 * @desc 函数防抖
 * @param func 目标函数
 * @param wait 延迟执行毫秒数
 */
export function debounce(func, wait) {
    let timeout = null
    return function () {
        let context = this
        let args = arguments
        if (timeout) clearTimeout(timeout)
        timeout = setTimeout(() => {
            func.apply(context, args)
        }, wait)
    }
}

// 判断图片是否存在
export function CheckImgExists(imgUrl) {
    return new Promise((resolve) => {

        let ImgObj = new Image();
        ImgObj.src = imgUrl;

        ImgObj.onload = () => {
            resolve(true);
        }
        ImgObj.onerror = () => {
            resolve(false);
        }
    })
}

// 通过文件链接下载文件
export function fileDownload(url) {
    let download = document.createElement('a');
    download.style.display = 'none';
    download.href = url;
    document.body.appendChild(download);
    download.click();
    document.body.removeChild(download);
}

// 判断当前是否为Windows操作系统
export function isWin() {
    const userAgent = window.navigator.userAgent.toLowerCase();

    return userAgent.indexOf('win') !== -1;
}

// 通过文件流下载文件
export function post_exportFile(result, name = false) {
    let url = window.URL.createObjectURL(result);
    let download = document.createElement('a');

    download.style.display = 'none';
    download.href = url;
    if (name) download.download = name;

    document.body.appendChild(download);
    download.click();
    document.body.removeChild(download);

    window.URL.revokeObjectURL(url);
}


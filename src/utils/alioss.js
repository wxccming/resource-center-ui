
 
// const OSS = require('ali-oss')
// console.log(JSON.parse(localStorage.getItem("ossdata")))
// const client = new OSS({

//    // 从环境变量中获取访问凭证
//    // 当然，以下两个也可以直接写死
//    region: JSON.parse(localStorage.getItem("ossdata")).region,
//    accessKeyId: JSON.parse(localStorage.getItem("ossdata")).accessKeyId,
//    accessKeySecret: JSON.parse(localStorage.getItem("ossdata")).accessKeySecret,
//    bucket: JSON.parse(localStorage.getItem("ossdata")).bucket,


//   });

//   export const put = async (ObjName, fileUrl) => {
//     try {
//       let result = await client.put(`${ObjName}`, fileUrl)
//       // ObjName为文件名字,可以只写名字，就直接储存在 bucket 的根路径，如需放在文件夹下面直接在文件名前面加上文件夹名称
//       return result
//     } catch (e) {
//       console.log(e)
//     }
//   }
 

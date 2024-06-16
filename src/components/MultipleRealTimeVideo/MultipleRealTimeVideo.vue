<template>
  <div class="LiveVideo">
    <el-row>
      <!--      :gutter="20"-->
      <el-col
        :span="videoOptions.length == 1 ? 24 : 12"
        v-for="(v, i) in videoOptions"
        :key="i"
        class="colVideo"
      >
        <div class="itemVideo">
          <div class="videoItem_tit">
            {{
              videoRows[i].voltageName +
              " " +
              videoRows[i].lineName +
              " " +
              videoRows[i].checkTypeName
            }}
          </div>
          <video-player :options="v" :ref="'videoPlayer' + i"> </video-player>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import videoJs from "video.js";

window.videojs = videoJs;

require("videojs-contrib-hls/dist/videojs-contrib-hls.js");
export default {
  name: "MultipleRealTimeVideo",
  // props: ['address'],
  props: {
    videoRows: {
      type: Array,
      default: [],
    },
  },
  data() {
    return {
      videoOptions: [],
    };
  },
  mounted() {
    console.log("this.videoRows", this.videoRows);
    this.initData();
  },
  methods: {
    initData() {
      let options = [];
      this.videoRows.forEach((v) => {
        console.log("videoRows", v);
        let obj = {
          planCode: v.planCode,
          width: "540",
          autoplay: true,
          height: "338",
          sources: [
            {
              withCredentials: false,
              // src: "/1234.mp4", // 路径
              // type: "video/mp4", // 类型
              type: "application/x-mpegURL",
              src: `/liveVideo/live/stream${v.checkType}${v.id}/hls.m3u8`
              // src: "https://logos-channel.scaleengine.net/logos-channel/live/biblescreen-ad-free/playlist.m3u8",
              // `/liveVideo/live/stream${this.address}.m3u8`
              // src: `/liveVideo/live/stream${v.taskType}${v.taskId}/hls.m3u8`
            },
          ],
          controlBar: {
            timeDivider: false,
            durationDisplay: false,
          },
          flash: { hls: { withCredentials: false } },
          html5: { hls: { withCredentials: false } },
          // poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-5.jpg" // 封面
        };
        options.push(obj);
      });
      this.videoOptions = options;
    },
  },
};
</script>

<style scoped lang="scss">
.LiveVideo {
  margin-top: 20px;
}
.colVideo {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
}
.videoItem_tit {
  color: #ffffff;
  background-color: #2f4895;
  padding: 0 10px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>

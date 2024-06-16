<template>
  <div class="LiveVideo">
    <video-player :options="playerOptions" ref="videoPlayer"> </video-player>
  </div>
</template>

<script>
// import "video-js.css";
import { videoPlayer } from "vue-video-player";
import "videojs-flash";

export default {
  name: "LiveVideo",
  props: {
    address: {
      default: "",
    },
    width: {
      default: 360,
    },
    height: {
      default: 202.5,
    },
  },
  data() {
    return {
      playerOptions: {
        width: this.width,
        autoplay: true,
        height: this.height,
        muted: true,
        sources: [
          {
            // src: "/1234.mp4", // 路径
            // type: "video/mp4", // 类型
            withCredentials: false,
            // type: "application/x-mpegURL",
            // src: "http://playertest.longtailvideo.com/adaptive/bipbop/gear4/prog_index.m3u8",
            src: `/liveVideo/live/stream${this.address}/hls.m3u8`
            // http://live.hazardscience.com.cn/live/stream186/hls.m3u8
          },
        ],
        controlBar: {
          timeDivider: false,
          durationDisplay: false,
        },
        flash: { hls: { withCredentials: false } },
        html5: { hls: { withCredentials: false } },
        // poster: "https://surmon-china.github.io/vue-quill-editor/static/images/surmon-5.jpg"
      },
    };
  },
  methods: {
    zoom({ width, height }) {
      let target = document.getElementsByClassName("video-js")[0];

      target.style.width = width + "px";
      target.style.height = height + "px";
    },
  },
};
</script>

<style scoped lang="scss">
.LiveVideo {
  ::v-deep .video-js .vjs-big-play-button {
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  ::v-deep .video-js {
    transition: all 0.3s;
  }

  ::v-deep .vjs-slider-horizontal .vjs-volume-level:before {
    top: 50%;
    transform: translateY(-50%);
  }
}
</style>

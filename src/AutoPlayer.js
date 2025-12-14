// src/components/AutoPlayer.js
import React from 'react';

// 1. 引入样式文件
import './AutoPlayer.css';

const AutoPlayer = ({ videoSrc }) => {
  return (
    // 注意：React 中使用 className 而不是 class
    <div className="video-container">
      <video
        className="video-player"
        src={videoSrc}
        autoPlay
        muted       // 再次提醒：没有 muted 无法自动播放
        loop        // 循环播放
        playsInline // 移动端防全屏
        controls    // 显示控制条
        ref={el => {
          if (el) {
            // 获取当前分钟和秒，转换成总秒数
            const now = new Date();
            const seconds = now.getMinutes() * 60 + now.getSeconds();
            const startAt = seconds % 180;
            // 设置视频 seek 位置
            el.currentTime = startAt;
          }
        }}
      >
        您的浏览器不支持 video 标签。
      </video>
    </div>
  );
};

export default AutoPlayer;
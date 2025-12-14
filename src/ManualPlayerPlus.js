// src/components/ManualPlayerPlus.js
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Flex, Spin } from 'antd';
// 注意：请确保将原 CSS 文件重命名为 ManualPlayerPlus.css
import './ManualPlayerPlus.css';

const ManualPlayerPlus = ({ videoSrc = [], minLoadingSeconds = 0, isPlaying = false }) => {
  const videoRefs = useRef({});
  const [loadedVideos, setLoadedVideos] = useState({});
  
  // 记录最小等待时间是否已经过去
  const [minTimePassed, setMinTimePassed] = useState(false);

  const isImage = (src) => {
    if (!src) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp', '.svg'];
    const lowerSrc = src.toLowerCase();
    return imageExtensions.some(ext => lowerSrc.endsWith(ext));
  };
  
  // 当 videoSrc 改变时，重置所有状态
  useEffect(() => {
    const initialState = {};
    videoRefs.current = {}; 
    
    if (videoSrc && videoSrc.length > 0) {
      videoSrc.forEach((_, index) => {
        initialState[index] = false;
      });
    }
    setLoadedVideos(initialState);
    setMinTimePassed(false);
  }, [videoSrc]);

  // 计时器逻辑
  useEffect(() => {
    if (minLoadingSeconds <= 0) {
      setMinTimePassed(true);
      return;
    }

    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, minLoadingSeconds * 1000);

    return () => clearTimeout(timer);
  }, [minLoadingSeconds, videoSrc]);

  const handleMediaLoaded = (index) => {
    setLoadedVideos((prev) => ({
      ...prev,
      [index]: true,
    }));
  };

  const allVideosLoaded = useMemo(() => {
    if (!videoSrc || videoSrc.length === 0) return true;
    const loadedCount = Object.values(loadedVideos).filter(Boolean).length;
    return loadedCount === videoSrc.length;
  }, [loadedVideos, videoSrc]);

  // 核心判定：只有当【资源加载完毕】且【时间已到】时，才算准备好
  const isReady = allVideosLoaded && minTimePassed;

  // 监听 isReady 和 isPlaying。只有准备好了，才根据 isPlaying 决定播放或暂停
  useEffect(() => {
    if (isReady) {
      Object.values(videoRefs.current).forEach((videoEl) => {
        if (videoEl) {
          if (isPlaying) {
            // 父组件信号为播放，且资源已就绪 -> 执行播放
            if (typeof videoEl.play === 'function') {
                videoEl.play().catch((error) => {
                console.warn('播放操作被阻止或失败:', error);
                });
            }
          } else {
            // 父组件信号为暂停 -> 执行暂停
            if (typeof videoEl.pause === 'function') {
                videoEl.pause();
            }
          }
        }
      });
    }
  }, [isReady, isPlaying]);

  return (
    <>
      {/* 未准备好时显示 Loading */}
      {!isReady && (
        <Flex
          justify="center"
          align="center"
          style={{ 
            width: '100%', 
            height: '400px', 
            top: 0,
            left: 0,
            zIndex: 10,
            background: 'transparent' 
          }}
        >
          <Spin size="large" tip="">
          数据正在处理中……
          </Spin>
        </Flex>
      )}

      <div 
        className={`video-container-plus ${isReady ? 'video-visible' : 'video-hidden'}`}
      >
        {videoSrc.map((src, index) => {
          const isImageFile = isImage(src);
          
          return (
            <div key={`${src}-${index}`}>
              {isImageFile ? (
                <img
                  className="video-player-plus"
                  src={src}
                  alt={`图片 ${index + 1}`}
                  onLoad={() => handleMediaLoaded(index)}
                  onError={() => handleMediaLoaded(index)}
                />
              ) : (
                <video
                  ref={(el) => (videoRefs.current[index] = el)}
                  className="video-player-plus"
                  src={src}
                  preload="auto" 
                  muted
                  loop
                  playsInline
                  onLoadedData={() => handleMediaLoaded(index)}
                  onError={() => handleMediaLoaded(index)}
                />
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default ManualPlayerPlus;
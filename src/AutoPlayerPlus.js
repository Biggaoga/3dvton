// src/components/AutoPlayer.js
import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Flex, Spin } from 'antd';
import './AutoPlayerPlus.css';

// 1. 新增 minLoadingSeconds 参数，单位为秒
const AutoPlayerPlus = ({ videoSrc = [], minLoadingSeconds = 0 }) => {
  const videoRefs = useRef({});
  const [loadedVideos, setLoadedVideos] = useState({});
  
  // 2. 新增状态：记录最小等待时间是否已经过去
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
    
    // 重置时间状态，准备开始新的计时
    setMinTimePassed(false);
  }, [videoSrc]);

  // 3. 计时器逻辑
  useEffect(() => {
    // 如果没有设置等待时间，直接标记为已通过
    if (minLoadingSeconds <= 0) {
      setMinTimePassed(true);
      return;
    }

    // 设置定时器
    const timer = setTimeout(() => {
      setMinTimePassed(true);
    }, minLoadingSeconds * 1000); // 转换为毫秒

    // 清理定时器（防止组件卸载后报错或逻辑冲突）
    return () => clearTimeout(timer);
  }, [minLoadingSeconds, videoSrc]); // 依赖 videoSrc 确保切换视频时重新计时

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

  // 4. 核心判定：只有当【资源加载完毕】且【时间已到】时，才算准备好
  const isReady = allVideosLoaded && minTimePassed;

  // 监听最终准备状态，执行播放
  useEffect(() => {
    if (isReady) {
      Object.values(videoRefs.current).forEach((videoEl) => {
        if (videoEl && typeof videoEl.play === 'function') {
          videoEl.play().catch((error) => {
            console.warn('自动播放被阻止:', error);
          });
        }
      });
    }
  }, [isReady]); // 这里依赖 isReady 而不是 allVideosLoaded

  return (
    <>
      {/* 5. UI 显示逻辑也改为依赖 isReady */}
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

export default AutoPlayerPlus;
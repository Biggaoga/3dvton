import './App.css';
import { Button, Space, Image, Row, Col } from 'antd';
import { Carousel } from 'antd';
import { useState } from 'react';
import ManualPlayerPlus from './ManualPlayerPlus';
import Tryon from './tryon';
import Drive from './drive'
import TwoImage from './twoImage';
import Segment from './segment';
import Possion from './possion';
import PlyPointCloud from './plyPointCloud';
import AutoPlayerPlus from './AutoPlayerPlus';
import video0 from './resource/input_videos/0.mp4';
import video1 from './resource/input_videos/1.mp4';
import video2 from './resource/input_videos/2.mp4';
import video3 from './resource/input_videos/3.mp4';
import video4 from './resource/input_videos/4.mp4';
import video5 from './resource/input_videos/5.mp4';
import fgr_video0 from './resource/fgr_videos/0_fgr.mp4'
import fgr_video1 from './resource/fgr_videos/1_fgr.mp4';
import fgr_video2 from './resource/fgr_videos/2_fgr.mp4';
import fgr_video3 from './resource/fgr_videos/3_fgr.mp4';
import fgr_video4 from './resource/fgr_videos/4_fgr.mp4';
import fgr_video5 from './resource/fgr_videos/5_fgr.mp4';
import try_on_img0 from './resource/first_frames_tryon/000.png';
import try_on_img1 from './resource/first_frames_tryon/001.png';
import try_on_img2 from './resource/first_frames_tryon/002.png';
import try_on_img3 from './resource/first_frames_tryon/003.png';
import try_on_img4 from './resource/first_frames_tryon/004.png';
import try_on_img5 from './resource/first_frames_tryon/005.png';
import wan_drive0 from './resource/wan_drive/0000.mp4'
import wan_drive1 from './resource/wan_drive/0001.mp4';
import wan_drive2 from './resource/wan_drive/0002.mp4';
import wan_drive3 from './resource/wan_drive/0003.mp4';
import wan_drive4 from './resource/wan_drive/0004.mp4';
import wan_drive5 from './resource/wan_drive/0005.mp4';
import segment0 from './resource/segment_videos/black_bg_mask_0.mp4';
import segment1 from './resource/segment_videos/black_bg_mask_1.mp4';
import segment2 from './resource/segment_videos/black_bg_mask_2.mp4';
import segment3 from './resource/segment_videos/black_bg_mask_3.mp4';
import segment4 from './resource/segment_videos/black_bg_mask_4.mp4';
import segment5 from './resource/segment_videos/black_bg_mask_5.mp4';
import possion0 from './resource/possion_videos/rgb_0.mp4';
import possion1 from './resource/possion_videos/rgb_1.mp4';
import possion2 from './resource/possion_videos/rgb_2.mp4';
import possion3 from './resource/possion_videos/rgb_3.mp4';
import possion4 from './resource/possion_videos/rgb_4.mp4';
import possion5 from './resource/possion_videos/rgb_5.mp4';
import origin_cloth0 from './resource/origin_clothes/black_bg_mask_0.mp4'
import origin_cloth1 from './resource/origin_clothes/black_bg_mask_1.mp4'
import origin_cloth2 from './resource/origin_clothes/black_bg_mask_2.mp4'
import origin_cloth3 from './resource/origin_clothes/black_bg_mask_3.mp4'
import origin_cloth4 from './resource/origin_clothes/black_bg_mask_4.mp4'
import origin_cloth5 from './resource/origin_clothes/black_bg_mask_5.mp4'
import show_ply from './resource/assets/show.ply';

const videoSources = [video0, video1, video2, video3, video4, video5];
const fgrVideoSources = [fgr_video0, fgr_video1, fgr_video2, fgr_video3, fgr_video4, fgr_video5];
const tryOnImgSources = [try_on_img0, try_on_img1, try_on_img2, try_on_img3, try_on_img4, try_on_img5];
const wanDriveSources = [wan_drive0, wan_drive1, wan_drive2, wan_drive3, wan_drive4, wan_drive5];
const segmentSources = [segment0, segment1, segment2, segment3, segment4, segment5];
const possionSources = [possion0, possion1, possion2, possion3, possion4, possion5];
const originClothSources = [origin_cloth0, origin_cloth1, origin_cloth2, origin_cloth3, origin_cloth4, origin_cloth5];
const showPlySources = show_ply;
function App() {
  const [isRecording, setIsRecording] = useState(false);
  const [lastIsRecording, setLastIsRecording] = useState(false);
  const [isTryon, setIsTryon] = useState(false)
  const [isDrive, setIsDrive] = useState(false)
  const [isSegmentation, setIsSegmentation] = useState(false)
  const [isPoissonFusion, setIsPoissonFusion] = useState(false)
  const [isManualPlayerPlus, setIsManualPlayerPlus] = useState(false)
  // const geometry = useLoader(PLYLoader, './resource/assets/show.ply');
  const handleRecordClick = () => {
    const tmpIsRecording = isRecording;
    setIsRecording(!tmpIsRecording);
    setLastIsRecording(tmpIsRecording);
    const tmpIsManualPlayerPlus = isManualPlayerPlus;
    setIsManualPlayerPlus(!tmpIsManualPlayerPlus);
    // console.log('isRecording:', isRecording, 'lastIsRecording:', lastIsRecording);
    if(lastIsRecording == true && isRecording == false){
      setIsTryon(false);
      setIsDrive(false);
      setIsSegmentation(false);
      setIsPoissonFusion(false);
    }
  };
  const handleTryonClick = () => {
    setIsTryon(true);
  }
  const handleDriveClick = () => {
    setIsDrive(true);
  }
  const handleSegmentationClick = () => {
    setIsSegmentation(true);
  }
  const handlePoissonFusionClick = () => {
    setIsPoissonFusion(true);
  }

  return (
    <div className="App">
      <div className="title">
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <img
            src={require('./resource/assets/title.png')}
            alt="标题"
            style={{
              width: '50%',
              height: 'auto',
            }}
          />
        </div>
      </div>
      {/* <div className="video-grid">
        {videoSources.map((videoSrc, index) => (
          <AutoPlayer videoSrc={videoSrc} />
        ))}
      </div> */}
      {/* <AutoPlayerPlus videoSrc={videoSources} minLoadingSeconds={1}/> */}
      <ManualPlayerPlus videoSrc={videoSources} minLoadingSeconds={1} isPlaying={isManualPlayerPlus}/>
      <Space wrap style={{ marginTop: '32px', marginBottom: '32px', columnGap: '60px' }}>
        <Button 
          className={isRecording ? "start-button recording" : "start-button"} 
          size="large"
          onClick={handleRecordClick}
        >
          {isRecording ? "结束录制" : "开始录制"}
        </Button>
        {/* <Button className="end-button" size="large">结束录制</Button> */}
      </Space>
      {
        lastIsRecording === true && isRecording === false && (
          <>
            <div
              className="fgr-title"
              ref={el => {
                if (
                  el &&
                  lastIsRecording === true &&
                  isRecording === false
                ) {
                  setTimeout(() => {
                    el.scrollIntoView({
                      behavior: 'smooth',
                      block: 'center',
                    });
                  }, 400); // 等动画开始再滚动，自行调整延迟
                }
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src={require('./resource/assets/fgr_title.png')}
                  alt="FGR标题"
                  style={{
                    width: '50%',
                    height: 'auto',
                  }}
                />
              </div>

            {/* <div className="video-grid fgr-video-grid">
              {fgrVideoSources.map((videoSrc, index) => (
                <AutoPlayer videoSrc={videoSrc} key={index} />
              ))}
            </div> */}
            <AutoPlayerPlus videoSrc={fgrVideoSources} minLoadingSeconds={3}/>
            <AutoPlayerPlus videoSrc={originClothSources} minLoadingSeconds={3}/>
            {/* <PlyPointCloud url={showPlySources} pointSize={0.02} color="orange" /> */}
            </div>

            {/* 选择衣服界面 */}
            <Space style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px'}}>
              <Row>
              <Col span={12}>
                <img className='choose-cloth-img' src={require('./resource/assets/choose_cloth.png')} alt="换衣标题" />
              </Col>
              <Col span={12}>
                <Carousel arrows dotPlacement="start" infinite={false}>
                    <TwoImage imgSrc1={require('./resource/clothes/0108_front.jpg')} imgSrc2={require('./resource/clothes/0108_back.jpg')} />
                    <TwoImage imgSrc1={require('./resource/clothes/0532_front.jpg')} imgSrc2={require('./resource/clothes/0532_back.jpg')} />
                    <TwoImage imgSrc1={require('./resource/clothes/0533_front.jpg')} imgSrc2={require('./resource/clothes/0533_back.jpg')} />
                    <TwoImage imgSrc1={require('./resource/clothes/0534_front.jpg')} imgSrc2={require('./resource/clothes/0534_back.jpg')} />
                </Carousel>
              </Col>
              </Row>
            </Space>
            {/* 开始换衣按钮 */}
            <Space wrap style={{ marginTop: '32px', marginBottom: '32px', columnGap: '60px' }}>
              <Button className='start-fgr-button' size="large" onClick={handleTryonClick}>开始换衣</Button>
            </Space>
          </>
        )
      }
      {
        isTryon == true && (
          <div
            ref={el => {
              if (
                el &&
                isTryon === true
              ) {
                setTimeout(() => {
                  el.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                  });
                }, 400); // 等动画开始再滚动，自行调整延迟
              }
            }}
          >
            <Tryon tryOnImgSources={tryOnImgSources} onStartDrive={handleDriveClick} />
          </div>

        )
      }
      {
        isDrive === true && (
          <div
            ref={el => {
              if (
                el &&
                isDrive === true
              ) {
                setTimeout(() => {
                  el.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                  });
                }, 400); // 等动画开始再滚动，自行调整延迟
              }
            }}
          >
            <Drive driveSources={wanDriveSources} onStartSegmentation={handleSegmentationClick}/>
          </div>
        )
      }
      {
        isSegmentation === true && (
          <div
            ref={el => {
              if (
                el &&
                isSegmentation === true
              ) {
                setTimeout(() => {
                  el.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                  });
                }, 400); // 等动画开始再滚动，自行调整延迟
              }
            }}
          >
            <Segment segmentSources={segmentSources} onStartPoissonFusion={handlePoissonFusionClick}/>
          </div>
        )
      }
      {
        isPoissonFusion === true && (
          <div
            ref={el => {
              if (
                el &&
                isPoissonFusion === true
              ) {
                setTimeout(() => {
                  el.scrollIntoView({
                    behavior: 'smooth',
                    block: 'center',
                  });
                }, 400); // 等动画开始再滚动，自行调整延迟
              }
            }}
          >
            <Possion possionSources={possionSources}/>
          </div>
        )
      }
    </div>
  );
}

export default App;

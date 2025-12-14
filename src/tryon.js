import './tryon.css';
import { Space, Button} from 'antd';
import AutoPlayerPlus from './AutoPlayerPlus';


function Tryon({ tryOnImgSources, onStartDrive }) {



  return (
    <>
    <img className='try-on-title' src={require('./resource/assets/tryon_title.png')} alt="换衣标题" />
      {/* <Space style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px'}}>
        {
          tryOnImgSources.map((tryOnImgSrc, index) => (
            <img className='try-on-img' src={tryOnImgSrc} alt="换衣图片" key={index} />
          ))
        }
      </Space> */}
      <AutoPlayerPlus videoSrc={tryOnImgSources} minLoadingSeconds={3}/>
      <Space style={{ marginTop: '32px', marginBottom: '32px', columnGap: '60px' }}>
        <Button className='start-video-button' size="large" onClick={onStartDrive}>开始视频驱动</Button>
      </Space>
    </>
  );
}

export default Tryon;
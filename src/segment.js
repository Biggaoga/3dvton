import './segment.css'
import { Space, Button, Upload, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import AutoPlayer from './AutoPlayer';
import AutoPlayerPlus from './AutoPlayerPlus';
function Segment({segmentSources, onStartPoissonFusion}){

    return (
        <>
            <Space style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px'}}>
                <img className='segment-img' src={require('./resource/assets/segment_title.png')} alt="换衣标题" />
            </Space>
            {/* <Space style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px'}}>
            {segmentSources.map((videoSrc, index) => (
                <AutoPlayer videoSrc={videoSrc} key={index} />
            ))} 
            </Space> */}
            {/* <Space style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px'}}>
            <AutoPlayerPlus videoSrc={segmentSources} />
            </Space> */}
            <AutoPlayerPlus videoSrc={segmentSources} minLoadingSeconds={3}/>
            <Space style={{ marginTop: '32px', marginBottom: '32px', columnGap: '60px' }}>
                <Button className='start-segmentation-button' size="large" onClick={onStartPoissonFusion}>泊松融合获取最终结果</Button>
            </Space>
        </>
    )
}

export default Segment;
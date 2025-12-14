import './drive.css'
import { Space, Button, Upload, Image } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';
import AutoPlayer from './AutoPlayer';
import AutoPlayerPlus from './AutoPlayerPlus';

function Drive({driveSources, onStartSegmentation}){

    return (
        <>
            <Space style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px'}}>
                <img className='drive-img' src={require('./resource/assets/wan_title.png')} alt="换衣标题" />
            </Space>
            {/* <Space style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px'}}>
            {driveSources.map((videoSrc, index) => (
                <AutoPlayer videoSrc={videoSrc} key={index} />
            ))} */}
            <AutoPlayerPlus videoSrc={driveSources} minLoadingSeconds={3}/>
            <Space style={{ marginTop: '32px', marginBottom: '32px', columnGap: '60px' }}>
                <Button className='start-segmentation-button' size="large" onClick={onStartSegmentation}>开始分割上衣区域</Button>
            </Space>
        </>
    )
}

export default Drive;
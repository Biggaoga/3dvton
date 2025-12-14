import './possion.css'
import { Space, Button, Upload, Image } from 'antd';
import AutoPlayer from './AutoPlayer';
import AutoPlayerPlus from './AutoPlayerPlus';
function Possion({possionSources}){

    return (
        <>
            <Space style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px'}}>
                <img className='possion-img' src={require('./resource/assets/possion_title.png')} alt="换衣标题" />
            </Space>
            <AutoPlayerPlus videoSrc={possionSources} minLoadingSeconds={3}/>
        </>
    )
}

export default Possion;
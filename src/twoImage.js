import { Space, Image } from 'antd';
import './twoImage.css';

function TwoImage({ imgSrc1, imgSrc2 }) {
  return (
    <Space direction="horizontal" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
      <div className='two-image-container'>
      <Image
        src={imgSrc1}
        alt="图片1"
        style={{ maxWidth: '220px', borderRadius: '12px' }}
        preview={false}
      />
      <Image
        src={imgSrc2}
        alt="图片2"
        style={{ maxWidth: '220px', borderRadius: '12px' }}
        preview={false}
      />
      </div>
    </Space>
  );
}

export default TwoImage;

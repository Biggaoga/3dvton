import React, { useMemo } from 'react';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei'; // 1. 引入控件
import { Space, Row, Col } from 'antd';
import './plyPointCloud.css'

const PlyPointCloud = ({ url, pointSize = 0.05, color }) => {
  const geometry = useLoader(PLYLoader, url);

  useMemo(() => {
    geometry.computeVertexNormals();
    geometry.center();
  }, [geometry]);

  return (
    <Space style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: '10px'}}>
      <Row>
        <Col span={8}>
          <Canvas 
        style={{ 
          aspectRatio: '16/9',
          height: '400px', 
          marginLeft: 'auto', 
          marginRight: 'auto', 
          marginTop: '20px', 
          marginBottom: '20px', 
          border: '2px solid #ccc', 
          borderRadius: '8px' 
        }}
        // 设置相机初始位置，避免模型离得太近或太远
        camera={{ position: [0, 0, 5], fov: 50 }} 
      >
          {/* 2. 添加环境光（可选，虽然点云通常不需要光照，但加上是个好习惯） */}
          <ambientLight intensity={0.5} />

          <points geometry={geometry}>
            <pointsMaterial
                size={pointSize}
                vertexColors={!color}
                color={color}
                sizeAttenuation={true}
                transparent={false}
            />
          </points>

          {/* 3. 添加轨道控制器 */}
          {/* makeDefault 使得它成为默认控制器，enableDamping 让旋转有惯性更平滑 */}
          <OrbitControls makeDefault enableDamping={true} />
          
          {/* 辅助工具：显示坐标轴 (X红, Y绿, Z蓝)，参数是轴的长度 */}
          {/* <axesHelper args={[2]} />  */}
      </Canvas>
        </Col>

        <Col span={16}>
        <img className='title-3d' src={require('./resource/assets/3d_title.png')} alt="点云" />
        </Col>
      </Row>

    </Space>
  );
};

export default PlyPointCloud;
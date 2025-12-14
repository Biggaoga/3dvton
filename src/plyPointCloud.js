import React, { useMemo } from 'react';
import { PLYLoader } from 'three/examples/jsm/loaders/PLYLoader';
import { Canvas, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

// 子组件：专门负责加载和渲染 PLY
const PlyPointCloud = ({ url, pointSize = 0.05, color }) => {
  // 1. 使用 useLoader 异步加载 PLY 文件
  const geometry = useLoader(PLYLoader, url);

  // 2. (可选) 性能优化与几何体处理
  useMemo(() => {
    // 重新计算法线（如果文件不包含法线）
    geometry.computeVertexNormals(); 
    // 将模型居中，防止它出现在离原点很远的地方
    geometry.center(); 
  }, [geometry]);

  return (
    // 3. 使用 <points> 渲染点云，而不是 <mesh>
    <Canvas className='ply-point-cloud-canvas'>
        <points geometry={geometry}>
        <pointsMaterial
            size={pointSize}              // 点的大小
            vertexColors={!color}         // 如果PLY自带颜色则设为true，否则使用单一颜色
            color={color}                 // 如果没有顶点颜色，使用此统颜色
            sizeAttenuation={true}        // 近大远小效果
            transparent={false}
        />
        </points>
    </Canvas>
  );
};

export default PlyPointCloud;
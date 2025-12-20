import './tryon.css';
import { Space, Button} from 'antd';
import { useEffect } from 'react';
import AutoPlayerPlus from './AutoPlayerPlus';
import img0 from './resource/first_frames/000.jpg';
import img1 from './resource/first_frames/001.jpg';
import img2 from './resource/first_frames/002.jpg';
import img3 from './resource/first_frames/003.jpg';
import img4 from './resource/first_frames/004.jpg';
import img5 from './resource/first_frames/005.jpg';
import demo_front from './resource/clothes/0108_front.jpg';
import demo_back from './resource/clothes/0108_back.jpg';
import npyjs from 'npyjs';

const origin_imgs = [img0, img1, img2, img3, img4, img5]

// 模块级标志，防止在 StrictMode 下重复请求
let hasTested = false;

/**
 * 将图片资源转换为Blob对象
 * 支持：File对象、Blob对象、base64字符串、图片URL
 * @param {File|Blob|string} img - 图片资源
 * @returns {Promise<Blob>} Blob对象
 */
async function imgToBlob(img) {
  // 如果已经是Blob或File对象，直接返回
  if (img instanceof Blob || img instanceof File) {
    return img;
  }
  
  // 如果是base64字符串
  if (typeof img === 'string' && img.startsWith('data:')) {
    const response = await fetch(img);
    return await response.blob();
  }
  
  // 如果是URL字符串，先fetch获取
  if (typeof img === 'string') {
    const response = await fetch(img);
    return await response.blob();
  }
  
  throw new Error('不支持的图片格式');
}

/**
 * 发送图片到后端获取tryon结果
 * @param {Array<File|Blob|string>} person_imgs - 6张人物图片数组
 * @param {File|Blob|string} cloth_f - 衣服正面图片
 * @param {File|Blob|string} cloth_b - 衣服背面图片
 * @param {string} url - 后端API地址，默认为 'http://127.0.0.1:5004/get_low_tryon'
 * @returns {Promise<ArrayBuffer>} 返回响应的二进制数据（numpy数组的二进制格式）
 */
async function sendImagesToBackend(person_imgs, cloth_f, cloth_b, url = 'http://127.0.0.1:5004/get_low_tryon') {
  try {
    const formData = new FormData();
    
    // 1. 处理6张人物图片
    for (let idx = 0; idx < person_imgs.length; idx++) {
      const img = person_imgs[idx];
      const blob = await imgToBlob(img);
      // 确保是PNG格式，如果原图不是PNG，可以在这里转换
      formData.append(`person_${idx}`, blob, `p${idx}.png`);
    }
    
    // 2. 处理衣服图片
    const clothFrontBlob = await imgToBlob(cloth_f);
    const clothBackBlob = await imgToBlob(cloth_b);
    
    formData.append('cloth_front', clothFrontBlob, 'c_front.png');
    formData.append('cloth_back', clothBackBlob, 'c_back.png');
    
    // 3. 发送POST请求
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      // 注意：不要手动设置Content-Type，浏览器会自动设置multipart/form-data边界
    });
    
    if (!response.ok) {
      throw new Error(`HTTP错误! 状态: ${response.status}`);
    }
    
    console.log(`Status: ${response.status}`);
    
    // 4. 获取响应数据（numpy数组的二进制格式）
    const arrayBuffer = await response.arrayBuffer();
    
    return arrayBuffer;
    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}

/**
 * 发送高分辨率图片到后端获取high tryon结果
 * @param {Array<File|Blob|string>} person_imgs - 6张高分辨率人物图片数组
 * @param {Array<File|Blob|string>} low_person_imgs - 6张低分辨率人物图片数组
 * @param {File|Blob|string} cloth_f - 衣服正面图片
 * @param {File|Blob|string} cloth_b - 衣服背面图片
 * @param {string} url - 后端API地址，默认为 'http://127.0.0.1:5005/get_high_tryon'
 * @returns {Promise<ArrayBuffer>} 返回响应的二进制数据（numpy数组的二进制格式）
 */
async function sendImagesHighToBackend(person_imgs, low_person_imgs, cloth_f, cloth_b, url = 'http://127.0.0.1:5005/get_high_tryon') {
  try {
    const formData = new FormData();
    
    // 1. 处理6张高分辨率人物图片
    for (let idx = 0; idx < person_imgs.length; idx++) {
      const img = person_imgs[idx];
      const blob = await imgToBlob(img);
      formData.append(`person_${idx}`, blob, `p${idx}.png`);
    }
    
    // 2. 处理6张低分辨率人物图片
    for (let idx = 0; idx < low_person_imgs.length; idx++) {
      const img = low_person_imgs[idx];
      const blob = await imgToBlob(img);
      formData.append(`low_person_${idx}`, blob, `p${idx}.png`);
    }
    
    // 3. 处理衣服图片
    const clothFrontBlob = await imgToBlob(cloth_f);
    const clothBackBlob = await imgToBlob(cloth_b);
    
    formData.append('cloth_front', clothFrontBlob, 'c_front.png');
    formData.append('cloth_back', clothBackBlob, 'c_back.png');
    
    // 4. 发送POST请求
    const response = await fetch(url, {
      method: 'POST',
      body: formData,
      // 注意：不要手动设置Content-Type，浏览器会自动设置multipart/form-data边界
    });
    
    if (!response.ok) {
      throw new Error(`HTTP错误! 状态: ${response.status}`);
    }
    
    console.log(`Status: ${response.status}`);
    
    // 5. 获取响应数据（numpy数组的二进制格式）
    const arrayBuffer = await response.arrayBuffer();
    
    return arrayBuffer;
    
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
}




function Tryon({ tryOnImgSources, onStartDrive }) {
  // 组件加载时自动测试API
  useEffect(() => {
    // 如果已经测试过，直接返回（防止 StrictMode 下的重复调用）
    if (hasTested) {
      return;
    }
    
    hasTested = true;
    
    const testTryon = async () => {
      console.log('开始测试 Tryon API...');
      console.log('使用图片:', {
        person_imgs: origin_imgs.length,
        cloth_front: demo_front,
        cloth_back: demo_back
      });
      
      try {
        // 第一步：调用低分辨率 tryon API
        const lowResult = await sendImagesToBackend(
          origin_imgs,  // 6张人物图片
          demo_front,    // 衣服正面
          demo_back,     // 衣服背面
          'http://127.0.0.1:5004/get_low_tryon'
        );
        
        console.log('✅ 低分辨率请求成功！收到数据大小:', lowResult.byteLength, '字节');
        console.log('低分辨率响应数据:', lowResult);
        
        // 将 ArrayBuffer 转换为 Blob（假设返回的是图片数据）
        // 如果返回的是 numpy 数组格式，可能需要使用专门的库来解析
        const lowResultBlob = new Blob([lowResult], { type: 'application/octet-stream' });
        
        // 如果返回的是包含多张图片的数据，可能需要解析
        // 这里假设返回的数据可以直接使用，或者需要根据实际格式解析
        // 暂时使用 origin_imgs 作为 low_person_imgs（如果返回的不是图片数组格式）
        // 如果需要从返回的数据中提取图片，需要根据实际的数据格式进行解析
        
        // 第二步：调用高分辨率 tryon API
        console.log('开始调用高分辨率 Tryon API...');
        
        // 方案1: 如果返回的 ArrayBuffer 包含处理后的低分辨率图片数组
        // 需要根据实际返回格式解析，这里先使用 origin_imgs 作为示例
        // 方案2: 如果返回的是单张图片或需要特殊解析，需要相应处理
        
        // 暂时使用 origin_imgs 作为 low_person_imgs（需要根据实际情况调整）
        // 如果返回的数据是图片数组，需要解析 ArrayBuffer 并转换为图片数组
        const highResult = await sendImagesHighToBackend(
          origin_imgs,      // 6张高分辨率人物图片
          origin_imgs,      // 6张低分辨率人物图片（这里使用原始图片，实际应该使用 lowResult 解析后的结果）
          demo_front,        // 衣服正面
          demo_back,         // 衣服背面
          'http://127.0.0.1:5005/get_high_tryon'
        );
        
        console.log('✅ 高分辨率请求成功！收到数据大小:', highResult.byteLength, '字节');
        console.log('高分辨率响应数据:', highResult);
        
        // 如果需要进一步处理结果，可以在这里添加代码
        // 例如：将 ArrayBuffer 转换为图片显示等
        
      } catch (error) {
        console.error('❌ 测试失败:', error);
        console.error('错误详情:', error.message);
      }
    };
    
    // 自动执行测试
    testTryon();
  }, []); // 空依赖数组，只在组件挂载时执行一次

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
export { sendImagesToBackend, sendImagesHighToBackend };
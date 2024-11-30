/**
 * 智能文本脱敏函数
 * @param {string} text - 需要脱敏的文本
 * @returns {string} - 脱敏后的文本
 */
function maskText(text) {
    // 参数校验
    if (!text) return '';
    if (typeof text !== 'string') {
      text = String(text);
    }
  
    const totalLen = text.length;
    
    // 长度为1直接返回
    if (totalLen <= 1) return text;
    
    // 计算保留长度的规则
    let startLen, endLen;
    
    if (totalLen <= 4) {
      // 短文本：保留首尾各1个字符
      startLen = 1;
      endLen = 1;
    } else if (totalLen <= 8) {
      // 中等文本：开头2个，结尾1个
      startLen = 2;
      endLen = 1;
    } else if (totalLen <= 16) {
      // 长文本：开头3个，结尾2个
      startLen = 3;
      endLen = 2;
    } else {
      // 超长文本：开头4个，结尾3个
      startLen = 4;
      endLen = 3;
    }
  
    // 获取开头和结尾的文本
    const startText = text.substring(0, startLen);
    const endText = text.substring(totalLen - endLen);
  
    // 计算中间需要多少个 *
    const maskLen = totalLen - startLen - endLen;
    const maskText = '*'.repeat(maskLen);
  
    return `${startText}${maskText}${endText}`;
  }
  
  export default maskText;
const fs = require('fs');
const crypto = require('crypto');
const path = require('path');

// 注意：需要安装 crypto-js: npm install crypto-js
const CryptoJS = require('crypto-js');

function _0x442c(_0x1c5d27, _0x1eb2df) {
    const _0x2f5390 = _0x2f53();
    return _0x442c = function(_0x442cb3, _0x2e6e94) {
        _0x442cb3 = _0x442cb3 - 0x16d;
        let _0x1db293 = _0x2f5390[_0x442cb3];
        return _0x1db293;
    }
    ,
    _0x442c(_0x1c5d27, _0x1eb2df);
}
(function(_0x32fd6e, _0x4692e5) {
    const _0x1eceb2 = _0x442c
      , _0x1c6ed7 = _0x32fd6e();
    while (!![]) {
        try {
            const _0x421b37 = parseInt(_0x1eceb2(0x175)) / 0x1 * (-parseInt(_0x1eceb2(0x170)) / 0x2) + -parseInt(_0x1eceb2(0x17c)) / 0x3 * (parseInt(_0x1eceb2(0x184)) / 0x4) + -parseInt(_0x1eceb2(0x171)) / 0x5 + -parseInt(_0x1eceb2(0x180)) / 0x6 * (-parseInt(_0x1eceb2(0x16e)) / 0x7) + parseInt(_0x1eceb2(0x17d)) / 0x8 * (parseInt(_0x1eceb2(0x17f)) / 0x9) + parseInt(_0x1eceb2(0x183)) / 0xa + -parseInt(_0x1eceb2(0x181)) / 0xb * (-parseInt(_0x1eceb2(0x172)) / 0xc);
            if (_0x421b37 === _0x4692e5)
                break;
            else
                _0x1c6ed7['push'](_0x1c6ed7['shift']());
        } catch (_0x407f5a) {
            _0x1c6ed7['push'](_0x1c6ed7['shift']());
        }
    }
}(_0x2f53, 0x5ebdf));

function decryptImage3(_0x11ceb3) {
    const _0x4ce878 = _0x442c;
    try {
        const _0x19e68b = CryptoJS[String['fromCharCode'](0x65) + String[_0x4ce878(0x182)](0x6e) + String['fromCharCode'](0x63)][String[_0x4ce878(0x182)](0x55) + String['fromCharCode'](0x74) + String[_0x4ce878(0x182)](0x66) + String[_0x4ce878(0x182)](0x38)][String[_0x4ce878(0x182)](0x70) + _0x4ce878(0x179)](_0x4ce878(0x176)[_0x4ce878(0x174)]('_')[_0x4ce878(0x16d)](_0x11164b => String['fromCharCode'](parseInt(_0x11164b)))[_0x4ce878(0x178)](''))
          , _0x2d2822 = CryptoJS[String[_0x4ce878(0x182)](0x65) + String['fromCharCode'](0x6e) + String[_0x4ce878(0x182)](0x63)][String['fromCharCode'](0x55) + String[_0x4ce878(0x182)](0x74) + String['fromCharCode'](0x66) + String[_0x4ce878(0x182)](0x38)][String[_0x4ce878(0x182)](0x70) + _0x4ce878(0x179)](_0x4ce878(0x16f)[_0x4ce878(0x174)]('_')[_0x4ce878(0x16d)](_0x50224b => String['fromCharCode'](parseInt(_0x50224b)))[_0x4ce878(0x178)](''))
          , _0x1ef406 = CryptoJS['AES']['decrypt'](_0x11ceb3, _0x19e68b, {
            'iv': _0x2d2822,
            'mode': CryptoJS[_0x4ce878(0x17b)]['CBC'],
            'padding': CryptoJS[_0x4ce878(0x173)]['Pkcs7']
        });
        return _0x1ef406[_0x4ce878(0x17e)](CryptoJS[_0x4ce878(0x17a)][_0x4ce878(0x177)]);
    } catch (_0x544ab2) {
        return '';
    }
}

function _0x2f53() {
    const _0x38ae7a = ['Base64', 'join', 'arse', 'enc', 'mode', '1119fpkgWP', '16geOHAu', 'toString', '2758293xEIARY', '6peaOse', '6075773QCsjiV', 'fromCharCode', '3914210bXiumy', '8144yFccIN', 'map', '2827027mINBQi', '57_55_98_54_48_51_57_52_97_98_99_50_102_98_101_49', '4kGLuyr', '1304260BLiopi', '12NdebZO', 'pad', 'split', '276118tUSBDS', '102_53_100_57_54_53_100_102_55_53_51_51_54_50_55_48'];
    _0x2f53 = function() {
        return _0x38ae7a;
    }
    ;
    return _0x2f53();
}

// 将ArrayBuffer转换为base64字符串
function ab2b64_v2(buffer) {
    let binary = '';
    const bytes = new Uint8Array(buffer);
    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
	//  return btoa(binary);
    // btoa is not defined in node.js
    return Buffer.from(binary, 'binary').toString('base64');
}

// 将base64字符串转换为Buffer
function base64ToBuffer(base64String) {
    // 移除data URL前缀（如果有的话）
    const base64Data = base64String.replace(/^data:image\/[a-z]+;base64,/, '');
    // 将base64字符串转换为Buffer
    return Buffer.from(base64Data, 'base64');
}


// https://pic.tnihkx.cn/upload_01/xiao/20250622/2025062220280824964.jpeg
// https://pic.tnihkx.cn/upload_01/xiao/20250622/2025062220280858582.jpeg
// 浏览器里测试成功
async function genImg(iurl) {
    const response = await fetch(iurl);
    const buffer = await response.arrayBuffer();
     
    const e64 = ab2b64_v2(buffer);
    console.log(`e64: ${e64}`);
    new_d64 = decryptImage3(e64);

    console.log(`new_d64: ${new_d64}`);
    const newImg = document.createElement("img");
    newImg.src = "data:image/png;base64," + new_d64;
    const images = document.querySelectorAll("img[data-xkrkllgl]");
    const newP = document.createElement("p");
    newP.textContent = "tested";
    images[0].insertAdjacentElement("afterend",newP);
    images[0].insertAdjacentElement("afterend",newImg);
}

exports.asynDecryptImageFileFrom51Chigua = async (inputFile) => {
  return new Promise((resolve) => {
    resolve(
      decryptImageFileFrom51Chigua(inputFile));
  })
}

exports.decryptImageFileFrom51Chigua = (inputFile) => {
  if (!fs.existsSync(inputFile)) {
    console.error("❌ 输入文件不存在:", inputFile);
    // process.exit(1);
    return 1;
  }

  try {
    const encryptedBuffer = fs.readFileSync(inputFile);

    const e64 = ab2b64_v2(encryptedBuffer);

    if(e64.startsWith('/9j/')) {
      // console.info("✅ 跳过jpg文件，有/9j/开头"); 
      return 0;
    }
    if(e64.startsWith('ivBOR')) {
      // console.info("✅ 跳过png文件，有ivBOR开头");
      return 0;
    }

    // console.log(`🔓 解密中...`);
    const decryptedBase64 = decryptImage3(e64);

    if (!decryptedBase64) {
      // console.error("❌ 解密失败，返回空结果");
      // process.exit(1);
      return 1;
    }
    const outputFile = inputFile;
    // console.log(`💾 保存解密后的图片: ${outputFile}`);
    // console.log(`decrypt b64: ${decryptedBase64}`);
    if(! decryptedBase64.startsWith('/9j/')) {
        console.error("! 不是以/9j/开头，可能解密失败"); 
    }
    const decryptedBuffer = base64ToBuffer(decryptedBase64);
    fs.writeFileSync(outputFile, decryptedBuffer);

    // console.log(`✅ 解密成功：${outputFile}`);
    // console.log(`📊 文件大小: ${decryptedBuffer.length} 字节`);
    return 0;
  } catch (error) {
    console.error("❌ 处理过程中出错:", error.message);
    // process.exit(1);
    return 1;
  }
}


// 主函数：读取文件 -> 解密 -> 写文件
function main() {
    // skip nodejs path, and script path
  const args = process.argv.slice(2);
  var inputFile = "unknown-input.unknown";
  var outputFile = inputFile;
  if (args.length == 1) {
    inputFile = args[0];
    outputFile = inputFile; 
  } else if (args.length == 2) {
    inputFile = args[0];
    outputFile = args[1];
  } else {
    console.error("用法1: node 0decryptImage.js <输入文件>");
    console.error("用法2: node 0decryptImage.js <输入文件> <输出文件>");
    console.error("示例: node 0decryptImage.js encrypted.jpg decrypted.png");
    process.exit(1);
  }


  if (!fs.existsSync(inputFile)) {
    console.error("❌ 输入文件不存在:", inputFile);
    process.exit(1);
  }

  try {
    console.log(`📖 读取加密文件: ${inputFile}`);
    const encryptedBuffer = fs.readFileSync(inputFile);

    console.log(`🔐 转换为base64...`);
    const e64 = ab2b64_v2(encryptedBuffer);

    if(e64.startsWith('/9j/')) {
        console.info("✅ 跳过jpg文件，有/9j/开头"); 
        process.exit(0);
    }
    if(e64.startsWith('ivBOR')) {
        console.info("✅ 跳过png文件，有ivBOR开头");
        process.exit(0);
    }

    console.log(`🔓 解密中...`);
    const decryptedBase64 = decryptImage3(e64);

    if (!decryptedBase64) {
      console.error("❌ 解密失败，返回空结果");
      process.exit(1);
    }

    console.log(`💾 保存解密后的图片: ${outputFile}`);
    // console.log(`decrypt b64: ${decryptedBase64}`);
    if(! decryptedBase64.startsWith('/9j/')) {
        console.error("! 不是以/9j/开头，可能解密失败"); 
    }
    const decryptedBuffer = base64ToBuffer(decryptedBase64);
    fs.writeFileSync(outputFile, decryptedBuffer);

    console.log(`✅ 解密成功：${outputFile}`);
    console.log(`📊 文件大小: ${decryptedBuffer.length} 字节`);

  } catch (error) {
    console.error("❌ 处理过程中出错:", error.message);
    process.exit(1);
  }
}

// 如果直接运行此脚本
if (require.main === module) {
  main();
}
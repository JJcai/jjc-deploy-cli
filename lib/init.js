#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { infoLog, successLog ,errorLog} = require('../utils/index');
const deployPath = path.join(process.cwd(), './deploy');
const deployConfigPath = `${deployPath}/deploy.config.js`;

// 检查部署目录及部署配置文件是否存在
const checkDeployExists = () => {
    if (fs.existsSync(deployPath) && fs.existsSync(deployConfigPath)) {
        infoLog('deploy目录下的deploy.config.js配置文件已经存在，请勿重新下载');
        process.exit(1);
        return;
    }
    downloadAndGenerate();
};

// 下载部署脚本配置
const downloadAndGenerate = () => {
    // 源文件路径
    const sourcePath = path.join(__dirname, 'deploy.config.js');
    // 复制文件
    fs.mkdir(deployPath,(err)=>{
        if(err){
            console.error('创建文件夹时出错:', err);
            errorLog('创建文件夹时出错')
        }
    });
    fs.copyFile(sourcePath, deployConfigPath, (err) => {
        if (err) {
            console.error('复制文件时出错:', err);
            errorLog('复制文件时出错')
            return;
        }
        successLog('下载目标文件成功')
    });
    infoLog('请配置deploy目录下的deploy.config.js配置文件');
    process.exit(0);
};

module.exports = () => {
    checkDeployExists();
};

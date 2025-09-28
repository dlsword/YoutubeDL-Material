#!/usr/bin/env node

/**
 * fix-duration-simple.js
 * 简化版本：扫描MongoDB中files集合，修复duration字段
 */

const { MongoClient } = require('mongodb');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs-extra');

// 配置
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://mongo-db:27017/youtubedl-material';

async function fixDurations() {
    console.log('🚀 开始修复duration字段...\n');

    const client = new MongoClient(MONGODB_URI);

    try {
        await client.connect();
        console.log('✅ 连接MongoDB成功');

        const db = client.db('ytdl_material');
        const collection = db.collection('files');

        // 查找需要修复的文件
        const files = await collection.find({
            $or: [
                { duration: null },
                { duration: 0 },
                { duration: { $exists: false } }
            ]
        }).toArray();

        console.log(`📊 找到 ${files.length} 个需要修复的文件\n`);

        let updated = 0;
        let errors = 0;

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            console.log(`处理 ${i + 1}/${files.length}: ${file.title || file.uid}`);

            // 检查文件是否存在
            if (!fs.existsSync(file.path)) {
                console.log(`  ⚠️  文件不存在: ${file.path}`);
                continue;
            }

            // 使用FFmpeg获取时长
            const duration = await new Promise((resolve) => {
                ffmpeg.ffprobe(file.path, (err, metadata) => {
                    if (err) {
                        console.log(`  ❌ FFmpeg错误: ${err.message}`);
                        resolve(null);
                        return;
                    }

                    const dur = metadata.format.duration;
                    if (dur && !isNaN(dur)) {
                        resolve(parseFloat(dur));
                    } else {
                        resolve(null);
                    }
                });
            });

            if (duration && duration > 0) {
                // 更新数据库
                const result = await collection.updateOne(
                    { uid: file.uid },
                    { $set: { duration: duration } }
                );

                if (result.modifiedCount > 0) {
                    console.log(`  ✅ 更新成功: ${duration} 秒, file ${file.path}`);
                    updated++;
                } else {
                    console.log(`  ⚠️  更新失败`);
                    errors++;
                }
            } else {
                console.log(`  ⚠️  无法获取时长`);
                errors++;
            }
        }

        console.log(`\n🎉 完成！更新了 ${updated} 个文件，${errors} 个错误`);

    } catch (error) {
        console.error('❌ 错误:', error.message);
    } finally {
        await client.close();
    }
}

// 运行
if (require.main === module) {
    fixDurations();
}

module.exports = { fixDurations };
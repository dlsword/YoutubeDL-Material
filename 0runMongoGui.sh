#!/bin/bash



# 启动 Mongo Express - 连接到 mongo-db 容器
echo "✅ 启动 Mongo Express..."
echo "访问地址: http://localhost:18081"
echo "用户名: admin"
echo "密码: admin123"
echo "如果访问不了，需要更新ME_CONFIG_MONGODB_URL，和network"
echo "按 Ctrl+C 停止服务"

docker run -it --rm \
    --name mongo-express \
    -p 127.0.0.1:18081:8081 \
    --network youtubedl-material_default \
    -e ME_CONFIG_MONGODB_URL="mongodb://ytdl-mongo-db:27017" \
    -e ME_CONFIG_BASICAUTH_USERNAME=admin \
    -e ME_CONFIG_BASICAUTH_PASSWORD=admin123 \
    -e ME_CONFIG_OPTIONS_EDITORTHEME=ambiance \
    -e ME_CONFIG_MONGODB_ENABLE_ADMIN=true \
    mongo-express

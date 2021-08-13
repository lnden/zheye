#!/bin/bash

echo "build 生成生产环境代码"

url=$1

rm -rf dist && npm run build

echo "上传代码到云主机"

cd dist && scp -i ~/.ssh/id_rsa.pem -r * root@8.141.57.14:~/workspace/${url}
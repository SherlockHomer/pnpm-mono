#!/bin/bash

# 源目录和目标目录
source_directory="./"

# 查找并复制package.json文件
find "$source_directory" -type f -name "package.json" -exec sh -c '
    for file do
        relative_dir="${file%/*}"  # 这里使用%将删除最后一个/之后的部分
        # ./FE-apps/react-3d
        # 构建目标目录的完整路径
        target_dir="./$relative_dir"
        echo "$target_dir"
        # 确保目标目录存在，如果不存在则创建它
        mkdir -pv "$target_dir"
        
        # 使用rsync复制文件到目标目录
        cp -n "$file" "$target_dir/"
    done
' sh {} +

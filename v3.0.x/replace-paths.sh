#!/bin/bash

# ============================================
# 图片路径替换脚本
# ============================================

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 打印带颜色的消息
print_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

print_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

print_error() {
    echo -e "${RED}❌ $1${NC}"
}

# 检查是否安装了 Node.js
if ! command -v node &> /dev/null; then
    print_error "Node.js 未安装，请先安装 Node.js"
    exit 1
fi

print_info "Node.js 版本: $(node --version)"

# 检查环境变量
if [ -z "$S3_BASE_URL" ]; then
    print_error "请设置 S3_BASE_URL 环境变量"
    echo ""
    echo "示例："
    echo "  export S3_BASE_URL=https://your-bucket.s3.amazonaws.com"
    echo "  或"
    echo "  export S3_BASE_URL=https://your-cdn-domain.com"
    exit 1
fi

print_success "配置:"
echo "  Base URL: $S3_BASE_URL"
echo ""

# 询问是否先干运行
print_info "第一步: 干运行 (预览更改)"
echo ""

npm run replace:paths:dry

echo ""
print_warning "以上是干运行结果，不会实际修改文件"
echo ""
read -p "是否继续执行实际替换? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    print_info "已取消替换"
    exit 0
fi

# 执行实际替换
print_info "第二步: 执行实际替换"
echo ""

npm run replace:paths

echo ""
print_success "替换完成!"
echo ""
print_info "下一步:"
echo "  1. 使用 'git diff' 检查更改"
echo "  2. 访问 URL 验证图片是否可访问"
echo "  3. 如需回滚: git checkout -- site/en"


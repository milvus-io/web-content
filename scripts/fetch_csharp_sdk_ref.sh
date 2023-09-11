#!/bin/sh

VERSION=$1

git clone https://github.com/milvus-io/milvus-sdk-csharp.git
rm -rf API_Reference/milvus-sdk-csharp/$VERSION/*/
cp -r milvus-sdk-csharp/docs/api_reference/* API_Reference/milvus-sdk-csharp/$VERSION/
rm -rf milvus-sdk-csharp
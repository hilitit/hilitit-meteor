#!/bin/sh

PORT=8888
NODE_ENV="development"  MONGO_URL=mongodb://127.0.0.1:27017/tldr meteor run --port ${PORT} --settings settings.json

#!/bin/sh
#export VELOCITY_DEBUG_MIRROR=1
export DEBUG=1 
#export MOCHA_WEB_DEBUG=1 
export VELOCITY_DEBUG=1
export JASMINE_BROWSER=PhantomJS

export PORT=8888
export NODE_ENV="development" 
MONGO_URL=mongodb://127.0.0.1:27017/hilitit meteor run --port ${PORT} --settings settings.json

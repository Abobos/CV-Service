#!/usr/bin/env bash

docker build -t cv-service .

if [ $? -eq 0 ]; then
    docker run -dp 4000:4000 cv-service
 else
    echo "Oops..Docker build failed.😑"
  fi
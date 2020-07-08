#!/bin/bash
sudo docker build -t kpatel20538/bookmarks-app:puppeteer .
sudo docker push kpatel20538/bookmarks-app:puppeteer
kubectl delete deployment --namespace kpatel20538 puppeteer
kubectl delete service --namespace kpatel20538 puppeteer
kubectl apply -f ../kubernetes/puppeteer-service.yml 
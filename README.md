## First Command

docker build -t angular-volumes .

## Second Command

docker run -v ${PWD}:/usr/app/my-angular -p 9500:4200 -d angular-volumes

Run the application at http://localhost:9500/home 
Now every cange on your files will appear directly on the browser in port 9500

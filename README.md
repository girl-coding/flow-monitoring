##First command 
docker build -t my-angular-app .  


##Second Command

docker run -p 9000:4200 -d my-angular-app

You should be able to access your app at http://localhost:9000

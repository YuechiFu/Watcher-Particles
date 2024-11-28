

## *Watcher : Your "Eating Cat" is now online!*

### Story
A watcher is observing your cat.
When the cat appears, a 3D particle effect cat will be displayed on the screen.
It can be scaled using gesture recognition through the camera.

<img src="image.png" width="450" >
<img src="image-1.png"  width="450" >

## Get Started

### Step 1 : start a web project 

Nodejs v18+ 
```shell 
git clone https://github.com/YuechiFu/Watcher-Particles
npm install pnpm -g 
pnpm install 
```

- For Development Environment  
```shell
npm run dev 
```

- For Production Environment
```shell
npm run build 
npm run preview 
```

It will start a Websocket Server (http://your_ip_address:10887) for receiving "Watcher http notification" 

You can visit at 

    http://localhost:1089/ #Delopment mode
    http://localhost:1099/  #Production mode

Input your Websocket Server address (http://your_ip_address:10887)


<img src="image-2.png" width="450" >


### Step 2: Create a task for detecting your cat and pushing nofications using the Sensecap App

![alt text](image-3.png)
 A "cat" notification will be sent to your  websocket server (http://your_ip_address:10887) when a cat is detected
After a while, a 3D particle effect cat will appgit ear on the page.
You can zoom and rotate using the mouse.

### Step3: Gesture Control

Use your computer camera or a USB camera in conjunction with gestures to zoom in and out of the 3D model.

<img src="image-4.png" width="500" >



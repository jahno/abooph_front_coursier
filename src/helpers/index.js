import { toast  } from 'react-toastify';
import imageCompression from 'browser-image-compression';

const toastConfig = {
    autoClose: false
}

export function handleService (service, serviceValues, successCb, errorCb){
    service(serviceValues)
    .then( (response) => {
        if((parseInt(response.status) >= 200) && (parseInt(response.status) < 300)){
            response.json().then(function(response) {
                if(response.msg === 'token inconnu : :('){
                    localStorage.removeItem('state')
                    window.location="/login"
                    return;
                }
                if(successCb) successCb(response)
            })
        }else{
            if(errorCb){
                errorCb()
            }
            response.json().then(function(response) {
                let message = "Une erreur s'est produite, veuillez ressayer !";
        
                if(Array.isArray(response)){
                    message = response[0].message;
                }else if(response){
                    message = response.msg || response.message || response.error.message;
                }
                
                toast.error(message, toastConfig);
            })
        }
    })
    .catch(() => {
        if(errorCb){
            errorCb()
        }

        const message = "Une erreur s'est produite, veuillez ressayer !";
        toast.error(message, toastConfig)
    })
}

function createImage(image, successCb) {
    const reader = new FileReader();
    reader.onload = (e) => {
        successCb(e.target.result)
    }
    reader.readAsDataURL(image);
}

export function loadArticleImage(event, loadCb, successCb, errorCb) {       
    const image = event.target.files || event.dataTransfer.files;
    
    if(image.length !== 0 ){
        if(loadCb) loadCb();

        window.URL = window.URL || window.webkitURL;
        const img = new Image();
        
        img.onload = function(){
            // if(img.width !== IMG_WIDTH || img.height !== IMG_HEIGHT){
            if(false){
            
                // toast.error(`Les dimensions de l'image doivent être ${IMG_WIDTH} x ${IMG_HEIGHT}`, toastConfig)
                // if(errorCb) errorCb();
            }else{
                const options = {
                    maxSizeMB: 0.098,
                    // maxWidthOrHeight: 100,
                    useWebWorker: true
                }

                imageCompression(image[0], options)
                .then(function (compressedImage) {
                    return createImage(compressedImage, successCb)
                })
                .catch(function (error) {
                    console.log(error)
                    if(errorCb) errorCb();
                });
            }
        }
        img.src = window.URL.createObjectURL(image[0]);
    }else{
        if(errorCb) errorCb();
    }
}

// const IMG_WIDTH = 736;
// const IMG_HEIGHT = 1000;
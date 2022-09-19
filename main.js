let btnRecord = document.querySelector('#btnRecord');

let chunks = [];

btnRecord.addEventListener('click', async (e)=> {
    let stream = await navigator.mediaDevices.getDisplayMedia({video:true});

    const mime = MediaRecorder.isTypeSupported('video/webm; codecs=vp9') ? 'video/webm; codecs=vp9' : 'video/webm';

    let mediaRecorder = new MediaRecorder(stream, {mimeType: mime});

    

    mediaRecorder.addEventListener('dataavailable', (e)=> chunks.push(e.data));

    mediaRecorder.addEventListener('stop', (e) => {
        let blob = new Blob(chunks, {
            type:chunks[0].type
        });

        let videoPlayer = document.querySelector('#videoPlayer');
        videoPlayer.src = URL.createObjectURL(blob);
    });

    mediaRecorder.start();
});

let btnDownload = document.querySelector('#btnDownload');

btnDownload.addEventListener('click', (e)=> {
    // if(!!chunks || chunks.length === 0)
    //     return;

    let blob = new Blob(chunks, {
        type:chunks[0].type
    });

    let anchor = document.createElement('a');

    anchor.href = URL.createObjectURL(blob);
    anchor.download = 'video.webm';

    anchor.click();
});
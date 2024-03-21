// Points on the finger
const fingers = {
    thumb: [0, 1, 2, 3, 4],
    indexFinger: [0, 5, 6, 7, 8],
    middleFinger: [0, 9, 10, 11, 12],
    ringFinger: [0, 13, 14, 15, 16],
    pinky: [0, 17, 18, 19, 20],
  };


export const drawHand = (predictions, ctx)=>{
    //Check if we have Pridiction
    if(predictions.length > 0){
        //Loop through Pridiction
        predictions.forEach((pridiction) => {
            //Grab landmarks
            const landmarks = pridiction.landmarks

            //Loop through Fingers
            for(let j = 0; j < Object.keys(fingers).length; j++){
                let finger = Object.keys(fingers)[j];

                //Loop Through Pair of joints
                for(let k = 0; k<fingers[finger].length - 1; k++){
                    const firstJoint = fingers[finger][k]
                    const SecondJoint = fingers[finger][k+1]

                    //Draw Path
                    ctx.beginPath()
                    ctx.moveTo(
                        landmarks[firstJoint][0],
                        landmarks[firstJoint][1]
                    )
                    
                    ctx.lineTo(
                        landmarks[SecondJoint][0],
                        landmarks[SecondJoint][1]
                    )

                    ctx.strokeStyle = "plum"
                    ctx.lineWidth = 4
                    ctx.stroke()
                }

            }

            for(let i = 0; i<landmarks.length; i++){
                //Get x point
                const x = landmarks[i][0]
                //Get y point
                const y = landmarks[i][1]
                //Start Drawing
                ctx.beginPath()
                ctx.arc(x,y,5,0,3*Math.PI)
                //Set line color
                ctx.fillStyle = 'aqua'
                ctx.fill()
            }
        });
    }
}
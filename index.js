document.addEventListener('DOMContentLoaded', function () {
    const userInput = prompt("Enter your name, participant ID, and experiment number (separated by commas):");

    // Split the user input using commas as the delimiter
    const [userName, pid, exp_no] = userInput.split(",").map(item => item.trim());

    // Now userName, pid, and ex_no hold the respective values entered by the user
    //console.log(userName, pid, exp_no)


    if (!userName) {
        alert("Name cannot be empty. Please try again.");
        return;
    }

    let experimentRecords = [];
    const door1 = document.getElementById('door1');
    const door2 = document.getElementById('door2');
    const playButton = document.getElementById('play');
    const stopButton = document.getElementById('stop');

    
    const yay = new Audio('./assets/yey.mp3');
    const arrow = document.getElementById('arrow');
    
    let remainingTrials = 0;
    let src=0;
    let trialStartTime;
    let blockTrails = 0;
    let cue = 0;
    let gifts=['A','A1','A3','A4','B','B1','B2','B3','B4','B5','B6','C','C1','C2','C3','C4','D','D2','D3','D4','E','E1','E2','E3','E4']

    let randomArray = [];
    let boxProbability = 0;
    let cueProbability = 0;
    
    let leftDoorArray = [];
    let cueArray = [];
    let boxArr = [];
    let cueArr = [];
    
    // Function to generate an array with specified number of ones and zeroes
    function generateArrays(m, n, k, l) {
        // Function to generate an array with specified number of ones and zeroes
      

        function generateArray(o,p) {
            const array = Array(o).fill(1).concat(Array(p).fill(0));
            const arrayC = array.sort(() => Math.random() - 0.5); 
            return arrayC;
            
        }
    
        let tempArr = generateArray(m, n);
        leftDoorArray=[...leftDoorArray,...tempArr]
        let cueArr = generateArray(k,l);
        cueArray=[...cueArray,...cueArr]

    }
    
    // Usage example
    // First 30 trials with 50% probability
    // randomArray = randomArray.concat(Array.from({ length: 30 }, () => (Math.random() < 0.50 ? 1 : 0)));


    // First 30 trials with 80% box probability
    
        //30 trails with 75% Cue probability
        generateArrays(24,6,23,7);
        //console.log(leftDoorArray,cueArray);

        
    // 10 trials with 80% box probability
        //  10 trials with 80% Cue probability
        generateArrays(8,2,8,2);        

    // 10 trials with 20% box probability
        // 10 trials with 20% Cue probability
        generateArrays(2,8,2,8);
    
    // 10 trials with 80% box probability
        //  10 trials with 80% Cue probability
        generateArrays(8,2,8,2);        

    // 10 trials with 20% box probability
        // 10 trials with 20% Cue probability
        generateArrays(2,8,2,8);
    

    
    playButton.addEventListener('click', startGame);
    stopButton.addEventListener('click', stopGame);


    function stopGame() {

        leftDoorArray=[]
        alert('Experiment completed!');
            setTimeout(() => {
                downloadExcel(userName+"_"+pid+"_"+exp_no);
            }, 300);
    }
 
    
    function startGame() {
        // Initialize the trial start time and hide the play button
        trialStartTime = new Date().getTime();
        playButton.style.visibility = "hidden";
        //console.log(cueArray[blockTrails],leftDoorArray[blockTrails])
    
        // Function to set the arrow source based on experiment number and condition
        function setArrowSource(condition) {
            const images = condition === 1 
            ? ['./assets/images/leftarrow.png', './assets/images/rightarrow.png'] 
            : ['./assets/images/smileL.png', './assets/images/smileR.png'];
        
        arrow.src = cueArray[blockTrails] === leftDoorArray[blockTrails] ? images[0] : images[1];
        
        }
    
        // Check if the experiment involves shifting elements
        if (exp_no === '1b' || exp_no === '2b') {
            // Shift the first 40 elements after the last 30 elements
            cueArray = cueArray.slice(-40).concat(cueArray.slice(0, 30));
        }
        console.log(cueArray)
        console.log(leftDoorArray)

        // Determine the arrow source based on the experiment number
        setArrowSource(exp_no.startsWith('1') ? 1 : 2);

    
        // Add event listeners for door clicks
        door1.addEventListener('click', handleDoorClick);
        door2.addEventListener('click', handleDoorClick);
    
        // Reset cue at the beginning of each trial
        cue = 0;
    }
    

    function handleDoorClick(event) {
      
     
        if (blockTrails < leftDoorArray.length) {
            const reactionTime = new Date().getTime() - trialStartTime;
          
            const doorNumber = event.target.getAttribute('data-door-number');
            //console.log('Door ' + doorNumber + ' clicked!');

            event.target.src = './assets/images/GFN.gif';
            arrow.src = '';
            arrow.style.visibility = "hidden";
            door1.removeEventListener('click', handleDoorClick);
            door2.removeEventListener('click', handleDoorClick);
            
            let reward = 10;
            //console.log(cueArray[blockTrails+1],leftDoorArray[blockTrails+1])
            if((exp_no==="0" && blockTrails>10 && blockTrails<20) || exp_no=="1a" || exp_no=="1b")
                {
                setTimeout(() => {
                src  = cueArray[blockTrails] === leftDoorArray[blockTrails] ? './assets/images/leftarrow.png' : './assets/images/rightarrow.png';  
                arrow.src=src
            }, 2500);
               // console.log(src)
                }
            else if((exp_no==="0" && blockTrails>20) || exp_no=="2a" || exp_no=="2b")
                {       
                    setTimeout(() => {
                    src = cueArray[blockTrails] === leftDoorArray[blockTrails] ? './assets/images/smileL.png' : './assets/images/smileR.png'; 
                    arrow.src=src
                }, 2500);
                    //console.log(src)
                }
            
            if(doorNumber === "2")
                {
                    if(leftDoorArray[blockTrails] ===1)
                    {   reward=1
                        setTimeout(() => 
                        {
                        let randomGift = gifts[Math.floor(Math.random() * gifts.length)];           
                        event.target.src = './assets/images/' + randomGift + '.gif';
                        yay.play();
                        // This line will execute after the timeout
                        setTimeout(() => {event.target.src = './assets/images/GF.png'; }, 2500);
                       
                        arrow.style.visibility = "visible";
                        setTimeout(() => {
                            door1.addEventListener('click', handleDoorClick);
                            door2.addEventListener('click', handleDoorClick);
                                }, 2500);
                        trialStartTime = new Date().getTime();
                        }, 1200); 
                    }                
                    else
                    {
                        reward=0
                        setTimeout(() => 
                        {          
                        event.target.src = './assets/images/S.png';
    
                        // This line will execute after the timeout
                        setTimeout(() => 
                            {
                            event.target.src = './assets/images/GF.png';
                            }, 600);
                            arrow.style.visibility = "visible";
                        setTimeout(() => {
                            door1.addEventListener('click', handleDoorClick);
                            door2.addEventListener('click', handleDoorClick);
                        }, 2500);
                        trialStartTime = new Date().getTime();
                        }, 1000);
                    }
                }
    
                else{
                    if(leftDoorArray[blockTrails] ===0){
                        reward=1
                        setTimeout(() => {
                            let randomGift = gifts[Math.floor(Math.random() * gifts.length)];           
                            event.target.src = './assets/images/' + randomGift + '.gif';
                            yay.play();
                            // This line will execute after the timeout
                            setTimeout(() => {
                                event.target.src = './assets/images/GF.png';
                            }, 2500);
                        
                                arrow.style.visibility = "visible";
                            setTimeout(() => {
                                door1.addEventListener('click', handleDoorClick);
                                door2.addEventListener('click', handleDoorClick);
                            }, 2500);
                            
                            trialStartTime = new Date().getTime();
                        }, 1200); 
                    }                
                    else{
                        reward=0
                        setTimeout(() => {          
                            event.target.src = './assets/images/S.png';
    
                            // This line will execute after the timeout
                            setTimeout(() => {
                                event.target.src = './assets/images/GF.png';
                            }, 600);
                            arrow.style.visibility = "visible";
                            setTimeout(() => {
                                door1.addEventListener('click', handleDoorClick);
                                door2.addEventListener('click', handleDoorClick);
                            }, 2500);
                            trialStartTime = new Date().getTime();
                        }, 1000);
                    }
                }
            

            

            if( exp_no=="0" || exp_no=="1a" || exp_no=="2a")
            {
            if (blockTrails <= 29) {
                boxProbability = 0.8;
                cueProbability = 0.75;
                
            } 
            else if (blockTrails <= 39) {
                boxProbability = 0.8;
                cueProbability = 0.8;
             } 
            else if (blockTrails <= 49) {
                boxProbability = 0.2;
                cueProbability = 0.2;
             } 
            else if (blockTrails <= 59) {
                boxProbability = 0.8;
                cueProbability = 0.8;
             } 
            else if (blockTrails <= 69) {
                boxProbability = 0.2;
                cueProbability = 0.2;
             } 
            }
            else{
                 if (blockTrails <= 9) {
                    boxProbability = 0.8;
                    cueProbability = 0.8;
                 } 
                else if (blockTrails <= 19) {
                    boxProbability = 0.2;
                    cueProbability = 0.2;
                 } 
                else if (blockTrails <= 29) {
                    boxProbability = 0.8;
                    cueProbability = 0.8;
                 } 
                else if (blockTrails <= 39) {
                    boxProbability = 0.2;
                    cueProbability = 0.2;
                 }
                else if (blockTrails <= 69) {
                    boxProbability = 0.8;
                    cueProbability = 0.75;
                    
                } 

            }

            console.log("ChoosedBox:",doorNumber === "2"?"Left":"Right","CueShowed:",cueArray[blockTrails] === leftDoorArray[blockTrails] ? "Left":"Right","RewardBox:",leftDoorArray[blockTrails] ===1?"Left":"Right", " Rewards:", reward, boxProbability, cueProbability );
            experimentRecords.push({TrailNo:blockTrails+1,ChoosedBox:doorNumber === "2"?"Left":"Right",CueShowed:cueArray[blockTrails] === leftDoorArray[blockTrails] ? "Left":"Right", RewardBox:leftDoorArray[blockTrails] ===1?"Left":"Right",Rewards: reward, ReactionTime: reactionTime / 100, BoxProb: boxProbability, CueProb: cueProbability });
            
            blockTrails++;
   
        } 
        else {
            alert('Experiment completed!');
            setTimeout(() => {
                downloadExcel(userName+"_"+pid+"_"+exp_no);
            }, 300);
        }
    }

    function downloadExcel(userName) {
        const ws = XLSX.utils.json_to_sheet(experimentRecords);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Experiment Results');
        XLSX.writeFile(wb, `${userName}_experiment_results.xlsx`);
    }
});
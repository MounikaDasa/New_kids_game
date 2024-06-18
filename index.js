document.addEventListener('DOMContentLoaded', function () {
    const userInput = prompt("Enter your name, participant ID, and experiment number (separated by commas):");

    // Split the user input using commas as the delimiter
    const [userName, pid, exp_no] = userInput.split(",").map(item => item.trim());

    // Now userName, pid, and ex_no hold the respective values entered by the user
    console.log(userName, pid, exp_no)


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
    let trialStartTime;
    let blockTrails = 0;
    let cue = 0;
    let gifts=['A','A1','A3','A4','B','B1','B2','B3','B4','B5','B6','C','C1','C2','C3','C4','D','D2','D3','D4','E','E1','E2','E3','E4']

    let randomArray = [];
    let boxProbability = 0;
    let cueProbability = 0;
    
    let tempArray = [];
    let cueArray = [];
    let boxArr = [];
    let cueArr = [];
    
    // Function to generate an array with specified number of ones and zeroes
    function generateArrays(m, n, k, l) {
        // Function to generate an array with specified number of ones and zeroes
      

        function generateArray(n, m) {
            const array = Array(n).fill(1).concat(Array(m).fill(0));
            // Shuffle the array randomly
            for (let i = array.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [array[i], array[j]] = [array[j], array[i]];
            }
            
            
            
            return array;
        }
    
        // Function to calculate cue based on two arrays
        function calculateCue(arr1, arr2) {
            const temp = [];
            for (let i = 0; i < arr2.length; i++) {
                if (arr2[i] === 1) {
                    temp.push(arr1[i]);
                } else {
                    temp.push(arr1[i] === 0 ? 1 : 0);
                }
            }
            return temp;
        }
        const te = m + n;
        const n1 = Math.floor(te / 2);
        const n0 = te-n1;
           
        // Generate box array and temp array
        console.log(n1,n0)
        
        
        const boxArray1 = generateArray(n1,n0);
        tempArray=[...tempArray,...boxArray1]
        
       
        let tempArr = generateArray(k, l);
        let cueArr = calculateCue(boxArray1, tempArr);
        
        //console.log(boxArray1, cueArr)
        cueArray=[...cueArray,...cueArr]

        //return { boxArray1, cueArr };

    }
    
    // Usage example
    

    // First 30 trials with 50% probability
    // randomArray = randomArray.concat(Array.from({ length: 30 }, () => (Math.random() < 0.50 ? 1 : 0)));


    // First 60 trials with 80% box probability
    
        //30 trails with 75% Cue probability
        generateArrays(24,6,23,7);
        //console.log(tempArray,cueArray);

        //15 trails with 80% Cue probability
        generateArrays(12, 3, 12, 3);
        //console.log(tempArray,cueArray);
    

        //15 trials with 20% Cue probability
        generateArrays(12, 3, 3, 12);
        
    // 20 trials with 20% box probability

        //  15 trials with 80% Cue probability
        generateArrays(3, 12, 12, 3);
       
        // 5 trials with 20% Cue probability

        generateArrays(1, 4, 1, 4);
        

    // 20 trials with 80% box probability
        // 10 trials with 20% Cue probability
        generateArrays(8, 2, 2, 8);
        

        // 10 trials with 15% Cue probability
        generateArrays(8, 2, 1, 9);
        
    // 20 trials with 20% box probability
        // 20 trials 15% Cue probability
       generateArrays(16, 4, 4, 16);
       //console.log(tempArray,cueArray);
    
    
    playButton.addEventListener('click', startGame);
    stopButton.addEventListener('click', stopGame);


    function stopGame() {

        tempArray=[]
        alert('Experiment completed!');
            setTimeout(() => {
                downloadExcel(userName+"_"+pid+"_"+exp_no);
            }, 300);
    }
 
    
    function startGame() {
        // console.log('Game is starting...');
        trialStartTime = new Date().getTime();
        playButton.style.visibility = "hidden";
           
        if(exp_no==='1' || exp_no==='2'){
        
            if(exp_no==='1'){
                arrow.src = cueArray[blockTrails]===1 ? './assets/images/leftarrow.png' : './assets/images/rightarrow.png'; 
            }
            else{
                arrow.src = cueArray[blockTrails]===1 ? './assets/images/smileL.png' : './assets/images/smileR.png'; 

            }
    }
     
        door1.addEventListener('click', handleDoorClick);
        door2.addEventListener('click', handleDoorClick);
        // Reset cue at the beginning of each trial
        
        cue = 0;
    }

    function handleDoorClick(event) {


        
     
        if (blockTrails < tempArray.length) {
            const reactionTime = new Date().getTime() - trialStartTime;
          
            const doorNumber = event.target.getAttribute('data-door-number');
            //console.log('Door ' + doorNumber + ' clicked!');

            event.target.src = './assets/images/GFN.gif';
            arrow.src = '';
            arrow.style.visibility = "hidden";
            door1.removeEventListener('click', handleDoorClick);
            door2.removeEventListener('click', handleDoorClick);
            
            let reward = 10;
            
            if(doorNumber === "2"){
               
                if(tempArray[blockTrails] ===1){
                    reward=1
                    setTimeout(() => {
                        let randomGift = gifts[Math.floor(Math.random() * gifts.length)];           
                        event.target.src = './assets/images/' + randomGift + '.gif';
                        yay.play();
                        // This line will execute after the timeout
                        setTimeout(() => {
                            event.target.src = './assets/images/GF.png';
                        }, 2500);
                        if((exp_no==="0" && blockTrails>10 && blockTrails<20) || exp_no=="1"){
                        setTimeout(() => {
                            arrow.src = cueArray[blockTrails]===1 ? './assets/images/leftarrow.png' : './assets/images/rightarrow.png';  
                        }, 2500);
                        }
                        else if((exp_no==="0" && blockTrails>20) || exp_no=="2")
                        {
                            
                            setTimeout(() => {
                                arrow.src = cueArray[blockTrails+1]===1 ? './assets/images/smileL.png' : './assets/images/smileR.png'; 
                            }, 2500);

                        }
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
                        if((exp_no==="0" && blockTrails>10 && blockTrails<20) || exp_no=="1"){
                            setTimeout(() => {
                                arrow.src = cueArray[blockTrails]===1 ? './assets/images/leftarrow.png' : './assets/images/rightarrow.png';  
                            }, 2500);
                            }
                            else if((exp_no==="0" && blockTrails>20) || exp_no=="2")
                            {
                                setTimeout(() => {
                                    arrow.src = cueArray[blockTrails+1]===1 ? './assets/images/smileL.png' : './assets/images/smileR.png'; 
                                }, 2500);
    
                            }
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
                if(tempArray[blockTrails] ===0){
                    reward=1
                    setTimeout(() => {
                        let randomGift = gifts[Math.floor(Math.random() * gifts.length)];           
                        event.target.src = './assets/images/' + randomGift + '.gif';
                        yay.play();
                        // This line will execute after the timeout
                        setTimeout(() => {
                            event.target.src = './assets/images/GF.png';
                        }, 2500);
                        if((exp_no==="0" && blockTrails>10 && blockTrails<20) || exp_no=="1"){
                            setTimeout(() => {
                                arrow.src = cueArray[blockTrails]===1 ? './assets/images/leftarrow.png' : './assets/images/rightarrow.png';  
                            }, 2500);
                            }
                            else if((exp_no==="0" && blockTrails>20) || exp_no=="2")
                            {
                                setTimeout(() => {
                                    arrow.src = cueArray[blockTrails+1]===1 ? './assets/images/smileL.png' : './assets/images/smileR.png'; 
                                }, 2500);
    
                            }
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
                        }, 2500);
                        if((exp_no==="0" && blockTrails>10 && blockTrails<20) || exp_no=="1"){
                            setTimeout(() => {
                                arrow.src = cueArray[blockTrails]===1 ? './assets/images/leftarrow.png' : './assets/images/rightarrow.png';  
                            }, 2500);
                            }
                            else if((exp_no==="0" && blockTrails>20) || exp_no=="2")
                            {
                                setTimeout(() => {
                                    arrow.src = cueArray[blockTrails+1]===1 ? './assets/images/smileL.png' : './assets/images/smileR.png'; 
                                }, 2500);
    
                            }
                        arrow.style.visibility = "visible";
                        setTimeout(() => {
                            door1.addEventListener('click', handleDoorClick);
                            door2.addEventListener('click', handleDoorClick);
                        }, 2500);
                        trialStartTime = new Date().getTime();
                    }, 1000);
                }
            }
            if (blockTrails <= 59) {
                boxProbability = 0.8;
                if (blockTrails <= 29) {
                    cueProbability = 0.75;
                } else if (blockTrails > 29 && blockTrails <= 44) {
                    cueProbability = 0.8;
                } else {
                    cueProbability = 0.2;
                }
            } else if (blockTrails <= 79) {
                boxProbability = 0.2;
                if (blockTrails <= 74) {
                    cueProbability = 0.8;
                } else {
                    cueProbability = 0.2;
                }
            } else if (blockTrails <= 99) {
                boxProbability = 0.8;
                if (blockTrails <= 89) {
                    cueProbability = 0.2;
                } else {
                    cueProbability = 0.15;
                }
            } else if (blockTrails <= 119) {
                boxProbability = 0.2;
                cueProbability = 0.15;
            }
        

            

            console.log("ChoosedBox:",doorNumber === "2"?"Left":"Right","CueShowed:",cueArray[blockTrails],cueArray[blockTrails]===1?"Left":"Right","RewardBox:",tempArray[blockTrails] ===1?"Left":"Right", " Rewards:", reward, boxProbability, cueProbability );
            experimentRecords.push({TrailNo:blockTrails+1,ChoosedBox:doorNumber === "2"?"Left":"Right",CueShowed:cueArray[blockTrails]===1?"Left":"Right", RewardBox:tempArray[blockTrails] ===1?"Left":"Right",Rewards: reward, ReactionTime: reactionTime / 1000, BoxProb: boxProbability, CueProb: cueProbability });
            
            blockTrails++;
   
        } else {
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
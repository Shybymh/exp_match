let numberOfLeaves = 0;
            let level = 0;
            const theLeftSide = document.getElementById('leftSide'); 
            const theRightSide = document.getElementById('rightSide');
            let numTries = 0;

            function selectLevel() {
                
                level = Number(document.getElementById("level").value);
                
                if (level === 3 || level ===  5 || level === 8) {

                    numberOfLeaves = level;
                    generateLeaves();
                    document.getElementById("level").style.display = "none";
                    // document.getElementById("begin").style.display = "block";
                }
            }

            function generateLeaves() {

                for( i=0 ; i < numberOfLeaves ;i++ ) {
                    const leaves = ["images2/leaf0.png", "images2/leaf1.png", "images2/leaf3.png","images2/leaf5.png", "images2/leaf6.png", "images2/leaf7.png", "images2/leaf8.png",
                                    "images2/leaf11.png", "images2/leaf12.png"];
                    
                    let randomleafIdx = Math.floor(Math.random() * 8);
                    const leaf = document.createElement('img');
                    leaf.src = leaves[randomleafIdx];
                    
                    let randomTop = Math.floor(Math.random() * 300)  + 1;
                    let randomLeft = Math.floor(Math.random() * 400) + 1;
                    leaf.style.top = randomTop + 'px' ;
                    leaf.style.left = randomLeft + 'px' ;
                    
                    theLeftSide.appendChild(leaf);
                    console.log(randomTop, randomLeft);
                }
                
                const leftSideImages = theLeftSide.cloneNode(true);
                leftSideImages.removeChild(leftSideImages.lastChild);
                theRightSide.appendChild(leftSideImages);
                document.getElementById("gamemusic").play()
                theLeftSide.addEventListener('click', gameOver);
                theLeftSide.lastChild.addEventListener('click',nextLevel);
                numTries++ ; 
            }

            function nextLevel() {
                event.stopPropagation();
                
                while (theLeftSide.firstChild){
                    theLeftSide.removeChild(theLeftSide.firstChild);
                }
                while (theRightSide.firstChild){
                    theRightSide.removeChild(theRightSide.firstChild);
                }
                numberOfLeaves += level;
                generateLeaves();
            }

            function gameOver() {
                numTries -=1;
                let score = 0;

                document.getElementById("gamemusic").pause()
                document.getElementById("gameovermusic").play()

                let modal = document.getElementById("gameoverModal");
                let span = document.getElementsByClassName("close")[0];
                modal.style.display = "block";
                span.onclick = function() {
                modal.style.display = "none";
                }  

                if (numTries < 0) {
                    score = 0;
                }else{
                    score = numTries * 10
                }
                
                document.getElementById('score').innerText = score
                theLeftSide.lastChild.removeEventListener('click',nextLevel);
                while (theLeftSide.firstChild){
                    theLeftSide.removeChild(theLeftSide.firstChild);
                }
                while (theRightSide.firstChild){
                    theRightSide.removeChild(theRightSide.firstChild);
                }
                document.getElementById("startButton").style.display = "block";
                document.body.removeEventListener('click',gameOver);
            }

            function startGame() {
                numberOfLeaves = 0;
                numTries = 0;
                document.getElementById("startButton").style.display = "none";
                document.getElementById("level").style.display = "block";
                document.getElementById("level").options[0].selected = true;
                document.getElementById("gamemusic").load()
                generateLeaves();
            }
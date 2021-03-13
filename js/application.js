

let app = {
    init: function () {

        this.gameStarted = false;

        this.clickSound = document.createElement('audio');
        this.clickSound.setAttribute('src', 'sounds/sound.mp3');

        this.audio = document.createElement('audio');
        this.audio.setAttribute('src', 'sounds/splashS.mp3');

        this.bindEvents();
        this.score = scoreBox.innerText = scoreBox1.innerText = 0;
        this.chances = chancesBox.innerText = 5;

 
        this.baloonsInteval = []

    },
    gameOver:function(){
        
        this.audio.pause();
        this.baloonsInteval.forEach(function(item){
            clearInterval(item);
        });

        clearInterval(this.startKey);

        game_over_screen.classList.remove('hide');

        game_screen.classList.add('hide');

        splash_screen.classList.add('hide');


    },
    bindEvents: function () {

        startBTN.onclick = (evt) => {

            splash_screen.classList.add('hide');
            game_over_screen.classList.add('hide');
            // console.log("ma ithy wa")
            game_screen.classList.remove('hide');


            this.audio.play();
            this.gameStarted = true;
        }   

        this.startKey = setInterval(() => {
            if (this.gameStarted) {
                var baloon = document.createElement('img');
                baloon.setAttribute('src', 'images/baloon-' + (Math.floor(Math.random() * 3)) + '.png');
                baloon.setAttribute('class', 'baloon');
                baloon.style.top = '500px';
                baloon.style.left = Math.random() * appContainer.offsetWidth + 'px';

                baloon.onclick = () => {
                    baloon.remove();
                    clearInterval(movingInterval);
                    this.clickSound.currentTime = 0;
                    this.clickSound.play();
                    this.score += 10;
                    scoreBox.innerText = scoreBox1.innerText = this.score;
                }

                game_screen.appendChild(baloon);
                let movingInterval = setInterval( ()=> {

                    console.log(baloon.style.top);


                    let newTop = parseFloat(baloon.style.top) - 1;

                    if ((newTop + baloon.offsetHeight) < 0){
                        this.chances -= 1;
                        chancesBox.innerText = this.chances;
                        baloon.remove();
                        clearInterval(movingInterval);
                    }

                    if(this.chances == 0){
                        this.gameOver();
                    }


                    baloon.style.top = newTop + 'px';

                },10)
                // 10 + Math.random() * 30
                // 5 + Math.random() * 30
                this.baloonsInteval.push(movingInterval);
            }
        }, 2000+ Math.random() * 500);

    }
};


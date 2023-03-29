function getRandomValue(min,max) {
    return Math.floor(Math.random()*(max-min)) + min;
}

const app = Vue.createApp({
    data() {
        return{
            playerHealth: 100,
            opponentHealth: 100,
            currentRound: 0,
            winner: null,
            logMessage: []
        };
    },
    computed:{
        opponentBarStyles() {
            if (this.opponentHealth < 0) {
                return {width: '0%'};
            }
            return {width: this.opponentHealth + '%'};
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return {width: '0%'};
            }
            return {width: this.playerHealth + '%'};
        },
        mayUseSpecialAttack() {
            return this.currentRound % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value){
            if (value <= 0 && this.opponentHealth <= 0) {
                //draw
                this.winner ='draw';
            } else if (value <= 0) {
                //lost 
                this.winner = 'opponent';
            }
        },
        opponentHealth(value){
            if (value <= 0 && this.playerHealth <=0) {
                //draw
                this.winner = 'draw';
            } else if (value <=0) {
                //lost
                this.winner = 'player'
            }
        }
        
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.opponentHealth = 100;
            this.winner = null;
            this.currentRound = 0;
            this.logMessage = [];
        },
        attackOpponent(){
            this.currentRound++;
           const attackValue =getRandomValue(5,15);
           this.opponentHealth -= attackValue;
           this.addLogMessage('player','attack', attackValue);
           this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getRandomValue(10,20);
            this.playerHealth -= attackValue;
            this.addLogMessage('opponent','attack', attackValue);

        },
        specialAttackOpponent() {
            this.currentRound++;
            const attackValue = getRandomValue(15,30);
            this.opponentHealth -= attackValue;
            this.addLogMessage('player','attack', attackValue);
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;
            const healValue = getRandomValue(10,25);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else { 
            this.playerHealth += healValue; 
        }
        this.addLogMessage('player','heal', attackValue);

        this.attackPlayer();
    },
    surrender() {
        this.winner = 'opponent';
    },
    addLogMessage(who,what,value) {
        this.logMessage.unshift({
            actionBy: who,
            actionType: what,
            actionValue: value
        });
    }
},
});

app.mount('#game');
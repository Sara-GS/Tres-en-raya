(function Game() {
    
    let game = document.getElementById('game');
    let boxes = document.querySelectorAll('li');
    let resetGame = document.getElementById('reset-game');
    let turnDisplay = document.getElementById('whos-turn');
    let gameMessages = document.getElementById('game-messages');
    let playerOneScoreCard = document.getElementById('player-one-score');
    let playerTwoScoreCard = document.getElementById('player-two-score');
    
    
    let context = { 'player1' : 'x', 'player2' : 'o' };
    let board = [];
    
    let playerOneScore = 0;
    let playerTwoScore = 0;
    
    let turns;
    let currentContext;
    
   
    let init = function() {
        turns = 0;
        
        
        currentContext = computeContext();
        
        
        board[0] = new Array(3);
        board[1] = new Array(3);
        board[2] = new Array(3);
        
        
        for(let i = 0; i < boxes.length; i++) {
            boxes[i].addEventListener('click', clickHandler, false);
        }
        
        resetGame.addEventListener('click', resetGameHandler, false);
    }
    
    
    let computeContext = function() {
        return (turns % 2 == 0) ? context.player1 : context.player2;
    }
    
    
    let clickHandler = function() {
        this.removeEventListener('click', clickHandler);
        
        this.className = currentContext;
        this.innerHTML = currentContext;
        
        let pos = this.getAttribute('data-pos').split(',');
        board[pos[0]][pos[1]] = computeContext() == 'x' ? 1 : 0;
        
        if(checkStatus()) {
            gameWon();
        }
        
        turns++;
        currentContext = computeContext();
        turnDisplay.className = currentContext;
    }
    
    
    // Check to see if player has won
    let checkStatus = function() {
        let used_boxes = 0;
        
        for(let rows = 0; rows < board.length; rows++ ) {
            let row_total = 0;
            let column_total = 0;
            
            for(let columns = 0; columns < board[rows].length; columns++) {
                row_total += board[rows][columns];
                column_total += board[columns][rows];
                
                if(typeof board[rows][columns] !== "undefined") {
                    used_boxes++;
                }
            }
            
            // Winning combination for diagonal scenario [0,4,8], [2,4,6]
            let diagonal_tl_br = board[0][0] + board[1][1] + board[2][2]; 
            let diagonal_tr_bl = board[0][2] + board[1][1] + board[2][0]; 
            
            if(diagonal_tl_br == 0 || diagonal_tr_bl == 0 || diagonal_tl_br == 3 || diagonal_tr_bl == 3) {
                return true;
            }
            
            
            if(row_total == 0 || column_total == 0 || row_total == 3 || column_total == 3) {
                return true;
            }
            
            
            if(used_boxes == 9) {
                gameDraw();
            }
        }
    }
    let gameWon = function() {
        clearEvents();
        
        // show game won message
        gameMessages.className = 'player-' + computeContext() + '-win';
        
        // update the player score
        switch(computeContext()) {
            case 'x':
                playerOneScoreCard.innerHTML = ++playerOneScore;
                break;
            case 'o':
                playerTwoScoreCard.innerHTML = ++playerTwoScore;
        }
    }
    
    let gameDraw = function() {
        gameMessages.className = 'draw';
        clearEvents();
    }
    
    
    let clearEvents = function() {
        for(let i = 0; i < boxes.length; i++) {
            boxes[i].removeEventListener('click', clickHandler);
        }
    }
    
    let resetGameHandler = function() {
        clearEvents();
        init();
        
        
        for(let i = 0; i < boxes.length; i++) {
            boxes[i].className = '';
            boxes[i].innerHTML = '';
        }
        
        
        turnDisplay.className = currentContext;
        gameMessages.className = '';
    }
    
    game && init();
})();
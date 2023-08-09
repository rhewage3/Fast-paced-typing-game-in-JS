// importing all the words used in the game
const words = 'in one good real one not school set they state high life consider on and not come what also for set point can want as while with of order child about school thing never hold find order each too between program work end you home place around while place problem end begin interest while public or where see time those increase interest be give end think seem small as both another a child same eye you between way do who into again good fact than under very head become real possible some write know however late each that with because that place nation only for each change form consider we would interest with world so order or run more open that large write turn never over open each over change still old take hold need give by consider line only leave while what set up number part form want against great problem can because head so first this here would course become help year first end want both fact public long word down also long for without new turn against the because write seem line interest call not if line thing what work people way may old consider leave hold want life between most place may if go who need fact such program where which end off child down change to from people high during people find to however into small new general it do that could old for last get another hand much eye great no work and with but good there last think can around use like number never since world need what we around part show new come seem while some and since still small these you general which seem will place come order form how about just also they with state late use both early too lead general seem there point take general seem few out like might under if ask while such interest feel word right again how about system such between late want fact up problem stand new say move a lead small however large public out by eye here over so be way use like say people work for since interest so face order school good not most run problem group run she late other problem real form what just high no man do under would to each too end point give number child through so this large see get form also all those course to work during about he plan still so like down he look down where course at who plan way so since come against he all who at world because while so few last these mean take house who old way large no first too now off would in this course present order home public school back own little about he develop of do over help day house stand present another by few come that down last or use say take would each even govern play around back under some line think she even when from do real problem between long as there school do as mean to all on other good may from might call world thing life turn of he look last problem after get show want need thing old other during be again develop come from consider the now number say life interest to system only group world same state school one problem between for turn run at very against eye must go both still all a as so after play eye little be those should out after which these both much house become both school this he real and may mean time by real number other as feel at end ask plan come turn by all head increase he present increase use stand after see order lead than system here ask in of look point little too without each for both but right we come world much own set we right off long those stand go both but under now must real general then before with much those at no of we only back these person plan from run new as own take early just increase only look open follow get that on system the mean plan man over it possible if most late line would first without real hand say turn point small set at in system however to be home show new again come under because about show face child know person large program how over could thing from out world while nation stand part run have look what many system order some one program you great could write day do he any also where child late face eye run still again on by as call high the must by late little mean never another seem to leave because for day against public long number word about after much need open change also'.split(' ');
const wordsCount = words.length;

//creatign adding class and removing class name functions for name each caharacter with a class 
function addClass(el,name) {
    el.className += ' '+name;
  }

  function removeClass(el,name) {
    //replacing name with an empty string
    el.className = el.className.replace(name,'');
  }


//getting random words from the words list
function randomWord(){
    const randomIndex = Math.ceil(Math.random() * wordsCount);
    return words[randomIndex - 1];
}

function formatWord(word) {
    //splitting each word and each letter of the word into characters
    return `<div class="word"><span class="letter">${word.split('').join('</span><span class="letter">')}</span></div>`;
  }


//showing the words
function newGame(){
    document.getElementById('words').innerHTML = '';
    for (let i = 0; i < 200; i++) {
        document.getElementById('words').innerHTML += formatWord(randomWord());
    }
  addClass(document.querySelector('.word'), 'current');
  addClass(document.querySelector('.letter'), 'current');
}

//adding event listeners to keyboard pressing to check what letter is user pressing
document.getElementById('game').addEventListener('keyup', ev =>{
    // console.log(ev);
    //getting pressed key from the event listener
    const key = ev.key;
    const currentWord = document.querySelector('.word.current');

    const currentLetter = document.querySelector('.letter.current');
    //if there is no current letter then its going to be a space so the exoected going to be a ' '
    const expected = currentLetter?.innerHTML || ' ';

    // ..checking whether the typed button is a character not a space
    const isLetter = key.length === 1 && key !== ' ';
    //checking whteher the typed key is a space
    const isSpace = key === ' ';

    //consoling the xpected and the current selected key
    console.log({key,expected});


    //if the typed button is a letter
    if (isLetter){
        if(currentLetter){
            // alert(key == expected ? 'ok': 'wrong')
            addClass(currentLetter, key === expected ? 'correct' : ' incorrect');

            //moving the currentLetter class to the next letter
            removeClass(currentLetter,'current');
            if(currentLetter.nextSibling){
                addClass(currentLetter.nextSibling, 'current');
            }
            
        }else{
            //if we getting a letter but ther is no current letter
            const incorrectLetter = document.createElement('span');
            incorrectLetter.innerHTML = key;
            incorrectLetter.className = 'letter incorrect extrea';
            currentWord.appendChild(incorrectLetter);
        }
    }

    //if the typed button is a space
    if(isSpace){
        if(expected !== ' '){
            //creating array of characters that is not correct
            const letterToInvalidate = [...document.querySelectorAll('.word.current .letter:not(.correct)')];
            letterToInvalidate.forEach(letter => {
                //making the letter from the array incorrect
                addClass(letter, 'incorrect');
            });
        }
        //moving the current class to the nextword 
        removeClass(currentWord, 'current');
        addClass(currentWord.nextSibling, 'current');
        if (currentLetter) {
            //removing the current letter and
            removeClass(currentLetter, 'current');
          }
        //addding the current letter in the next word
        addClass(currentWord.nextSibling.firstChild, 'current');
    }


    //moving the cursor
    const nextLetter = document.querySelector('.letter.current');
    const nextWord = document.querySelector('.word.current');
    const cursor = document.getElementById('cursor');

    cursor.style.top = (nextLetter || nextWord).getBoundingClientRect().top + 'px';
    cursor.style.left = (nextLetter || nextWord).getBoundingClientRect()[nextLetter ? 'left' : 'right']  + 'px';



    // if(nextLetter){
    //     cursor.style.left = nextLetter.getBoundingClientRect().left  + 'px';
    // }else{
    //     cursor.style.left = nextWord.getBoundingClientRect().right  + 'px';
    // }
})



newGame();
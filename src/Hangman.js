import React, { useState } from "react";
import "./Hangman.css";
import { randomWord } from "./words";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";



const property = {
  maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
}




function Hangman (){
  const [state,setState] = useState({
    nWrong: 0,
     guessed: new Set(),
      answer: randomWord()
  });


function reset(){
  setState({
    nWrong:0,
    guessed: new Set(),
    answer: randomWord()
  })
}

  function guessedWord() {
    return state.answer.split("").map(ltr => (state.guessed.has(ltr) ? ltr : "_"));
  }

  function handleGuess(evt) {
    let ltr = evt.target.value;
   setState((prevValue) => ({
     ...prevValue,
      guessed: prevValue.guessed.add(ltr),
      nWrong: prevValue.nWrong + (prevValue.answer.includes(ltr) ? 0 : 1)
    }));
  }

  function generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
      key={ltr}
        value={ltr}
        onClick={handleGuess}
        disabled={state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

 
    return (
      <div className='Hangman'>
        

        <div class="logo"><b>H<span>an</span>gm<span>a</span>n</b></div>

        <img src={property.images[state.nWrong]} alt={` ${state.nWrong} / ${property.maxWrong} guesses`} />
        <p>Wrong guessed : {state.nWrong}</p>
        <p className='Hangman-word'>
        {state.nWrong < property.maxWrong ? guessedWord() : state.answer}
        </p>
        
        {guessedWord().join("") === state.answer ? <p>You Win!!</p> : <p className='Hangman-btns'>
          {state.nWrong < property.maxWrong ? generateButtons() : "You loose!!"}
        </p>}


        <button id="reset" onClick={reset}>Restart</button>
        </div>
    );
  

}

//---------------------------------------------------------------------------
// class Hangman extends Component {
//   /** by default, allow 6 guesses and use provided gallows images. */
//   static defaultProps = {
//     maxWrong: 6,
//     images: [img0, img1, img2, img3, img4, img5, img6]
//   };

//   constructor(props) {
//     super(props);
//     this.state = { nWrong: 0, guessed: new Set(), answer: "apple" };
//     this.handleGuess = this.handleGuess.bind(this);
//   }

//   /** guessedWord: show current-state of word:
//     if guessed letters are {a,p,e}, show "app_e" for "apple"
//   */
//   guessedWord() {
//     return this.state.answer
//       .split("")
//       .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
//   }

//   /** handleGuest: handle a guessed letter:
//     - add to guessed letters
//     - if not in answer, increase number-wrong guesses
//   */
//   handleGuess(evt) {
//     let ltr = evt.target.value;
//     this.setState(st => ({
//       guessed: st.guessed.add(ltr),
//       nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
//     }));
//   }

//   /** generateButtons: return array of letter buttons to render */
//   generateButtons() {
//     return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
//       <button
//         value={ltr}
//         onClick={this.handleGuess}
//         disabled={this.state.guessed.has(ltr)}
//       >
//         {ltr}
//       </button>
//     ));
//   }

//   /** render: render game */
//   render() {
//     return (
//       <div className='Hangman'>
//         <h1>Hangman</h1>
//         <img src={this.props.images[this.state.nWrong]} />
//         <p className='Hangman-word'>{this.guessedWord()}</p>
//         <p className='Hangman-btns'>{this.generateButtons()}</p>
//       </div>
//     );
//   }
// }

export default Hangman;

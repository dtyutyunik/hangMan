
const Letters = (props) => {
    const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

    return (
        <div className="letterContainer">
            {alphabet.map((letter) => {
                return<button className="letter" onClick={()=>props.chooseLetter(letter)} disabled={props.letterChosen} key={letter}>{letter}</button>
            })}
        </div>
    )
}

export default Letters;
import react, { useState } from 'react';
import { hangmanWords } from '../hangmanWords';

const Candidates = (props) => {

    const [hangmanWordChoices, setHangmanWordChoices] = useState(hangmanWords)


    const oneLessContender = (arr) => {
        // hangmanWords.
    }

    return (
        <div className="hangManContainer">
            {hangmanWordChoices.map((i) => {
                return <p className='hangMan'
                    style={{ backgroundColor: i.active ? i.color : 'black' }} key={i.language}>{i.language.toUpperCase()}</p>
            })}
        </div >
    )
}

export default Candidates;
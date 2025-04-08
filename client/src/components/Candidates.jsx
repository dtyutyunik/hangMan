import React from "react";

const Candidates = React.memo(({ hangmanWordChoices }) => {
    return (
        <div className="hangManContainer">
            {hangmanWordChoices.map((i, index) => {
                return <p style={i.active ? { backgroundColor: i.color } : {}} className={'hangMan'}
                    key={i.language}><span className={i.active ? undefined : 'hung'}>{i.active ? i.language.toUpperCase() : '💀'}</span></p>
            })}
        </div >
    )
});

export default Candidates;
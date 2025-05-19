import { languages } from "../js/language.js";
import { getFarewellText } from "../js/utils.js";
import { memo } from "react";

function StatusComponent(props) {
  const allStyles = {
    winning: {
      backgroundColor: "#10a95b",
      color: "#f9f4da",
      visibility: "visible",
    },
    losing: {
      backgroundColor: "#d62c2c",
      color: "#f9f4da",
      visibility: "visible",
    },
  };

  // add styles for farewells
  languages.forEach((_, i) => {
    allStyles[`farewell${i + 1}`] = {
      backgroundColor: languages[i].backgroundColor,
      color: languages[i].color,
      visibility: "visible",
      border: "1px dashed #301934",
      fontStyle: "italic"
    };
  });

  function applyStyles() {
    if (!props.isGameOver && props.isLastGuessWrong) {
      return allStyles[`farewell${props.wrongGuessCount}`]
    }

    if (props.isGameWon) {
      return allStyles.winning;
    } 

    if(props.isGameLost) {
      return allStyles.losing;
    }
  }

  function renderGameStatus() {
    if (!props.isGameOver && props.isLastGuessWrong) {
      return (
        <p>
          {
            getFarewellText(languages[props.wrongGuessCount - 1].name)
          }
        </p>
      );
    }

    if (props.isGameWon) {
      return (
        <>
          <h2>You win!</h2>
          <p>Well done! 🎉</p>
        </>
      );
    } 

    if (props.isGameLost) {
      return (
        <>
          <h2>Game over!</h2>
          <p>You lose! Better start learning Assembly 😭</p>
        </>
      );
    }
  }

  return (
    <section 
      className="status-container" 
      style={applyStyles()}
      role="status"
    >
      {renderGameStatus()}
    </section>
  );
}

export const Status = memo(StatusComponent);
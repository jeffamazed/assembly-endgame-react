export function SoundButton(props) {
  const styles = {
    backgroundColor: props.controlSound ? "#10a95b" : "#d62c2c"
  };

  return (
    <button 
      onClick={(e) => {
        e.stopPropagation(); // Prevent affecting game logic
        props.handleSoundControl(); // Toggle sound state
      }}
      className="sound-btn"
      style={styles}
      disabled={props.isGameOver}
    >
      <i className={`fas ${props.controlSound ? "fa-volume-up" : "fa-volume-mute"}`}></i>
    </button>
  );
}

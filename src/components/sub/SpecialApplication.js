import Winamp from '../apps/Winamp/Winamp';
import MineSweeper from '../apps/Minesweeper';

export default function SpecialApplication(props) {
  switch(props.details.type) {
    case 2:
      return <Winamp onClose={props.onClose} />
    case 3:
      return <MineSweeper />
    default:
      break;
  }
}
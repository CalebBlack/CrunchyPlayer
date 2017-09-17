# CrunchyPlayer
This video player was made with React.JS with the HTML5 video player to support better security and utilize css while imitating CrunchyRoll's flash player. All icons for the player are made using CSS.

Valid Props:
- autoplay
- width (integer)
- height (integer)

Example Usage:
```
import CrunchyPlayer from './crunchyplayer.js';

class App extends Component {
  render() {
    return (
      <div id="app">
        <CrunchyPlayer autoplay width="500" source="RAW_VIDEO_URL"/>
      </div>
    );
  }
}
```

# CrunchyPlayer
This video player was made with React.JS with the HTML5 video player to support better security and utilize css while imitating CrunchyRoll's flash player. All icons for the player are made using CSS.


[Preview Here](https://calebblack.github.io/CrunchyPlayer/)


Valid Props:
- autoplay
- doAutoplay (function with a URL return)
- autostart

Example Usage:
```
import CrunchyPlayer from './crunchyplayer.js';

class App extends Component {
  render() {
    return (
      <div id="app">
        <CrunchyPlayer className='test' doAutoplay={()=>{console.log('a');return 'NEXT_VIDEO_URL'}} autostart source="VIDEO_URL"/>
      </div>
    );
  }
}
```

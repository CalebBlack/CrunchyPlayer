import React from 'react';
import "./crunchyplayer.css";

class CrunchyPlayer extends React.Component {
  constructor(){
    super();
    this.props = {};
    this.renderControls = this.renderControls.bind(this);
    this.state = {playing: false,autoplay: false};
    this.play = this.play.bind(this);
    this.pause = this.pause.bind(this);
    this.onPlay = this.onPlay.bind(this);
    this.onPause = this.onPause.bind(this);
    this.onMetaData = this.onMetaData.bind(this);
    this.setPlayingState = this.setPlayingState.bind(this);
    this.onTimeUpdate = this.onTimeUpdate.bind(this);
    this.updateTimeStamp = this.updateTimeStamp.bind(this);
    this.updateLengthStamp = this.updateLengthStamp.bind(this);
    this.seek = this.seek.bind(this);
    this.toggle = this.toggle.bind(this);
    this.setAutoplay = this.setAutoplay.bind(this);
    this.toggleAutoplay = this.toggleAutoplay.bind(this);
    this.onFinish = this.onFinish.bind(this);
    this.loadVideo = this.loadVideo.bind(this);
  }
  play(){
    this.player.play();
  }
  pause(){
    this.player.pause();
  }
  setAutoplay(state){
    if (typeof state === 'boolean') {
      this.setState(Object.assign({},this.state,{autoplay:state}));
    }
  }
  toggleAutoplay(){
    this.setAutoplay(!this.state.autoplay);
  }
  toggle(){
    if (this.state && this.state.playing !== undefined) {
      if (this.state.playing === true) {
        this.pause();
      } else if (this.state.playing === false) {
        this.play();
      }
    }
  }
  onPlay(){
    this.setPlayingState(true);
  }
  onPause(){
    this.setPlayingState(false);
  }
  render(){
    return (
      <div id={this.props.id ? this.props.id : null} className={'crunchyplayer'+(this.props.className ? " "+this.props.className : "")}>
        <video autoPlay={this.props.autostart || false} onClick={this.toggle} ref={(ref)=>{this.player = ref}}>
          <source ref={(source)=>{this.source = source;}} src={this.props.source}/>
        </video>
        {this.renderControls()}
        <div className='controlsspacing'/>
      </div>
      );
  }
  renderControls(){
    return (
      <div className='controls'>
        <div className='playglow'>
        {!this.state.playing ?
          <div id='a' className='play' onClick={this.play}/> :
          <div id='b' className='pause' onClick={this.pause}/>}
        </div>
        <div className='progressbar' onClick={this.seek} ref={(progressbar)=>{this.progressbar = progressbar}}>
          <div className='timebar' ref={(timebar)=>{this.timebar = timebar}}/>
        </div>
        <p className='time'>
          <span ref={(timestamp)=>{this.timestamp = timestamp;}} className='timestamp'>--:--</span>
          /
          <span className='lengthstamp' ref={(lengthstamp)=>{this.lengthstamp = lengthstamp}}>--:--</span>
        </p>
        <div className='shadow'>
          <div onClick={this.toggleAutoplay} className={'autoplay'+(this.state.autoplay === true || this.props.autoplay === true ? ' active' : "")}>
            <div className='inner'/>
            <div className='square'/>
            <div className='square2'/>
            <div className='triangle'/>
          </div>
        </div>
      </div>
    );
  }
  seek(event){
    var position = (event.pageX - this.progressbar.offsetLeft - 10) / this.progressbar.offsetWidth;
    if (position < 0) {
      position = 0;
    }
    if (position > 1) {
      position = 1;
    }
    this.timebar.style.left = Math.round(position* 100) + '%';
    this.player.currentTime = this.length * position;
    this.updateTimeStamp();
  }
  onMetaData(){
    this.updateTimeStamp();
    this.updateLengthStamp();
    this.widthPerSecond = (this.progressbar.offsetWidth - 5)/this.length;
    //this.timebar.style.transition = 'left '+Math.ceil(this.length/(this.progressbar.offsetWidth - 5) * 10)/10+'s linear';
  }
  onFinish(){
    console.log(this.props,this.state);
    if ((this.state.autoplay === true || this.props.autoplay === true) && this.props.doAutoplay) {
      var url = this.props.doAutoplay();
      if (url && typeof url === 'string') {
        this.loadVideo(url);
      }
    }
  }
  loadVideo(url){
    console.log(url);
    if (url && typeof url === 'string' && this.source && this.source.attr("src") !== url && this.player) {
      this.source.setAttribute('src',url);
      this.player.load();
    }
  }
  updateTimeStamp(){
    this.time = this.player.currentTime;
    var formattedTime = getFormattedTime( Math.floor(this.time));
    if (this.timestamp && this.timestamp.innerHTML != formattedTime) {
      this.timestamp.innerHTML = formattedTime;
    }
  }
  updateLengthStamp(){
    this.length = this.player.duration;
    var formattedTime = getFormattedTime( Math.floor(this.length));
    if (this.lengthstamp && this.lengthstamp.innerHTML != formattedTime) {
      this.lengthstamp.innerHTML = formattedTime;
    }
  }
  onTimeUpdate(event){
    this.updateTimeStamp();
    if (this.progressbar && this.timebar && this.length && this.time) {
      this.timebar.style.left = Math.round(this.time/this.length* 100) + '%';
    }
  }
  componentDidMount(){
    this.player.addEventListener('playing',this.onPlay);
    this.player.addEventListener('pause',this.onPause);
    this.player.addEventListener('timeupdate',this.onTimeUpdate);
    this.player.addEventListener('loadedmetadata',this.onMetaData);
    this.player.addEventListener('ended',this.onFinish);
    this.length = this.player.duration;
  }
  setPlayingState(state){
    this.setState(Object.assign({},this.state,{playing:state}));
  }
}
function getFormattedTime(secondsIn) {
  var minutes = Math.floor(secondsIn / 60);
  var seconds = secondsIn % 60;
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  return minutes+":"+seconds;
}
export default CrunchyPlayer;

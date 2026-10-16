
const songs=['Peaches.mp3', 'A Cappella.mp3', 'Disillusioned.mp3', 'Emily_s Song.mp3', 'Flatline.mp3', 'GO BABY.mp3', 'Maria.mp3', 'OPEN UP.mp3', 'Roller Coaster.mp3', 'Take Me Away.mp3'].map(s=>'assets/audio/'+s);

const audio=document.getElementById('audio');
const play=document.getElementById('play');
const next=document.getElementById('next');
const prev=document.getElementById('prev');
const progress=document.getElementById('progress');
const volume=document.getElementById('volume');
const playlist=document.getElementById('playlist');
const now=document.getElementById('nowPlaying');
let i=0;
function load(n){
 i=n;
 audio.src=songs[i];
 now.textContent=songs[i].split('/').pop().replace('(MP3_160K)','');
 [...playlist.children].forEach((li,k)=>li.style.fontWeight=k===i?'bold':'normal');
}
songs.forEach((s,k)=>{let li=document.createElement('li');li.textContent=s.split('/').pop();li.onclick=()=>{load(k);audio.play();};playlist.appendChild(li);});
play.onclick=()=>audio.paused?audio.play():audio.pause();
audio.onplay=()=>play.textContent='⏸';
audio.onpause=()=>play.textContent='▶';
next.onclick=()=>{load((i+1)%songs.length);audio.play();};
prev.onclick=()=>{load((i-1+songs.length)%songs.length);audio.play();};
audio.onended=()=>next.click();
audio.ontimeupdate=()=>progress.value=(audio.currentTime/audio.duration||0)*100;
progress.oninput=()=>audio.currentTime=(progress.value/100)*audio.duration;
volume.oninput=()=>audio.volume=volume.value/100;
load(0);

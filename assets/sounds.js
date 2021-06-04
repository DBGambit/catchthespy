import SoundPlayer from 'react-native-sound-player';

export const clickS = () => SoundPlayer.playSoundFile('click', 'mp3')
export const showS = () => SoundPlayer.playSoundFile('show', 'mp3');
export const hideS = () => SoundPlayer.playSoundFile('hide', 'mp3');
export const endS = () => SoundPlayer.playSoundFile('dun_dun_dun', 'mp3');

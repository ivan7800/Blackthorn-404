/* Original pixel art atlases for Blackthorn. Sprite cells are laid out in a strict 3×3 grid. */
const PIXEL_ASSETS={
  protagonists:'assets/art/protagonists.png',
  bosses:'assets/art/bosses.png',
  enemies:'assets/art/enemy-families.png',
  ancient:'assets/art/eras-ancient.png',
  modern:'assets/art/eras-modern.png',
  final:'assets/art/eras-final.png',
  manor:'assets/art/scene_manor_detail.png',
};
export const HERO_BY_ERA={'2026':0,'1349':1,'1198 BCE':2,'395 CE':3,'1587':4,'1790':5,'1917':6,'1956':7,'1987':8};
export const BOSS_ART={'bell-boss':0,'salt-astronomer':1,'last-enumerator':2,'anatomist-shadow':3,'first-tenant':4,'company-without-faces':5,'dead-frequency':6,'man-missing-frame':7,'the-unremembered':8};
export const FAMILY_ART={'Hollow':0,'Pale Ones':1,'Witness':2,'Archivists':3,'Night Flesh':4,'Cultborn':5,'Ashborn':6,'Voidbound':8};
const SCENE_ART={
  '1349':['ancient',0],'1198 BCE':['ancient',1],'395 CE':['ancient',2],'1587':['ancient',3],
  '1790':['modern',0],'1917':['modern',1],'1956':['modern',2],'1987':['modern',3],
};
export class PixelArt{
  constructor(){this.images={};for(const [key,path] of Object.entries(PIXEL_ASSETS)){const im=new Image();im.src=path;this.images[key]=im;}}
  ready(key){const im=this.images[key];return im?.complete&&im.naturalWidth>0;}
  scene(c,room){
    let [key,cell]=SCENE_ART[room.era]||['manor',0];
    if(room.id?.startsWith('final-'))[key,cell]=['final',0];
    else if(room.boss)[key,cell]=['final',1];
    else if(room.decor==='library'||room.decor==='archive')[key,cell]=['final',2];
    else if(room.decor==='garden')[key,cell]=['final',3];
    if(!this.ready(key))return false;
    const im=this.images[key];
    if(key==='manor')c.drawImage(im,0,0,im.naturalWidth,im.naturalHeight,0,0,320,180);
    else c.drawImage(im,(cell%2)*im.naturalWidth/2,Math.floor(cell/2)*im.naturalHeight/2,im.naturalWidth/2,im.naturalHeight/2,0,0,320,180);
    return true;
  }
  sprite(c,key,cell,x,y,w,h,{flip=false,phase=0,flash=false,windup=false}={}){
    if(!this.ready(key))return false;
    const im=this.images[key],cw=im.naturalWidth/3,ch=im.naturalHeight/3;
    const originalX=x;c.save();
    // Pixel-locked bob and squash keep the authored silhouette intact.
    const bob=phase==='walk'?Math.round(Math.sin(performance.now()/85)*1):phase==='idle'?Math.round(Math.sin(performance.now()/390)):0;
    const lean=phase==='attack'?2:phase==='hurt'?-2:0;
    if(flip){c.translate(Math.round(x+w),0);c.scale(-1,1);x=0;}
    if(flash)c.filter='brightness(1.8)';
    c.drawImage(im,(cell%3)*cw,Math.floor(cell/3)*ch,cw,ch,Math.round(x+lean),Math.round(y+bob),Math.round(w),Math.round(h));
    c.restore();
    if(windup){c.strokeStyle='#ffae67';c.lineWidth=2;c.strokeRect(Math.round(originalX)-2,Math.round(y)-2,Math.round(w)+4,Math.round(h)+4);}
    return true;
  }
}

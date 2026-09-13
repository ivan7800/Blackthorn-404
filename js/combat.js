export const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
export const overlaps=(a,b)=>a.x<b.x+b.w&&a.x+a.w>b.x&&a.y<b.y+b.h&&a.y+a.h>b.y;
export function attackBox(player,reach=18){
  const p={x:player.x,y:player.y,w:player.w,h:player.h};
  if(player.facing==='left')return {x:p.x-reach,y:p.y-3,w:reach+4,h:p.h+6};
  if(player.facing==='right')return {x:p.x+p.w-4,y:p.y-3,w:reach+4,h:p.h+6};
  if(player.facing==='up')return {x:p.x-4,y:p.y-reach,w:p.w+8,h:reach+4};
  return {x:p.x-4,y:p.y+p.h-4,w:p.w+8,h:reach+4};
}
export function damageActor(actor,amount,knock={x:0,y:0}){actor.hp=Math.max(0,actor.hp-amount);actor.hitFlash=.14;actor.x+=knock.x||0;actor.y+=knock.y||0;return actor.hp<=0;}
export function phaseForBoss(hp,max){const r=hp/max;return r>.66?1:r>.33?2:3;}

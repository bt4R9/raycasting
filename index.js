var k=Object.defineProperty;var b=(l,t,e)=>t in l?k(l,t,{enumerable:!0,configurable:!0,writable:!0,value:e}):l[t]=e;var i=(l,t,e)=>(b(l,typeof t!="symbol"?t+"":t,e),e);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))n(r);new MutationObserver(r=>{for(const s of r)if(s.type==="childList")for(const o of s.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(r){const s={};return r.integrity&&(s.integrity=r.integrity),r.referrerpolicy&&(s.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?s.credentials="include":r.crossorigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function n(r){if(r.ep)return;r.ep=!0;const s=e(r);fetch(r.href,s)}})();class P{constructor(t){i(this,"context");i(this,"block_size");i(this,"main");this.context=t.context,this.block_size=6,this.main=t.main}get player(){return this.main.player}get ray_casting(){return this.main.ray_casting}get grid(){return this.main.map.grid}get offset_x(){return this.context.canvas.width-this.grid.length*this.block_size}draw(){const{context:t}=this;t.fillStyle="#fff",t.fillRect(0,0,t.canvas.width,t.canvas.height),this.render_map(),this.render_player(),this.render_rays()}render_player(){const{context:t,player:e,block_size:n,offset_x:r}=this,s=e.position.x*n,o=e.position.y*n,a=n*.25;t.fillStyle="#000",t.beginPath(),t.ellipse(r+s,o,a,a,0,0,Math.PI*2),t.fill()}render_rays(){const{context:t,player:e,block_size:n,ray_casting:r,offset_x:s}=this,o=e.position.x*n,a=e.position.y*n,c=1,h=t.canvas.height;let y=0;for(const{intersection:g,angle:p,dist:_}of r.cast()){t.strokeStyle="red",t.fillStyle="red",t.beginPath(),t.moveTo(s+o,a),t.lineTo(s+g.x*n,g.y*n),t.stroke(),t.beginPath(),t.ellipse(s+g.x*n,g.y*n,1,1,0,0,Math.PI*2),t.fill();const x=Math.cos(p-e.angle)*_,u=h/2-h/x,M=h-u,m=y*c;for(let f=0;f<h;f+=c)if(f<u)t.fillStyle="#424242",t.fillRect(m,f,c,c);else if(f>u&&f<=M){const v=Math.floor(255*(1-x/16));t.fillStyle=`rgb(0, 0, ${v})`,t.fillRect(m,f,c,c)}else t.fillStyle="#ababab",t.fillRect(m,f,c,c);y+=1}}render_map(){const{context:t,block_size:e,grid:n,offset_x:r}=this;t.fillStyle="#000";for(let s=0;s<n.length;s++){const o=s*e;for(let a=0;a<n[s].length;a++){const c=a*e;n[s][a]===1&&t.fillRect(r+c,o,e,e)}}}}class d{constructor(t,e){i(this,"y");i(this,"x");this.y=t,this.x=e}get length(){return Math.sqrt(this.y**2+this.x**2)}normalize(){const t=this.length;return this.y/=t,this.x/=t,this}distance(t){const e=this.x-t.x,n=this.y-t.y;return Math.sqrt(e**2+n**2)}floor(){return this.y=Math.floor(this.y),this.x=Math.floor(this.x),this}copy(){return new d(this.y,this.x)}add(t){return this.y+=t.y,this.x+=t.x,this}subtruct(t){return this.y-=t.y,this.x-=t.x,this}multiply(t){return this.y*=t.y,this.x*=t.x,this}}class I{constructor(t){i(this,"position");i(this,"angle");i(this,"direction");i(this,"map");i(this,"max_angle",Math.PI*2);i(this,"pressed_keys",new Map);i(this,"delta_rotation",.09);i(this,"delta_moving",.18);i(this,"on_key_down",t=>{this.pressed_keys.set(t.key,!0)});i(this,"on_key_up",t=>{this.pressed_keys.set(t.key,!1)});this.position=t.position,this.angle=t.angle,this.direction=this.calc_direction(),this.map=t.map,document.addEventListener("keydown",this.on_key_down),document.addEventListener("keyup",this.on_key_up)}calc_direction(){return new d(Math.sin(this.angle),Math.cos(this.angle)).normalize()}*near_blocks(){const{position:t,map:e}=this,n=Math.floor(t.x),r=Math.floor(t.y);for(let s=r-1;s<=r+1;s++)for(let o=n-1;o<=n+1;o++)o===n&&s===r||e.get(s,o)===1&&(yield{x:o,y:s})}update(){const t=this.pressed_keys,e=t.get("ArrowLeft"),n=t.get("ArrowRight"),r=t.get("ArrowUp"),s=t.get("ArrowDown");if(e||n){const o=e?-this.delta_rotation:this.delta_rotation;let a=this.angle+o;a<0&&(a=this.max_angle-.001),this.angle=a%this.max_angle,this.direction=this.calc_direction()}if(r||s){const o=this.direction,a=r?this.delta_moving:-this.delta_moving,c=this.position.x+o.x*a,h=this.position.y+o.y*a,y=Math.floor(c),g=Math.floor(h);let p=!0,_=!0;for(const{x:w,y:x}of this.near_blocks())y===w&&g===x&&(p=!1,_=!1);p&&(this.position.x+=o.x*a),_&&(this.position.y+=o.y*a)}}}const R=l=>l*Math.PI/180,z=l=>l*Math.PI/180,S=l=>l*180/Math.PI;class A{constructor(t){i(this,"origin");i(this,"direction");i(this,"angle");i(this,"delta_direction");i(this,"map");i(this,"W");i(this,"H");this.origin=t.origin,this.direction=t.direction,this.angle=t.angle,this.map=t.map,this.H=this.map.grid.length,this.W=this.map.grid[0].length;const e=this.direction.x,n=this.direction.y;this.delta_direction=new d(Math.sqrt(1+e*e/(n*n)),Math.sqrt(1+n*n/(e*e)))}cast(){const{origin:t,direction:e,delta_direction:n,map:r}=this,s=t.copy().floor(),o=new d(0,0),a=new d(0,0);e.x<0?(o.x=-1,a.x=(t.x-s.x)*n.x):(o.x=1,a.x=(s.x+1-t.x)*n.x),e.y<0?(o.y=-1,a.y=(t.y-s.y)*n.y):(o.y=1,a.y=(s.y+1-t.y)*n.y);let c=!1,h=!1;for(;!h;)a.x<a.y?(a.x+=n.x,s.x+=o.x,c=!1):(a.y+=n.y,s.y+=o.y,c=!0),r.get(s.y,s.x)>0&&(h=!0);const y=Math.abs(c?(s.y-t.y+(1-o.y)/2)/e.y:(s.x-t.x+(1-o.x)/2)/e.x);return{intersection:new d(t.y+e.y*y,t.x+e.x*y),origin:this.origin,direction:this.direction,angle:this.angle,dist:y}}}class L{constructor(t){i(this,"origin");i(this,"angle");i(this,"map");i(this,"dda");this.origin=t.origin,this.angle=t.angle,this.map=t.map,this.dda=new A({origin:this.origin,angle:this.angle,direction:new d(Math.sin(this.angle),Math.cos(this.angle)),map:this.map})}cast(){return this.dda.cast()}}class q{constructor(t){i(this,"fov");i(this,"rays");i(this,"map");i(this,"angle",0);i(this,"max_angle",360);this.fov=t.fov,this.map=t.map,this.rays=new Map;for(let e=0;e<this.max_angle;e+=.25)this.rays.set(e,new L({origin:t.origin,angle:z(e),map:this.map}))}*cast(){const{fov:t,angle:e,max_angle:n}=this,r=Math.floor(S(e))-Math.floor(t/2)+n,s=r+t;for(let o=r;o<=s;o+=.25)yield this.rays.get(o%360).cast()}}class E{constructor(t){i(this,"canvas");i(this,"context");i(this,"renderer");i(this,"player");i(this,"ray_casting");i(this,"map");i(this,"fps_interval");i(this,"fps_timestamp",-1);i(this,"frameId",-1);i(this,"tick",()=>{this.frameId=requestAnimationFrame(this.tick);const t=Date.now(),e=t-this.fps_timestamp;e<this.fps_interval||(this.fps_timestamp=t-e%this.fps_interval,this.player.update(),this.ray_casting.angle=this.player.angle,this.renderer.draw())});this.canvas=t.canvas,this.map=t.map,this.fps_interval=1e3/(t.fps??30);const e=this.canvas.getContext("2d");if(!e)throw Error("Can't create a 2d context.");this.context=e,this.renderer=new P({context:this.context,main:this}),this.player=new I({position:new d(30,4.5),angle:R(0),map:this.map}),this.ray_casting=new q({origin:this.player.position,fov:t.fov??60,map:this.map})}start(){this.tick()}stop(){cancelAnimationFrame(this.frameId)}}class H{constructor(t){i(this,"grid");i(this,"W");i(this,"H");this.grid=t.grid,this.H=this.grid.length,this.W=this.grid[0].length}get(t,e){return t>=0&&t<this.H&&e>=0&&e<this.W?this.grid[t][e]:-1}}const W=new H({grid:[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,1],[1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,1],[1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,1,1,1,1,0,0,0,0,0,1],[1,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,1,0,0,1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1],[1,0,0,1,1,1,1,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1],[1,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,0,0,0,0,0,0,0,0,1],[1,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,1,1,1,1,1,1,1,1,1,1],[1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,1,1],[1,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,1,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,1,0,0,0,0,0,1,0,0,0,0,1,1],[1,1,1,1,1,0,1,1,0,0,0,0,0,1,0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1],[1,0,0,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,1,0,0,0,0,1,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,1,1,1,1,1,1,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,1,0,1],[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]}),D=document.getElementById("canvas"),O=new E({canvas:D,map:W,fps:24,fov:72});O.start();

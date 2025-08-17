import{X as v,Z as d,aa as W,ca as z,m as _,p as A,q as P,r as T,v as y,w as L,x as N}from"./chunk-UIKS2EEY.mjs";import{c as h}from"./chunk-A3IIQ6X3.mjs";var q=/var\s*\(\s*(--[\w-]+)(?:\s*,\s*((?:[^)(]+|\((?:[^)(]+|\([^)(]*\))*\))*))?\s*\)/;function j(...e){let t=v.current()===v.canvas,i=typeof h>"u",o=Y(),[s,a]=T(()=>D(e.map(E)));_(()=>{if(!t)return;let r=document.body.querySelector("main > div");if(!r)return;let n=new MutationObserver(()=>{a(D(e.map(E)))});return n.observe(r,{attributes:!0,attributeFilter:["style"]}),()=>n.disconnect()},e);let l=A(()=>e.map(E),[e]);if(i)return e.map(r=>$(r));let c=[];for(let r=0;r<e.length;r++){let n=e[r];if(typeof n!="string"){c.push(n);continue}let f=l[r],p=s[f];f&&p?c.push(o?p.dark||p.light||n:p.light||n):c.push(n)}return c}function D(e){let t=v.current()===v.canvas,i={},o={},s={};if(t&&typeof document<"u"){let l=document.body.querySelector("main > div");if(l){let c=l.getAttribute("style");if(c){let r=O(c);o=r,s=r}}}else{let{light:l,dark:c}=H();o=O(l),s=O(c)}return new Set([...Object.keys(o),...Object.keys(s)]).forEach(l=>{i[l]={light:o[l]||"",dark:s[l]||""}}),i}function H(){let e="",t="";if(typeof document<"u"){let i=document.head.querySelectorAll("style[data-framer-css], style[data-framer-css-ssr], style[data-framer-css-ssr-minified]");for(let o of i){let s=o.sheet?.cssRules;if(!s)continue;let a=[];for(let l of s)if(l instanceof CSSStyleRule)a.push([l,!1]);else if(l instanceof CSSMediaRule&&l.conditionText==="(prefers-color-scheme: dark)")for(let c of l.cssRules)c instanceof CSSStyleRule&&a.push([c,!0]);for(let[l,c]of a){let r=l.cssText;if(!r.includes("--token-"))continue;let f=c?l.selectorText==="body":l.selectorText==='body[data-framer-theme="dark"]',p=!c&&l.selectorText==="body";if(!(!f&&!p)&&(f?t||(t=r.substring(r.indexOf("{")+1,r.lastIndexOf("}")).trim()):e||(e=r.substring(r.indexOf("{")+1,r.lastIndexOf("}")).trim()),t&&e))break}if(t&&e)break}}return{light:e,dark:t}}function Y(){let e=typeof h<"u"&&h.location.origin.endsWith("framercanvas.com"),[t,i]=T(()=>typeof h>"u"?!1:e&&typeof document<"u"?document.body.getAttribute("data-framer-theme")==="dark":h.matchMedia("(prefers-color-scheme: dark)").matches);return _(()=>{if(e){let o=new MutationObserver(s=>{s.forEach(a=>{if(a.attributeName==="data-framer-theme"){let l=document.body.getAttribute("data-framer-theme");i(l==="dark")}})});return o.observe(document.body,{attributes:!0,attributeFilter:["data-framer-theme"]}),()=>o.disconnect()}else{let o=h.matchMedia("(prefers-color-scheme: dark)"),s=a=>{i(a.matches)};return o.matches!==t&&i(o.matches),o.addListener(s),()=>o.removeListener(s)}},[e]),t}function E(e){if(!e||!e.startsWith("var("))return"";let t=q.exec(e);return t&&t[1]||""}function O(e){let t={};return e&&e.split(";").filter(Boolean).forEach(o=>{let[s,a]=o.split(":").map(l=>l.trim());s&&a&&(t[s]=a)}),t}function $(e){if(!e||!e.startsWith("var("))return e;let i=e.slice(4,-1).split(",");return i.length>1?i.slice(1).join(",").trim():""}function u(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}var w=class{constructor(t,i,o={},s,a=1,l=0){u(this,"canvas",void 0),u(this,"gl",void 0),u(this,"program",null),u(this,"uniformLocations",{}),u(this,"fragmentShader",void 0),u(this,"rafId",null),u(this,"lastFrameTime",0),u(this,"totalAnimationTime",0),u(this,"speed",1),u(this,"providedUniforms",void 0),u(this,"hasBeenDisposed",!1),u(this,"resolutionChanged",!0),u(this,"initWebGL",()=>{let r=Q(this.gl,K,this.fragmentShader);r&&(this.program=r,this.setupPositionAttribute(),this.setupUniforms())}),u(this,"setupPositionAttribute",()=>{let r=this.gl.getAttribLocation(this.program,"a_position"),n=this.gl.createBuffer();this.gl.bindBuffer(this.gl.ARRAY_BUFFER,n);let f=[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1];this.gl.bufferData(this.gl.ARRAY_BUFFER,new Float32Array(f),this.gl.STATIC_DRAW),this.gl.enableVertexAttribArray(r),this.gl.vertexAttribPointer(r,2,this.gl.FLOAT,!1,0,0)}),u(this,"setupUniforms",()=>{this.uniformLocations={u_time:this.gl.getUniformLocation(this.program,"u_time"),u_pixelRatio:this.gl.getUniformLocation(this.program,"u_pixelRatio"),u_resolution:this.gl.getUniformLocation(this.program,"u_resolution"),...Object.fromEntries(Object.keys(this.providedUniforms).map(r=>[r,this.gl.getUniformLocation(this.program,r)]))}}),u(this,"resizeObserver",null),u(this,"setupResizeObserver",()=>{this.resizeObserver=new ResizeObserver(()=>this.handleResize()),this.resizeObserver.observe(this.canvas),this.handleResize()}),u(this,"handleResize",()=>{let r=h.devicePixelRatio,n=this.canvas.clientWidth*r,f=this.canvas.clientHeight*r;(this.canvas.width!==n||this.canvas.height!==f)&&(this.canvas.width=n,this.canvas.height=f,this.resolutionChanged=!0,this.gl.viewport(0,0,this.gl.canvas.width,this.gl.canvas.height),this.render(performance.now()))}),u(this,"render",r=>{if(this.hasBeenDisposed)return;let n=r-this.lastFrameTime;this.lastFrameTime=r,this.speed!==0&&(this.totalAnimationTime+=n*this.speed),this.gl.clear(this.gl.COLOR_BUFFER_BIT),this.gl.useProgram(this.program),this.gl.uniform1f(this.uniformLocations.u_time,this.totalAnimationTime*.001),this.resolutionChanged&&(this.gl.uniform2f(this.uniformLocations.u_resolution,this.gl.canvas.width,this.gl.canvas.height),this.gl.uniform1f(this.uniformLocations.u_pixelRatio,h.devicePixelRatio),this.resolutionChanged=!1),this.gl.drawArrays(this.gl.TRIANGLES,0,6),this.speed!==0?this.requestRender():this.rafId=null}),u(this,"requestRender",()=>{this.rafId!==null&&cancelAnimationFrame(this.rafId),this.rafId=requestAnimationFrame(this.render)}),u(this,"updateProvidedUniforms",()=>{this.gl.useProgram(this.program),Object.entries(this.providedUniforms).forEach(([r,n])=>{let f=this.uniformLocations[r];if(f)if(Array.isArray(n))switch(n.length){case 2:this.gl.uniform2fv(f,n);break;case 3:this.gl.uniform3fv(f,n);break;case 4:this.gl.uniform4fv(f,n);break;default:n.length===9?this.gl.uniformMatrix3fv(f,!1,n):n.length===16?this.gl.uniformMatrix4fv(f,!1,n):console.warn(`Unsupported uniform array length: ${n.length}`)}else typeof n=="number"?this.gl.uniform1f(f,n):typeof n=="boolean"?this.gl.uniform1i(f,n?1:0):console.warn(`Unsupported uniform type for ${r}: ${typeof n}`)})}),u(this,"setSeed",r=>{let n=8.333333333333334;this.totalAnimationTime=r*n,this.lastFrameTime=performance.now(),this.render(performance.now())}),u(this,"setSpeed",(r=1)=>{this.speed=r,this.rafId===null&&r!==0&&(this.lastFrameTime=performance.now(),this.rafId=requestAnimationFrame(this.render)),this.rafId!==null&&r===0&&(cancelAnimationFrame(this.rafId),this.rafId=null)}),u(this,"setUniforms",r=>{this.providedUniforms={...this.providedUniforms,...r},this.updateProvidedUniforms(),this.render(performance.now())}),u(this,"dispose",()=>{this.hasBeenDisposed=!0,this.rafId!==null&&(cancelAnimationFrame(this.rafId),this.rafId=null),this.gl&&this.program&&(this.gl.deleteProgram(this.program),this.program=null,this.gl.bindBuffer(this.gl.ARRAY_BUFFER,null),this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER,null),this.gl.bindRenderbuffer(this.gl.RENDERBUFFER,null),this.gl.bindFramebuffer(this.gl.FRAMEBUFFER,null),this.gl.getError()),this.resizeObserver&&(this.resizeObserver.disconnect(),this.resizeObserver=null),this.uniformLocations={}}),this.canvas=t,this.fragmentShader=i,this.providedUniforms=o,this.totalAnimationTime=l;let c=t.getContext("webgl2",s);if(!c)throw new Error("WebGL not supported");this.gl=c,this.initWebGL(),this.setupResizeObserver(),this.setSpeed(a),this.canvas.setAttribute("data-paper-shaders","true")}},K=`#version 300 es
layout(location = 0) in vec4 a_position;

void main() {
  gl_Position = a_position;
}
`;function G(e,t,i){let o=e.createShader(t);return o?(e.shaderSource(o,i),e.compileShader(o),e.getShaderParameter(o,e.COMPILE_STATUS)?o:(console.error("An error occurred compiling the shaders: "+e.getShaderInfoLog(o)),e.deleteShader(o),null)):null}function Q(e,t,i){let o=G(e,e.VERTEX_SHADER,t),s=G(e,e.FRAGMENT_SHADER,i);if(!o||!s)return null;let a=e.createProgram();return a?(e.attachShader(a,o),e.attachShader(a,s),e.linkProgram(a),e.getProgramParameter(a,e.LINK_STATUS)?(e.detachShader(a,o),e.detachShader(a,s),e.deleteShader(o),e.deleteShader(s),a):(console.error("Unable to initialize the shader program: "+e.getProgramInfoLog(a)),e.deleteProgram(a),e.deleteShader(o),e.deleteShader(s),null)):null}var C={Checks:0,Stripes:1,Edge:2},U=`#version 300 es
precision highp float;

uniform float u_time;
uniform float u_pixelRatio;
uniform vec2 u_resolution;

uniform float u_scale;
uniform float u_rotation;
uniform vec4 u_color1;
uniform vec4 u_color2;
uniform vec4 u_color3;
uniform float u_proportion;
uniform float u_softness;
uniform float u_shape;
uniform float u_shapeScale;
uniform float u_distortion;
uniform float u_swirl;
uniform float u_swirlIterations;


out vec4 fragColor;

#define TWO_PI 6.28318530718
#define PI 3.14159265358979323846

vec2 rotate(vec2 uv, float th) {
  return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float random(vec2 st) {
  return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}
float noise(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = random(i);
  float b = random(i + vec2(1.0, 0.0));
  float c = random(i + vec2(0.0, 1.0));
  float d = random(i + vec2(1.0, 1.0));

  // Smoothstep for interpolation
  vec2 u = f * f * (3.0 - 2.0 * f);

  // Do the interpolation as two nested mix operations
  // If you try to do this in one big operation, there's enough precision loss to be off by 1px at cell boundaries
  float x1 = mix(a, b, u.x);
  float x2 = mix(c, d, u.x);
  return mix(x1, x2, u.y);

}

vec4 blend_colors(vec4 c1, vec4 c2, vec4 c3, float mixer, float edgesWidth, float edge_blur) {
    vec3 color1 = c1.rgb * c1.a;
    vec3 color2 = c2.rgb * c2.a;
    vec3 color3 = c3.rgb * c3.a;

    float r1 = smoothstep(.0 + .35 * edgesWidth, .7 - .35 * edgesWidth + .5 * edge_blur, mixer);
    float r2 = smoothstep(.3 + .35 * edgesWidth, 1. - .35 * edgesWidth + edge_blur, mixer);

    vec3 blended_color_2 = mix(color1, color2, r1);
    float blended_opacity_2 = mix(c1.a, c2.a, r1);

    vec3 c = mix(blended_color_2, color3, r2);
    float o = mix(blended_opacity_2, c3.a, r2);
    return vec4(c, o);
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_resolution.xy;
    vec2 uv_original = uv;

    float t = .5 * u_time;

    float noise_scale = .0005 + .006 * u_scale;

    uv -= .5;
    uv *= (noise_scale * u_resolution);
    uv = rotate(uv, u_rotation * .5 * PI);
    uv /= u_pixelRatio;
    uv += .5;

    float n1 = noise(uv * 1. + t);
    float n2 = noise(uv * 2. - t);
    float angle = n1 * TWO_PI;
    uv.x += 4. * u_distortion * n2 * cos(angle);
    uv.y += 4. * u_distortion * n2 * sin(angle);

    float iterations_number = ceil(clamp(u_swirlIterations, 1., 30.));
    for (float i = 1.; i <= iterations_number; i++) {
        uv.x += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1.5 * uv.y);
        uv.y += clamp(u_swirl, 0., 2.) / i * cos(t + i * 1. * uv.x);
    }

    float proportion = clamp(u_proportion, 0., 1.);

    float shape = 0.;
    float mixer = 0.;
    if (u_shape < .5) {
      vec2 checks_shape_uv = uv * (.5 + 3.5 * u_shapeScale);
      shape = .5 + .5 * sin(checks_shape_uv.x) * cos(checks_shape_uv.y);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else if (u_shape < 1.5) {
      vec2 stripes_shape_uv = uv * (.25 + 3. * u_shapeScale);
      float f = fract(stripes_shape_uv.y);
      shape = smoothstep(.0, .55, f) * smoothstep(1., .45, f);
      mixer = shape + .48 * sign(proportion - .5) * pow(abs(proportion - .5), .5);
    } else {
      float sh = 1. - uv.y;
      sh -= .5;
      sh /= (noise_scale * u_resolution.y);
      sh += .5;
      float shape_scaling = .2 * (1. - u_shapeScale);
      shape = smoothstep(.45 - shape_scaling, .55 + shape_scaling, sh + .3 * (proportion - .5));
      mixer = shape;
    }

    vec4 color_mix = blend_colors(u_color1, u_color2, u_color3, mixer, 1. - clamp(u_softness, 0., 1.), .01 + .01 * u_scale);

    fragColor = vec4(color_mix.rgb, color_mix.a);
}
`;function b(e,t=[0,0,0,1]){if(Array.isArray(e))return e.length===4?e:e.length===3?[...e,1]:b(t);if(typeof e!="string")return b(t);let i,o,s,a=1;if(e.startsWith("#"))[i,o,s,a]=X(e);else if(e.startsWith("rgb"))[i,o,s,a]=J(e);else if(e.startsWith("hsl"))[i,o,s,a]=ee(Z(e));else return console.error("Unsupported color format",e),b(t);return[V(i,0,1),V(o,0,1),V(s,0,1),V(a,0,1)]}function X(e){e=e.replace(/^#/,""),e.length===3&&(e=e.split("").map(a=>a+a).join("")),e.length===6&&(e=e+"ff");let t=parseInt(e.slice(0,2),16)/255,i=parseInt(e.slice(2,4),16)/255,o=parseInt(e.slice(4,6),16)/255,s=parseInt(e.slice(6,8),16)/255;return[t,i,o,s]}function J(e){let t=e.match(/^rgba?\s*\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*([0-9.]+))?\s*\)$/i);return t?[parseInt(t[1]??"0")/255,parseInt(t[2]??"0")/255,parseInt(t[3]??"0")/255,t[4]===void 0?1:parseFloat(t[4])]:[0,0,0,1]}function Z(e){let t=e.match(/^hsla?\s*\(\s*(\d+)\s*,\s*(\d+)%\s*,\s*(\d+)%\s*(?:,\s*([0-9.]+))?\s*\)$/i);return t?[parseInt(t[1]??"0"),parseInt(t[2]??"0"),parseInt(t[3]??"0"),t[4]===void 0?1:parseFloat(t[4])]:[0,0,0,1]}function ee(e){let[t,i,o,s]=e,a=t/360,l=i/100,c=o/100,r,n,f;if(i===0)r=n=f=c;else{let p=(x,k,g)=>(g<0&&(g+=1),g>1&&(g-=1),g<.16666666666666666?x+(k-x)*6*g:g<.5?k:g<.6666666666666666?x+(k-x)*(.6666666666666666-g)*6:x),I=c<.5?c*(1+l):c+l-c*l,M=2*c-I;r=p(M,I,a+1/3),n=p(M,I,a),f=p(M,I,a-1/3)}return[r,n,f,s]}var V=(e,t,i)=>Math.min(Math.max(e,t),i);var te=N(.65,0,.88,.77),R={Prism:{color1:"#050505",color2:"#66B3FF",color3:"#FFFFFF",rotation:-50,proportion:1,scale:.01,speed:30,distortion:0,swirl:50,swirlIterations:16,softness:47,offset:-299,shape:"Checks",shapeSize:45},Lava:{color1:"#FF9F21",color2:"#FF0303",color3:"#000000",rotation:114,proportion:100,scale:.52,speed:30,distortion:7,swirl:18,swirlIterations:20,softness:100,offset:717,shape:"Edge",shapeSize:12},Plasma:{color1:"#B566FF",color2:"#000000",color3:"#000000",rotation:0,proportion:63,scale:.75,speed:30,distortion:5,swirl:61,swirlIterations:5,softness:100,offset:-168,shape:"Checks",shapeSize:28},Pulse:{color1:"#66FF85",color2:"#000000",color3:"#000000",rotation:-167,proportion:92,scale:0,speed:20,distortion:54,swirl:75,swirlIterations:3,softness:28,offset:-813,shape:"Checks",shapeSize:79},Vortex:{color1:"#000000",color2:"#FFFFFF",color3:"#000000",rotation:50,proportion:41,scale:.4,speed:20,distortion:0,swirl:100,swirlIterations:3,softness:5,offset:-744,shape:"Stripes",shapeSize:80},Mist:{color1:"#050505",color2:"#FF66B8",color3:"#050505",rotation:0,proportion:33,scale:.48,speed:39,distortion:4,swirl:65,swirlIterations:5,softness:100,offset:-235,shape:"Edge",shapeSize:48}};function B(e){let t=z(),i=v.current()===v.canvas,o=e.preset==="custom"||e.colorMode==="custom",s=e.preset==="custom"?e:R[e.preset]||Object.values(R)[0],[a,l,c]=j(e.color1,e.color2,e.color3);return L("div",{style:{borderRadius:e.radius,overflow:"hidden",position:"relative",...e.style},children:[y(re,{color1:o?a:s.color1,color2:o?l:s.color2,color3:o?c:s.color3,scale:s.scale,proportion:s.proportion/100,distortion:s.distortion/50,swirl:s.swirl/100,swirlIterations:s.swirl===0?0:s.swirlIterations,rotation:s.rotation*Math.PI/180,speed:!t||i&&e.preview?te(e.speed/100)*5:0,seed:s.offset*10,shape:C[s.shape],shapeScale:s.shapeSize/100,softness:s.softness/100,style:e.style}),e.noise&&e.noise.opacity>0&&y("div",{style:{position:"absolute",inset:0,backgroundImage:'url("https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png")',backgroundSize:e.noise.scale*200,backgroundRepeat:"repeat",opacity:e.noise.opacity/2}})]})}B.displayName="Animated Gradient Background";W(B,{preset:{type:d.Enum,defaultValue:Object.keys(R)[0],options:[...Object.keys(R),"custom"],optionTitles:[...Object.keys(R),"Custom"]},preview:{type:d.Boolean,defaultValue:!1},colorMode:{type:d.Enum,defaultValue:"preset",options:["preset","custom"],optionTitles:["Preset","Custom"],displaySegmentedControl:!0,title:"Colors",hidden:e=>e.preset==="custom"},color1:{type:d.Color,defaultValue:"#262626",hidden:e=>e.preset!=="custom"&&e.colorMode==="preset"},color2:{type:d.Color,defaultValue:"#75c1f0",hidden:e=>e.preset!=="custom"&&e.colorMode==="preset"},color3:{type:d.Color,defaultValue:"#ffffff",hidden:e=>e.preset!=="custom"&&e.colorMode==="preset"},noise:{type:d.Object,optional:!0,icon:"effect",controls:{opacity:{type:d.Number,defaultValue:.5,min:0,max:1,step:.01},scale:{type:d.Number,defaultValue:1,min:.2,max:2,step:.1}}},rotation:{type:d.Number,defaultValue:0,min:-360,max:360,step:1,unit:"\xB0",hidden:e=>e.preset!=="custom"},proportion:{type:d.Number,defaultValue:35,min:0,max:100,step:1,hidden:e=>e.preset!=="custom"},scale:{type:d.Number,defaultValue:1,min:0,max:10,step:.01,hidden:e=>e.preset!=="custom"},speed:{type:d.Number,defaultValue:25,step:1,min:0,max:100},distortion:{type:d.Number,defaultValue:12,min:0,max:100,step:1,hidden:e=>e.preset!=="custom"},swirl:{type:d.Number,defaultValue:80,min:0,max:100,step:1,hidden:e=>e.preset!=="custom"},swirlIterations:{type:d.Number,defaultValue:10,min:0,max:20,step:1,title:"Iterations",hidden:e=>e.swirl===0||e.preset!=="custom"},softness:{type:d.Number,defaultValue:100,min:0,max:100,step:1,hidden:e=>e.preset!=="custom"},offset:{type:d.Number,defaultValue:0,min:-1e3,max:1e3,step:1,hidden:e=>e.preset!=="custom"},shape:{type:d.Enum,defaultValue:"Checks",options:Object.keys(C),hidden:e=>e.preset!=="custom"},shapeSize:{type:d.Number,defaultValue:10,min:0,max:100,step:1,hidden:e=>e.preset!=="custom"},radius:{type:d.BorderRadius,defaultValue:"0px"}});var m={name:"Default",params:{scale:1,rotation:0,speed:20,seed:0,color1:"hsla(0, 0%, 15%, 1)",color2:"hsla(203, 80%, 70%, 1)",color3:"hsla(0, 0%, 100%, 1)",proportion:.35,softness:1,distortion:.25,swirl:.8,swirlIterations:10,shapeScale:.1,shape:C.Checks}},re=e=>{let t=A(()=>({u_scale:e.scale??m.params.scale,u_rotation:e.rotation??m.params.rotation,u_color1:b(e.color1,m.params.color1),u_color2:b(e.color2,m.params.color2),u_color3:b(e.color3,m.params.color2),u_proportion:e.proportion??m.params.proportion,u_softness:e.softness??m.params.softness,u_distortion:e.distortion??m.params.distortion,u_swirl:e.swirl??m.params.swirl,u_swirlIterations:e.swirlIterations??m.params.swirlIterations,u_shapeScale:e.shapeScale??m.params.shapeScale,u_shape:e.shape??m.params.shape}),[e.scale,e.rotation,e.color1,e.color2,e.color3,e.proportion,e.softness,e.distortion,e.swirl,e.swirlIterations,e.shapeScale,e.shape]);return y(se,{...e,fragmentShader:U,uniforms:t})},se=({ref:e,fragmentShader:t,style:i,uniforms:o={},webGlContextAttributes:s,speed:a=1,seed:l=0})=>{let c=e??P(null),r=P(null);return _(()=>(c.current&&(r.current=new w(c.current,t,o,s,a,l)),()=>{r.current?.dispose()}),[t,s]),_(()=>{r.current?.setUniforms(o)},[o]),_(()=>{r.current?.setSpeed(a)},[a]),_(()=>{r.current?.setSeed(l)},[l]),y("canvas",{ref:c,style:i})};export{B as a};
//# sourceMappingURL=chunk-ELZTLN7Y.mjs.map

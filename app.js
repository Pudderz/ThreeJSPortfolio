



let speed = 0;
let position = 0;
let rounded= 0;
let block = document.getElementById('block');
let elems= [...document.querySelectorAll('.n')];
let wrapper = document.querySelector('.wrap')
window.addEventListener('wheel', e=>{

    speed+=e.deltaY*0.0003;

})

let objs = Array(5).fill({dist:0})
const raf=()=>{

    position+=speed;
     speed*=0.8;
     rounded=Math.round(position);
    objs.forEach((o,i)=>{
        o.dist= Math.min(Math.abs(position-i),1)
        o.dist= 1- o.dist**2;
        // elems[i].style.transform = `scale(${1+0.4*o.dist})`
        elems[i].style.transform = `scale(${1+0.4*o.dist})`
    })
    let diff = rounded - position;
    position += Math.sign(diff)*Math.pow(Math.abs(diff),0.7)*0.05;
    // console.log(position)
    // block.style.transform =`translate(0,${position*100}px)`
    wrapper.style.transform=`translate(0,${-position*100+50}px)`
    window.requestAnimationFrame(raf)
}


raf();
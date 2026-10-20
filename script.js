// Chỉnh tên người nhận/người gửi và lời chúc ngay tại đây.
const RECIPIENT = "Thúy";
const SENDER = "Lâm";

const wishes = [
 {title:"Tulip hồng — Niềm vui",name:"Tulip hồng",type:"flower-tulip",text:"Chúc Thúy mỗi ngày đều có ít nhất một điều nhỏ xíu khiến Thúy mỉm cười. Mong những chuyện dễ thương cứ tìm đến Thúy, kể cả vào những ngày bình thường nhất nhé. 🌷"},
 {title:"Hướng dương — Tỏa sáng",name:"Hướng dương",type:"flower-sun",text:"Mong Thúy luôn tin vào bản thân, cứ tự tin làm điều mình thích và tỏa sáng theo cách riêng của Thúy. Thúy không cần phải giống bất kỳ ai để trở nên đặc biệt đâu. 🌻"},
 {title:"Cúc trắng — Bình an",name:"Cúc trắng",type:"flower-daisy",text:"Chúc Thúy có những ngày thật bình yên, ít lo nghĩ hơn một chút và luôn có thời gian dành cho bản thân. Nếu hôm nào mệt, nhớ nghỉ ngơi và dịu dàng với chính mình nha. 🤍"},
 {title:"Hoa hồng — Được yêu thương",name:"Hoa hồng",type:"flower-rose",text:"Mong Thúy luôn được mọi người đối xử bằng sự tử tế và chân thành. Mong Thúy nhận được thật nhiều yêu thương, không chỉ hôm nay mà cả những ngày chẳng có dịp gì đặc biệt nữa. 🌹"},
 {title:"Anh đào — Niềm vui nhỏ",name:"Anh đào",type:"flower-cherry",text:"Chúc Thúy gom góp được thật nhiều niềm vui bé xíu: một món ăn ngon, một bài hát hay, một buổi chiều đẹp trời hay một tin nhắn làm Thúy vui bất ngờ. 🌸"},
 {title:"Oải hương — Nghỉ ngơi",name:"Oải hương",type:"flower-lavender",text:"Mong những đêm của Thúy thật ngon giấc, những buổi sáng thức dậy nhẹ nhàng và những ngày bận rộn cũng có một khoảng nhỏ để thở phào. Đừng quên chăm sóc bản thân nhé. 💜"},
 {title:"Dâm bụt — Thuận lợi",name:"Dâm bụt",type:"flower-hibiscus",text:"Chúc những điều Thúy đang cố gắng sẽ dần có kết quả tốt đẹp. Mong Thúy gặp đúng cơ hội, đúng người giúp đỡ và luôn đủ kiên nhẫn để đi tiếp trên con đường mình chọn. 🌺"},
 {title:"Hoa ước nguyện — Điều bí mật",name:"Hoa ước nguyện",type:"flower-fantasy",text:"Và điều cuối cùng… mong một điều ước mà Thúy cất trong lòng sẽ có ngày thành hiện thực. Còn nếu Thúy chưa nghĩ ra điều ước nào, thì Lâm chúc Thúy luôn có lý do để hy vọng vào ngày mai. ✨"}
];
const $ = s => document.querySelector(s);
let watered = new Set(), read = new Set(), canSelected = false, toastTimer, sceneTimer;
const allScenes = [...document.querySelectorAll(".scene")];

function scene(id){
  const old = $(".scene.active"), next = $("#"+id);
  if(!next || old === next) return;
  clearTimeout(sceneTimer);
  old.classList.add("leaving");
  sceneTimer = setTimeout(()=>{
    old.classList.remove("active","leaving");
    next.classList.add("active");
    window.scrollTo({top:0,behavior:"smooth"});
    if(id==="bloom"){growGardenFlowers();sparkles(26);}
    if(id==="finale"){
      shower(26);
      $("#finalMessage").textContent = `Chúc ${RECIPIENT} có một ngày 20/10 thật vui vẻ nha! Mong ${RECIPIENT} luôn giữ được nụ cười của mình, gặp nhiều điều tốt đẹp và có thật nhiều khoảnh khắc đáng yêu. Dù đôi lúc có ngày hơi mệt, mong ${RECIPIENT} vẫn nhớ rằng mình xứng đáng với thật nhiều điều dịu dàng. Cảm ơn ${RECIPIENT} đã ghé thăm khu vườn nhỏ này. 💗`;
      $("#sender").textContent = SENDER;
    }
  },360);
}
function toast(message){
  $("#toast").textContent=message;$("#toast").classList.add("show");
  clearTimeout(toastTimer);toastTimer=setTimeout(()=>$("#toast").classList.remove("show"),2300);
}
function sparkles(count=12,x=innerWidth/2,y=innerHeight/2){
  const layer=$("#particles"),symbols=["✦","✧","·","✿","♡"];
  for(let i=0;i<count;i++){
    const s=document.createElement("span");s.className="spark";s.textContent=symbols[Math.random()*symbols.length|0];
    s.style.left=(x+(Math.random()-.5)*230)+"px";s.style.top=(y+(Math.random()-.5)*150)+"px";
    s.style.fontSize=(10+Math.random()*18)+"px";s.style.animationDelay=(Math.random()*.15)+"s";layer.append(s);
    setTimeout(()=>s.remove(),1450);
  }
}
function shower(count=18){
  for(let i=0;i<count;i++){
    const p=document.createElement("span");p.className="petal";p.style.left=Math.random()*100+"%";
    p.style.setProperty("--drift",(Math.random()-.5)*280+"px");
    p.style.animationDuration=(5+Math.random()*6)+"s";p.style.animationDelay=Math.random()*1.8+"s";
    $("#particles").append(p);setTimeout(()=>p.remove(),12500);
  }
}
function openDoor(){
  if($("#gate").classList.contains("open"))return;
  $("#gate").classList.add("open");sparkles(22);
  setTimeout(()=>scene("sleep"),1150);
}
$("#openDoor").addEventListener("click",openDoor);
$("#gate").addEventListener("click",openDoor);
$("#gate").addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openDoor();}});

function flowerMarkup(type){
  return `<span class="flower-drawing ${type}"><i></i><i></i><i></i><i></i><i></i><b></b></span>`;
}
function makePlants(target, sleepy=false){
  const plantTypes=["flower-tulip","flower-sun","flower-daisy","flower-rose","flower-cherry"];
  for(let i=0;i<5;i++){
    const b=document.createElement("button");b.className="plant";
    b.setAttribute("aria-label",sleepy?`Mầm hoa ${i+1}`:`Tưới mầm hoa ${i+1}`);
    b.innerHTML=`<span class="sprout">♧</span><span class="stem"></span><span class="leaf l1"></span><span class="leaf l2"></span><span class="pot"></span><span class="check">✦</span>`;
    b.dataset.plant=i;target.append(b);
  }
}
makePlants($("#sleepPlants"),true);
makePlants($("#waterPlants"));

$("#startWater").onclick=()=>{scene("water");toast("Chọn bình tưới, rồi chạm vào từng mầm hoa nhé!");};
$("#can").onclick=()=>{
  canSelected=!canSelected;$("#can").classList.toggle("selected",canSelected);
  $("#waterTip").textContent=canSelected?"Bình tưới sẵn sàng rồi! Chạm vào một mầm cây nhé.":"Chọn bình tưới rồi chạm vào một mầm cây.";
  if(canSelected)sparkles(8);
};
document.querySelectorAll("#waterPlants .plant").forEach(p=>p.onclick=()=>{
  const id=p.dataset.plant;
  if(watered.has(id)){toast("Bông hoa này đã được tưới rồi nè 🌱");return;}
  if(!canSelected){toast("Chạm vào bình tưới trước nha 💧");p.animate([{transform:"translateY(0)"},{transform:"translateY(-8px)"},{transform:"translateY(0)"}],350);return;}
  watered.add(id);p.classList.add("watered");
  const r=p.getBoundingClientRect();sparkles(10,r.left+r.width/2,r.top+25);
  $("#waterCount").textContent=`${watered.size} / 5`;$("#waterBar").style.width=(watered.size/5*100)+"%";
  $("#waterTip").textContent=watered.size===5?"Tất cả mầm hoa đã uống no nước. Phép màu sắp bắt đầu! ✨":"Giỏi lắm! Một mầm hoa đã được tưới. Mình tiếp tục nhé.";
  if(watered.size===5){canSelected=false;$("#can").classList.remove("selected");$("#waterNext").disabled=false;shower(12);}
});
$("#waterNext").onclick=()=>{if(watered.size===5)scene("bloom");};
$("#explore").onclick=()=>scene("exploreScene");

function growGardenFlowers(){
  const holder=$("#bigFlowers");if(holder.dataset.ready)return;holder.dataset.ready="1";
  const types=["✿","❀","✿","✿","❀","✿","❀","✿"];
  const colors=["#f8c1d7","#fff0e5","#e88eb5","#f5b7cb","#fff4e6","#e984ac","#f4c5d8","#ffd5e4"];
  types.forEach((symbol,i)=>{
    const flower=document.createElement("div");flower.className="big-flower";flower.style.setProperty("--delay",(i*.12)+"s");flower.style.setProperty("--petal",colors[i]);
    flower.innerHTML=`<span class="stem"></span><span class="leaf"></span><span class="head">${symbol}</span><span class="center"></span>`;
    holder.append(flower);
  });
}
const grid=$("#flowerGrid");
wishes.forEach((w,i)=>{
  const b=document.createElement("button");b.className="wish-flower";b.dataset.index=i;
  b.innerHTML=`<span class="flower-icon">${flowerMarkup(w.type)}</span><span class="flower-name">${w.name}</span>`;
  b.addEventListener("click",()=>openWish(i));grid.append(b);
});
function openWish(i){
  const w=wishes[i];$("#wishTitle").textContent=w.title;$("#wishText").textContent=w.text;
  $("#wishArt").innerHTML=flowerMarkup(w.type);$("#modal").classList.add("open");$("#modal").setAttribute("aria-hidden","false");
  read.add(i);$(`[data-index="${i}"]`).classList.add("read");
  $("#wishCount").textContent=`${read.size} / ${wishes.length}`;$("#wishBar").style.width=(read.size/wishes.length*100)+"%";
  const r=$(`[data-index="${i}"]`).getBoundingClientRect();sparkles(10,r.left+r.width/2,r.top+r.height/2);
  if(read.size===wishes.length){$("#exploreTip").textContent="Thúy đã tìm thấy đủ 8 lời chúc. Một điều bí mật đang chờ Thúy đó! 💗";$("#secretBtn").hidden=false;shower(12);}
}
function closeModal(){$("#modal").classList.remove("open");$("#modal").setAttribute("aria-hidden","true");}
$("#closeModal").onclick=closeModal;
$("#modal").onclick=e=>{if(e.target===$("#modal"))closeModal();};
document.onkeydown=e=>{if(e.key==="Escape")closeModal();};
$("#secretBtn").onclick=()=>scene("secret");
$("#openSecret").onclick=()=>{sparkles(35);shower(22);setTimeout(()=>scene("finale"),500);};
$(".secret-halo").onclick=()=>{sparkles(24);toast("Một điều ước dịu dàng đang được gửi đến Thúy ✨");};
$("#hug").onclick=()=>{
  $("#finale").classList.remove("hugged");void $("#finale").offsetWidth;$("#finale").classList.add("hugged");
  sparkles(26);shower(20);toast("Gửi Thúy một cái ôm thật dịu dàng nè ♡");
};
$("#restart").onclick=()=>{
  watered.clear();read.clear();canSelected=false;
  document.querySelectorAll(".plant").forEach(p=>p.classList.remove("watered"));
  document.querySelectorAll(".wish-flower").forEach(p=>p.classList.remove("read"));
  $("#waterCount").textContent="0 / 5";$("#waterBar").style.width="0%";$("#waterNext").disabled=true;
  $("#wishCount").textContent="0 / 8";$("#wishBar").style.width="0%";$("#secretBtn").hidden=true;
  $("#exploreTip").textContent="Cứ thong thả khám phá nhé, khu vườn không đi đâu cả.";
  $("#can").classList.remove("selected");$("#gate").classList.remove("open");closeModal();scene("door");
};
shower(8);

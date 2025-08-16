const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

const colors = ["#ff4757","#ffa502","#2ed573","#1e90ff","#e84393"];
let strokes = [];

// تحديث حجم اللوحة عند تغيير حجم النافذة
window.addEventListener('resize', ()=>{
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});

// إنشاء ضربة فرشة جديدة عند حركة الماوس
document.addEventListener('mousemove', e=>{
  for(let i=0;i<3;i++){ // إنشاء 3 ضربات لكل حركة
    const angle = Math.random()*Math.PI*2; // اتجاه عشوائي
    const speed = 2 + Math.random()*4; // سرعة مختلفة لكل ضربة
    strokes.push({
      x: e.clientX,
      y: e.clientY,
      vx: Math.cos(angle)*speed,
      vy: Math.sin(angle)*speed,
      size: 15 + Math.random()*10,
      color: colors[Math.floor(Math.random()*colors.length)]
    });
  }
});

function draw(){
  ctx.clearRect(0,0,width,height);

  strokes.forEach((s,index)=>{
    ctx.beginPath();
    ctx.moveTo(s.x,s.y);
    ctx.lineTo(s.x+0,s.y+0); // مجرد نقطة خطية
    ctx.lineWidth = s.size;
    ctx.strokeStyle = s.color;
    ctx.lineCap = 'round';
    ctx.stroke();

    // تحديث موقع الخط
    s.x += s.vx;
    s.y += s.vy;

    // إزالة الخط إذا خرج خارج الشاشة
    if(s.x< -50 || s.x>width+50 || s.y<-50 || s.y>height+50){
      strokes.splice(index,1);
    }
  });

  requestAnimationFrame(draw);
}

draw();

const squaresContainer = document.querySelector(".squares");

// توليد مربعات في أماكن عشوائية
for (let i = 0; i < 50; i++) {
  let square = document.createElement("div");
  square.classList.add("square");

  // موقع عشوائي
  square.style.top = Math.random() * 100 + "%";
  square.style.left = Math.random() * 100 + "%";

  // لون عشوائي
  const colors = ["#ff4757", "#1e90ff", "#2ed573", "#ffa502", "#e84393"];
  square.style.borderColor = colors[Math.floor(Math.random() * colors.length)];

  squaresContainer.appendChild(square);
}

function scrollToNextSection() {
  const secondSection = document.querySelector('.download'); // السيكشن اللي بعد الثانية
  secondSection.scrollIntoView({ behavior: 'smooth' });
}
const downloadBtn = document.getElementById('download-btn');

downloadBtn.addEventListener('click', () => {
  const link = document.createElement('a');
  link.href = 'app/NOVAapp.exe';  // المسار النسبي للملف داخل مشروعك
  link.download = 'NovaApp.exe';    // الاسم اللي يظهر عند التحميل
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
});



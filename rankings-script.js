(function(w,d){
    const t={
        'ht1':{c:'bg-gold/20 text-gold font-bold tier-ht1',t:'HT1'},
        'lt1':{c:'bg-gold/20 text-gold font-bold',t:'LT1'},
        'ht2':{c:'bg-silver/20 text-silver font-bold',t:'HT2'},
        'lt2':{c:'bg-silver/20 text-silver font-bold',t:'LT2'},
        'ht3':{c:'bg-bronze/20 text-bronze font-bold',t:'HT3'},
        'lt3':{c:'bg-bronze/20 text-bronze font-bold',t:'LT3'},
        'ht4':{c:'bg-gray-500/20 text-gray-400 font-bold',t:'HT4'},
        'lt4':{c:'bg-gray-500/20 text-gray-400 font-bold',t:'LT4'},
        'ht5':{c:'bg-gray-700/20 text-gray-500 font-bold',t:'HT5'},
        'lt5':{c:'bg-gray-700/20 text-gray-500 font-bold',t:'LT5'}
    };

    const r={
        'nc':{n:'华北',c:'bg-green-500/20 text-green-400'},
        'ec':{n:'华东',c:'bg-green-500/20 text-green-400'},
        'sc':{n:'华南',c:'bg-green-500/20 text-green-400'},
        'ws':{n:'西南',c:'bg-green-500/20 text-green-400'},
        'wn':{n:'西北',c:'bg-green-500/20 text-green-400'},
        'en':{n:'东北',c:'bg-green-500/20 text-green-400'}
    };

    let cr='all',cp=1,sq='',ipp=10;


    const rt=d.getElementById('rankingTable');
    const pb=d.querySelectorAll('.pagination-btn');
    const rf=d.getElementById('refreshBtn');
    const tt=d.getElementById('themeToggle');
    const ps=d.getElementById('playerSearch');
    const psi=d.getElementById('playerSearchInline');
    const re=d.getElementById('regionFilter');


    function gd(){
        try{
            if(w.__pd){
                return JSON.parse(atob(w.__pd));
            }
            return [];
        }catch(e){
            console.error('数据解码失败');
            return [];
        }
    }

    d.addEventListener('DOMContentLoaded',function(){
        rtbl();
        ael();
    });

 
    function ael(){
        re.addEventListener('change',function(){
            cr=this.value;
            cp=1;
            rtbl();
        });


        ps.addEventListener('input',hs);
        psi.addEventListener('input',hs);
        pb.forEach(b=>{
            b.addEventListener('click',function(){
                const p=this.dataset.page;
                
                if(p==='prev'&&cp>1){
                    cp--;
                }else if(p==='next'){
                    const f=gf();
                    const tp=Math.ceil(f.length/ipp);
                    if(cp<tp)cp++;
                }else if(!isNaN(p)){
                    cp=parseInt(p);
                }
                
                up();
                rtbl();
            });
        });

        rf.addEventListener('click',function(){
            this.classList.add('animate-spin');
            setTimeout(()=>{
                rtbl();
                this.classList.remove('animate-spin');
                sm('排行榜已更新');
            },800);
        });

        tt.addEventListener('click',function(){
            const i=this.querySelector('i');
            if(i.classList.contains('fa-moon-o')){
                i.classList.remove('fa-moon-o');
                i.classList.add('fa-sun-o');
                d.body.classList.add('bg-gray-950');
                d.body.classList.remove('bg-dark-blue');
                sm('已切换至超深色主题');
            }else{
                i.classList.remove('fa-sun-o');
                i.classList.add('fa-moon-o');
                d.body.classList.remove('bg-gray-950');
                d.body.classList.add('bg-dark-blue');
                sm('已切换至深色主题');
            }
        });
    }

    function hs(e){
        if(e.target.id==='playerSearch'){
            psi.value=e.target.value;
        }else{
            ps.value=e.target.value;
        }
        
        sq=e.target.value.trim().toLowerCase();
        cp=1;
        rtbl();
    }

    function gf(){
        let r=[...gd()];
        
        if(cr!=='all'){
            r=r.filter(p=>p.region===cr);
        }
        
        if(sq){
            r=r.filter(p=>p.name.toLowerCase().includes(sq));
        }

        r.sort((a,b)=>{
            const to={
                'ht1':10,'lt1':9,'ht2':8,'lt2':7,
                'ht3':6,'lt3':5,'ht4':4,'lt4':3,
                'ht5':2,'lt5':1
            };
            
            const td=to[b.tier]-to[a.tier];
            return td!==0?td:a.ping-b.ping;
        });
        
        return r;
    }

    function la(img,uuid,c){
        const l=d.createElement('div');
        l.className='avatar-loading';
        l.innerHTML='<div class="spinner"></div>';
        c.appendChild(l);
        
        const u=uuid.replace(/-/g,'');
        const urls=[
            `https://crafatar.com/renders/body/${u}?overlay&scale=6`,
            `https://mc-heads.net/body/${u}/100`,
            `https://crafatar.com/renders/body/Steve?overlay&scale=6`
        ];
        
        let ui=0;
        
        function tnu(){
            if(ui>=urls.length){
                sm(`玩家UUID可能无效: ${uuid}`,'warning');
                l.remove();
                return;
            }
            
            img.src=urls[ui];
            ui++;
        }
        
        img.onload=function(){
            if(this.width<=1&&this.height<=1)tnu();
            else l.remove();
        };
        
        img.onerror=tnu;
        tnu();
    }

    function rtbl(){
        const f=gf();
        const tp=Math.ceil(f.length/ipp);
        const si=(cp-1)*ipp;
        const pi=f.slice(si,si+ipp);
        
        rt.innerHTML='';
        
        if(pi.length===0){
            const er=d.createElement('tr');
            er.innerHTML=`<td colspan="5" class="px-4 py-6 text-center text-gray-400 text-xs"><i class="fa fa-search-minus mr-1"></i>未找到匹配的玩家数据</td>`;
            rt.appendChild(er);
            return;
        }
        
        pi.forEach((p,i)=>{
            const rk=si+i+1;
            const rg=r[p.region];
            const tr=t[p.tier];
            const row=d.createElement('tr');
            
            let rc='w-8 h-8 bg-medium-gray font-bold text-white',ri='';
            
            if(rk===1){
                rc='w-8 h-8 rank-1 font-bold text-dark-blue relative';
                ri='<i class="fa fa-crown rank-icon text-xs"></i>';
            }else if(rk===2){
                rc='w-8 h-8 rank-2 font-bold text-dark-blue relative';
                ri='<i class="fa fa-star rank-icon text-xs"></i>';
            }else if(rk===3){
                rc='w-8 h-8 rank-3 font-bold text-white relative';
                ri='<i class="fa fa-shield rank-icon text-xs"></i>';
            }
            
            row.className='border-b border-medium-gray hover:bg-medium-gray/30 transition-colors';
            row.innerHTML=`
                <td class="px-4 py-2">
                    <div class="flex items-center">
                        <span class="flex items-center justify-center rounded-full ${rc}">
                            ${rk}${ri}
                        </span>
                    </div>
                </td>
                <td class="px-4 py-2">
                    <div class="flex items-center">
                        <div class="avatar-3d-container breathing border-2 border-accent-blue/30 mr-2" id="avatar-container-${p.id}">
                            <div class="avatar-cropper">
                                <img id="avatar-${p.id}" alt="${p.name}的3D半身像" class="w-full h-auto object-contain">
                            </div>
                        </div>
                        <span class="player-name">${p.name}</span>
                    </div>
                </td>
                <td class="px-4 py-2">
                    <span class="px-1.5 py-0.5 rounded-full text-[10px] ${rg.c}">${rg.n}</span>
                </td>
                <td class="px-4 py-2">
                    <span class="px-1.5 py-0.5 rounded-full text-[10px] ${tr.c}">${tr.t}</span>
                </td>
                <td class="px-4 py-2">
                    <span class="flex items-center ${p.ping>100?'text-red-400':p.ping>60?'text-yellow-400':'text-green-400'} text-xs">
                        <i class="fa fa-signal mr-1 text-[10px]"></i>${p.ping}ms
                    </span>
                </td>
            `;
            
            rt.appendChild(row);

            const img=d.getElementById(`avatar-${p.id}`);
            const c=d.getElementById(`avatar-container-${p.id}`);
            la(img,p.uuid,c);
        });
        
        up();
    }

    function up(){
        const f=gf();
        const tp=Math.ceil(f.length/ipp);
        
        pb.forEach(b=>{
            const p=b.dataset.page;
            
            if(p==='prev'){
                b.disabled=cp===1;
            }else if(p==='next'){
                b.disabled=cp===tp||tp===0;
            }else{
                const pn=parseInt(p);
                if(pn===cp){
                    b.classList.add('bg-accent-blue');
                    b.classList.remove('bg-dark-gray');
                }else{
                    b.classList.remove('bg-accent-blue');
                    b.classList.add('bg-dark-gray');
                }
                
                b.style.display=pn>tp?'none':'inline-block';
            }
        });
    }

    function sm(m,t='info'){
        const n=d.createElement('div');
        let bc='bg-dark-gray',i='fa-info-circle';
        
        if(t==='warning'){
            bc='bg-yellow-900/80';
            i='fa-exclamation-triangle';
        }else if(t==='error'){
            bc='bg-red-900/80';
            i='fa-exclamation-circle';
        }
        
        n.className=`fixed bottom-3 right-3 ${bc} text-white px-3 py-1.5 rounded-lg shadow-lg transform translate-y-10 opacity-0 transition-all duration-300 z-50 text-xs`;
        n.innerHTML=`<i class="fa ${i} mr-1 text-[10px]"></i>${m}`;
        
        d.body.appendChild(n);
        
        setTimeout(()=>{
            n.classList.remove('translate-y-10','opacity-0');
        },10);
        
        setTimeout(()=>{
            n.classList.add('translate-y-10','opacity-0');
            setTimeout(()=>d.body.removeChild(n),300);
        },3000);
    }
})(window,document);
    

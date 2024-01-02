import {useState} from 'react';
import './App.css';

function App() {
  const ROW=4, COL=4, SIZ=120;
  const [table, setTable] = useState([0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]);
  const [isEnd, setIsEnd] = useState(false);
  const [times, setTimes] = useState(0);

  const preload = new Image();
  preload.src = './assets/images/odd.png';

  function turn(index) {
    if(isEnd) return;

    setTimes(times+1);

    const newTable = [...table];
    newTable[index]++;

    // 上にセルがある場合
    if(index > (COL-1)) newTable[index-ROW]++;
    // 右にセルがある場合
    if( (index+1) % ROW !== 0) newTable[index+1]++;
    // 下にセルがある場合
    if(index < (ROW*COL-COL)) newTable[index+ROW]++;
    // 左にセルがある場合
    if( (index) % ROW !== 0) newTable[index-1]++;

    const judgement = newTable.reduce((acc,cur)=>(cur%2!==0)?acc-1:acc,newTable.length)
    if(judgement <= 0) setIsEnd(true);
    setTable(newTable);
  }

  return (
    <div className={isEnd?'app end':'app'}>
      <div className='howto'><h2>Flip all panels</h2><p>When you tap a panel, tapped panel and its neighbor panels are fliped.</p><p>全てのパネルをひっくり返そう！</p></div>
      <div className="grid">
        {table.map((item,index)=><div className={table[index]%2===0?'cell even':'cell odd'} onClick={()=>{turn(index)}} style={{backgroundPosition:`${index%COL*-SIZ}px ${Math.floor(index/ROW)*-SIZ}px`}}></div>)}
      </div>
      {isEnd && <div className='congrat'><h1>Congraturations!</h1><p>You've turned panels {times} times.</p><p>{times}回 パネルをひっくり返しました。</p></div>}
    </div>
  );
}

export default App;

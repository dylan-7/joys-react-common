import { padStart } from 'lodash';
/**
 * 获得从m中取n的所有组合
 */
export function makeCombination(m, n) {
  const arr = new Array(n).fill(0);
  const s1 = arr.map((v,i)=>m-i).reduce((s, i)=>s * i, 1);
  const s2 = arr.map((v,i)=>n-i).reduce((s, i)=>s * i, 1);
  const s3 = s1/s2;
  return s3;
}

/**
 * 获取 [[1,2,3],[1,2,3],[1,2,3]] 不重复的组合(每行取1个的情况）
 * @param _array
 */
export function makeUniq(_array: string[][], log = false): number {
  const arr = _array.reduce((arr,a,i,array)=>{
    const b=array[i-1];
    let ok = [];
    if(b&&b.length>0){
      // ok = arr.reduce((n,v1,j)=>n.concat(a.filter(v2=>!(String(v1).includes(v2))).map(v2=>v1+''+v2)), []);
      ok = arr.reduce((n,v1)=>n.concat(a.filter(v2=>!(String(v1).split(' ').includes(String(v2)))).map(v2=>v1+' '+v2)), []);
    } else {
      ok = a;
    }
    return ok
  },[]);
  if (log) console.log(arr);
  return arr.length;
}


export function countSum(type: string, n: string) {
  let val = 1;
  if (type==='直选'||type==='三星'){
    val = countSum3(n);
  } else if (type==='二星'){
    val = countSum2(n);
  } else if (type==='组三'){
    val = countSumZu3(n);
  } else if (type==='组六'){
    val = countSumZu6(n);
  }
  return val;
}
/**
 * 时时彩 和值 与 福体彩 直选
 * 三星
 */
export function countSum3(n: string){
  const sumMap = new Array(28).fill(0);
  new Array(1000).fill(0).forEach((v,i)=>{
    const a = padStart(String(i), 3, '0');
    const sum = a.split('').reduce((s,v)=>s+=Number(v),0);
    sumMap[sum]+=1;
  });
  return sumMap[Number(n)];
}
/**
 * 时时彩 和值
 * 二星(后两位）
 */
export function countSum2(n: string){
  const sumMap = new Array(19).fill(0);
  new Array(100).fill(0).forEach((v,i)=>{
    const a = padStart(String(i), 2, '0');
    const sum = a.split('').reduce((s,v)=>s+=Number(v),0);
    sumMap[sum]+=1;
  });
  return sumMap[Number(n)];
}
/**
 * 福体彩 组三（两同）
 */
export function countSumZu3(n: string){
  const sumMap = new Array(28).fill(0);
  const aset = new Set();
  new Array(1000).fill(0).forEach((v,i)=>{
    let a = padStart(String(i), 3, '0');
    // 要求无序
    a = a.split('').sort().join('');
    aset.add(a);
  });
  Array.from(aset).forEach((a)=>{
    const [a1,a2,a3] = a.split('').map(v=>Number(v));
    const sum = a.split('').reduce((s,v)=>s+=Number(v),0);
    if (
      (a1==a2 && a2!=a3)
      || (a2==a3 && a1!=a3)
    ) {
      sumMap[sum]+=1;
    }
    // console.log('\u2714 combination countSumZu3 90', sumMap);
  });
  return sumMap[Number(n)];
}
/**
 * 福体彩 组六(三不同）
 */
export function countSumZu6(n: string){
  const sumMap = new Array(28).fill(0);
  const aset = new Set();
  new Array(1000).fill(0).forEach((v,i)=>{
    let a = padStart(String(i), 3, '0');
    // 要求无序
    a = a.split('').sort().join('');
    aset.add(a);
  });
  Array.from(aset).forEach((a)=>{
    const [a1,a2,a3] = a.split('').map(v=>Number(v));
    const sum = a.split('').reduce((s,v)=>s+=Number(v),0);
    if (a1!=a2 && a2!=a3 && a1!=a3) {
      sumMap[sum]+=1;
    }
  });
  return sumMap[Number(n)];
}
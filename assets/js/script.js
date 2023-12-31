// let timer; // 27行目のtimer変数を一時的に使うため、定義している
//const studentNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18];


/**
  * 数字の席番号ブロックを表示するための元データになる配列を作成
  * 関数内で、欠席者を取り除く処理も行う
  * @param  {Number} studentNumber 生徒の人数を表示 
  * @return {Array} 席番号ブロックに表示するための元データとなる配列（欠席者取り除き済）
  */
const setTargetStudents = (studentNumber)=>{
  let studentNumberList = [];
  for(let i = 1; i <= studentNumber; i++){
    studentNumberList.push(i); // モーダルに入力された数だけ、studentNumberListの配列が生成される。例：[1, 2]
  }
  const absenteeNumbers = document.querySelector("#absence").value; // 欠席者のフォームに入力された数
  const splitedAbsenteeNumbers = absenteeNumbers.split(",").map(function(item, index){
    return parseInt(item);
  });

  studentNumberList = studentNumberList.filter((student)=>{
    return !splitedAbsenteeNumbers.includes(student); // student(数字)が含まれていないものを返す
  })
  return studentNumberList;
}

const shuffleArray = (studentNumberList)=>{
  for(let i = studentNumberList.length; i > 0; i--){
    const randomNum = Math.floor(Math.random() * i);
    let tmp = studentNumberList[i - 1];
    studentNumberList[i - 1] = studentNumberList[randomNum];
    studentNumberList[randomNum] = tmp;
  }
  return studentNumberList;
}

const showSeatBoxes = (shuffleStudent)=>{
  let insertHTML = '';
  shuffleStudent.forEach(function(num){
    insertHTML += `<div class="seat__item">${num}</div>`
    //console.log(num);
  })
  document.querySelector('#seat').innerHTML = insertHTML;
}

const soundPlay = function(timer){
  const audioElement = new Audio();
  audioElement.src = 'assets/audio/drum.mp3'; // src属性は、オーディオコンテンツ（音声ファイルなど）のソースのURLを指定するために使用される。ないと再生されない
  audioElement.play();
  audioElement.addEventListener('ended', function(){
    clearInterval(timer);
  })
}

document.querySelector('#btn-start').addEventListener('click', ()=>{//function(){
  console.log(this);
  const studentNumber = document.querySelector("#studentNumber").value;
  const studentUpperlimit = 50;
  const studentNumberIsEmpty = studentNumber === "";
  const studentNumberIsZero = studentNumber == 0;

  // 未入力の場合
  if(studentNumberIsEmpty){
    alert('人数が未入力です！入力してからスタートボタンを押してください。');
    return false; // これがないと、アラート閉じた後に処理が走る。
  }

  // 0が入力された場合
  if(studentNumberIsZero){
    alert('人数には1以上の値を入力してください！');
    return false;
  }

  // 50人以上が入力された場合
  if(studentNumber > studentUpperlimit){
    alert(`人数は${studentUpperlimit}人以内に設定してください！`);
    return false;
  }

  document.querySelector('.c-overlay').classList.add("is-closed");

  const studentNumberList = setTargetStudents(studentNumber);

  const timer = setInterval(()=>{
    //shuffleArray();
    //showSeatBoxes();
    const shuffleStudent = shuffleArray(studentNumberList);
    showSeatBoxes(shuffleStudent);
  }, 50);
  
  soundPlay(timer);
})

//要するに、この処理は配列の１から１８の数字を１８回ランダムに入れ替えている、入れ替え箇所は配列最後の数字と、ランダムに選ばれた数字を入れ替える
//アルゴリズムを学習すべし

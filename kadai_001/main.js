// 変数の初期化　空の文字列で初期化し、後でテキストデータを格納するために使用
let untyped = '';
let typed = '';
let score = 0;
// タイプ数をカウントする変数の初期化
let typeCount = 0; 

// 必要なHTML要素の取得
const untypedfield = document.getElementById('untyped');
const typedfield = document.getElementById('typed');
const wrap = document.getElementById('wrap')
const start = document.getElementById('start');
const count = document.getElementById('count');
const typeCounter =document.getElementById('typeCounter');

// 複数のテキストを格納する配列
const textLists = [
   'Hello World','This is my App','How are you?',
   'Today is sunny','I love JavaScript!','Good morning',
   'I am Japanese','Let it be','Samurai',
   'Typing Game','Information Technology',
   'I want to be a programmer','What day is today?',
   'I want to build a web app','Nice to meet you',
   'Chrome Firefox Edge Safari','machine learning',
   'Brendan Eich','John Resig','React Vue Angular',
   'Netscape Communications','undefined null NaN',
   'Thank you very much','Google Apple Facebook Amazon',
   'ECMAScript','console.log','for while if switch',
   'var let const','Windows Mac Linux iOS Android',
   'programming'
];

// ランダムなテキストを表示　
const createText = () => {

    // 入力済み文字列を初期化
    typed = '';
    typedfield.textContent = typed;

    // 配列のインデックス数からランダムな数値を生成する
    let random = Math.floor(Math.random() * textLists.length);
    
    // untypedに再代入　テキストデータを格納
    untyped = textLists[random];
    
    // untypefieldという取得したHTML要素にtextContentプロパティでテキスト追加（テキスト内容はuntypedの値を設定）
    untypedfield.textContent = untyped;

};


// キー入力の判定
const keyPress = e =>{
    // console.log(e.key);

    // 誤タイプの場合
    if(e.key !== untyped.substring(0, 1)){
        wrap.classList.add('mistyped');
        // 100ms後に背景色を元に戻す
        setTimeout(() => {
            wrap.classList.remove('mistyped')
        }, 100);
        return;
    }

    // 正タイプの場合
    // スコアのインクリメント
    score++;
    wrap.classList.remove('mistyped');
    typed += untyped.substring(0, 1);
    untyped = untyped.substring(1);
    typedfield.textContent = typed;
    untypedfield.textContent = untyped;
    typeCount++;
    typeCounter.textContent = typeCount;

    // テキストがなくなったら新しいテキストを表示
    if(untyped === '') {
        createText();
    }
};

// タイピングスキルのランクを判定
const rankCheck = score => {
    
    // テキストを格納する変数を作る
    let text = '';

    // スコアに応じて異なるメッセージを変数textに格納する
    if(score < 100){
        text = `あなたのランクはCです。\nBランクまであと${100 - score}文字です。`;
    } else if(score < 200){
        text = `あなたのランクはBです。\nAランクまであと${200 - score}文字です。`;
    } else if(score < 300){
        text = `あなたのランクはAです。\nSランクまであと${300 - score}文字です。`;
    } else if(score >= 300){
        text = `あなたのランクはSです。\nおめでとうございます!`;
    }

    // 生成したメッセージと一緒に文字列を返す
    return`${score}文字打てました!\n${text}\n【OK】リトライ / 【キャンセル】終了`;
};

// ゲームを終了
const gameOver = id => {
    clearInterval(id);

    const result = confirm(rankCheck(score));

    // OKボタンをクリックしたらリロードする
    if(result == true){
        window.location.reload();
    }
};

// カウントダウンタイマー
const timer = () => {

    // タイマー部分のHTML要素（P要素の値）を取得する
    let time = count.textContent;

    const id = setInterval(() => {

        // カウントダウンする
        time--;
        count.textContent = time;

        // カウントが０になったらタイマーを停止する
        if(time <= 0){
            gameOver(id);
        }
    }, 1000);
};

// キーボードのイベント処理
// ゲムスタート時の処理
start.addEventListener('click', () => {
    
    // カウントダウンタイマーを開始する(timer関数の呼び出し))
    timer();

    // ランダムなテキストを表示する
    createText();

    // スタートボタンを非表示にする
    start.style.display = 'none';

    // キーボードのイベント処理
    document.addEventListener('keypress', keyPress);
});

untypedfield.textContent = 'スタートボタンで開始';


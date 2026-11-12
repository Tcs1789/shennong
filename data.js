/* =====================================================================
   紅茶媽媽 三重神農店：網站內容
   要改菜單、價格、公告、營業時間，只要改這個檔案。
   ===================================================================== */
window.SITE = {
  storeName: '紅茶媽媽',
  branch: '三重神農店',
  tagline: ['巷子裡的', '一杯原葉茶'],   // 首頁直書的兩行字
  intro: '藏在五谷王北街的巷弄裡。每一杯都用原葉現泡，甜味只用百分之百純蔗糖。路過的時候帶一杯走，忙的時候，我們送過去。',
  address: '新北市三重區五谷王北街45巷19號',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('新北市三重區五谷王北街45巷19號'),
  phone: '0987-590818',
  lineId: '',            // 店長個人 LINE ID（選填）
  lineUrl: '',           // LINE 加好友連結（選填，例：https://line.me/ti/p/xxxx）

  // 訂單送到哪裡：Google Apps Script 部署後的網址（…/exec）。空白＝預覽模式，訂單不會送出
  orderEndpoint: 'https://script.google.com/macros/s/AKfycbzk2CTeRzCQkpwKTYddIx7swi7cGdcXuW6FDVyTdTAJFWwbbKmS1uHj9znbSvXQ5G1c/exec',

  // 公告：最新的放最上面，最多顯示 4 則
  news: [
    { date: '2026-11-12', text: '週一、週四第二杯半價，活動到 12/31：同一筆訂單每兩杯，較便宜的那杯半價。' },
    { date: '2026-10-28', text: '開放線上訂購：自取、外送、公司下午茶團購都能在網站上下單。' },
    { date: '2026-10-28', text: '前一天 18:00 前預購滿 10 杯，整筆打 9 折。' },
    { date: '2026-10-28', text: '公司、工廠下午茶團購，14:30 前送達。' }
  ],

  // 營業時間：0=週日 … 6=週六，沒寫的那天公休
  hours: {1:['11:00','14:00'],2:['11:00','19:00'],3:['11:00','19:00'],4:['11:00','14:00'],5:['11:00','19:00'],6:['12:00','18:00']},
  leadMinutes: 40,       // 當天訂單至少提前幾分鐘
  daysAhead: 6,          // 可以預訂幾天後
  groupLatest: '14:30',  // 團購／下午茶最晚送達時間
  delivery: { baseKm: 2, baseMin: 300, stepPerKm: 100, maxKm: 4 }, // 2 公里內滿 300，每多 1 公里低消 +100
  preorder: { cups: 10, cutoff: '18:00', rate: 0.9 },              // 前一天 18:00 前預購滿 10 杯打 9 折

  // 促銷活動：日期到了自動上架、過期自動下架。整筆優惠（第二杯半價、滿額折、優惠碼、預購 9 折）擇一，自動選最划算的
  //   second-half 第二杯半價（每兩杯，較便宜的那杯半價）
  //   item-price  指定品項特價，例：items: {'紅玉鮮奶茶': 60}；或整類折價，例：cat: '鮮奶茶', off: 10
  //   spend-off   滿額折，例：min: 500, off: 50
  //   code        優惠碼，例：code: 'FACTORY', rate: 0.95（不會顯示在首頁）
  //   days 可限定星期幾（0=週日），start / end 是開始和結束日期（含當天）
  promos: [
    { title: '週一、週四 第二杯半價', type: 'second-half', days: [1, 4], start: '2026-10-28', end: '2026-12-31',
      note: '同一筆訂單每兩杯，較便宜的那杯半價。' },
    { title: '鮮奶茶雙週 每杯折 10 元', type: 'item-price', cat: '鮮奶茶', off: 10, start: '2026-10-28', end: '2026-11-10',
      note: '鮮奶茶全品項，紅玉鮮奶茶 60、桂妃鮮奶茶 55。' }
  ],

  sugar: ['正常糖','八分糖','半糖','微糖','無糖'],
  ice:   ['正常冰','少冰','微冰','去冰','溫'],
  toppings: [ {name:'愛玉',price:15}, {name:'布丁',price:15}, {name:'仙草凍',price:15}, {name:'蜂蜜凍',price:15},
              {name:'寒天黑糖',price:15}, {name:'珍珠',price:10}, {name:'椰果',price:10} ],
  sizes: ['L'],
  // 菜單：price 依 sizes 順序填。hot = 招牌推薦，fixed = 固定甜度（不能調糖）
  menu: [
    {cat:'原茶', items:[
      {name:'日月潭紅玉紅茶', price:[45], hot:1}, {name:'魚池阿薩姆紅茶', price:[40]}, {name:'蜜香紅茶', price:[40]},
      {name:'四季青春茶', price:[35]}, {name:'茉香綠茶', price:[35]}, {name:'阿里山金萱茶', price:[35]},
      {name:'黃金蕎麥茶', price:[35]}, {name:'古早味冬瓜茶', price:[35], fixed:1}
    ]},
    {cat:'特調茶', items:[
      {name:'黃金柳橙綠', price:[60], hot:1}, {name:'蘋果紅茶', price:[55], hot:1, fixed:1}, {name:'蘋果青茶', price:[55], hot:1, fixed:1},
      {name:'檸檬愛玉紅茶', price:[60]}, {name:'冬瓜檸檬愛玉', price:[60], fixed:1}, {name:'蜂蜜凍檸檬青茶', price:[55]},
      {name:'檸檬愛玉', price:[55]}, {name:'甘蔗青茶', price:[55]}, {name:'梅子醋青茶', price:[50], fixed:1},
      {name:'百香果綠茶', price:[50]}, {name:'冰梅茉香綠茶', price:[50]}, {name:'檸檬紅茶', price:[50]},
      {name:'冬瓜檸檬', price:[50], fixed:1}, {name:'多多綠茶', price:[50]}, {name:'翡翠檸檬', price:[50], hot:1},
      {name:'冬瓜青茶', price:[50]}
    ]},
    {cat:'鮮奶茶', items:[
      {name:'黑糖珍珠鮮奶', price:[75], fixed:1}, {name:'仙草凍鮮奶', price:[75]}, {name:'紅玉鮮奶茶', price:[70], hot:1},
      {name:'錫蘭鮮奶茶', price:[65]}, {name:'桂妃鮮奶茶', price:[65], hot:1}, {name:'格雷伯爵鮮奶茶', price:[65]},
      {name:'碳焙烏龍鮮奶茶', price:[65]}, {name:'阿薩姆鮮奶茶', price:[65]}, {name:'茉香綠鮮奶茶', price:[65]},
      {name:'冬瓜鮮奶茶', price:[65], fixed:1}, {name:'黃金蕎麥鮮奶茶', price:[65]}
    ]},
    {cat:'奶茶', items:[
      {name:'紅玉奶茶', price:[60]}, {name:'錫蘭奶茶', price:[55]}, {name:'碳焙烏龍奶茶', price:[55], hot:1},
      {name:'格雷伯爵奶茶', price:[55]}, {name:'阿薩姆奶茶', price:[55]}, {name:'茉香綠奶茶', price:[55]}, {name:'蜜香奶茶', price:[55]}
    ]},
    {cat:'奶蓋', items:[
      {name:'奶蓋紅玉紅茶', price:[65], hot:1}, {name:'奶蓋蜜香紅茶', price:[60]}, {name:'奶蓋阿薩姆紅茶', price:[60]},
      {name:'奶蓋四季青茶', price:[55]}, {name:'奶蓋茉香綠茶', price:[55]}, {name:'奶蓋金萱茶', price:[55], hot:1},
      {name:'奶蓋蕎麥茶', price:[55]}
    ]}
  ]
};

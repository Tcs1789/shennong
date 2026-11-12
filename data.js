/* =====================================================================
   紅茶媽媽 三重神農店：網站內容
   要改菜單、價格、公告、營業時間，只要改這個檔案。
   ===================================================================== */
window.SITE = {
  storeName: '紅茶媽媽',
  branch: '三重神農店',
  tagline: ['安靜的街上', '一杯原葉茶'],   // 首頁直書的兩行字
  // 英文版（網站右上角切換 EN 時顯示）
  storeNameEn: 'Ma Ma Tea',
  branchEn: 'Sanchong Shennong',
  taglineEn: ['On a quiet street,', 'a cup of real tea'],
  introEn: 'A quiet stretch of Wuguwang N. St. that the crowds haven\'t found yet. Grab a cup on your way by — or if you\'re busy, we\'ll bring it to you.',
  addressEn: 'No. 19, Ln. 45, Wuguwang N. St., Sanchong Dist., New Taipei City',
  intro: '五谷王北街上，還沒被熱鬧找到的一段。路過的時候帶一杯走，忙的時候，我們送過去。',
  address: '新北市三重區五谷王北街45巷19號',
  mapUrl: 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('新北市三重區五谷王北街45巷19號'),
  phone: '0987-590818',
  lineId: '',            // 店長個人 LINE ID（選填）
  lineUrl: '',           // LINE 加好友連結（選填，例：https://line.me/ti/p/xxxx）

  // 訂單送到哪裡：Google Apps Script 部署後的網址（…/exec）。空白＝預覽模式，訂單不會送出
  orderEndpoint: 'https://script.google.com/macros/s/AKfycbzk2CTeRzCQkpwKTYddIx7swi7cGdcXuW6FDVyTdTAJFWwbbKmS1uHj9znbSvXQ5G1c/exec',

  // 公告：最新的放最上面，最多顯示 4 則
  // 日期還沒到的公告不會顯示，到了當天自動出現
  news: [
    { date: '2027-01-10', until: '2027-01-23', text: '週年慶第二段：1/11–1/23 鮮奶茶第二杯半價，可混搭，每單最多 5 杯半價。',
      en: 'Anniversary, part two: Jan 11–23, fresh milk tea 2nd cup half price. Mix and match, up to 5 per order.' },
    { date: '2026-12-19', until: '2027-01-09', text: '週年慶：12/25–1/9 原茶買一送一；1/11–1/23 鮮奶茶第二杯半價。同系列可混搭，自取、外送都適用。',
      en: 'Anniversary: Dec 25–Jan 9, pure tea buy one get one free; Jan 11–23, fresh milk tea 2nd cup half price. Mix within the series, pickup or delivery.' },
    { date: '2026-11-21', until: '2026-12-24', text: '每週優惠（至 12/24）：週一、四第二杯半價；週二、三、五滿 $300 折 $30。',
      en: 'Weekly deals (until 12/24): Mon & Thu, 2nd cup half price; Tue, Wed & Fri, $30 off orders of $300+.' },
    { date: '2026-11-12', text: '週一、週四第二杯半價，活動到 12/24：同一筆訂單每兩杯，較便宜的那杯半價。', until: '2026-11-20',
      en: 'Mon & Thu: 2nd cup half price until 12/24. In each order, every second (cheaper) cup is half price.' },
    { date: '2026-10-28', text: '開放線上訂購：自取、外送都能在網站上下單。',
      en: 'Online ordering is open: order here for pickup or delivery.' },
    { date: '2026-10-28', text: '前一天 18:00 前預購滿 10 杯，整筆打 9 折。',
      en: 'Order 10+ cups by 6 PM the day before and get 10% off the whole order.' },
  ],

  // 營業時間：0=週日 … 6=週六，沒寫的那天公休
  hours: {1:['11:00','14:00'],2:['11:00','19:00'],3:['11:00','19:00'],4:['11:00','14:00'],5:['11:00','19:00'],6:['12:00','18:00']},
  leadMinutes: 40,       // 當天訂單至少提前幾分鐘
  daysAhead: 6,          // 可以預訂幾天後
  groupLatest: '14:30',  // 團購／下午茶最晚送達時間
  delivery: { baseKm: 2, baseMin: 300, stepPerKm: 100, maxKm: 4 }, // 2 公里內滿 300，每多 1 公里低消 +100；超過 maxKm 不設低消，建議來電確認
  preorder: { cups: 10, cutoff: '18:00', rate: 0.9 },              // 前一天 18:00 前預購滿 10 杯打 9 折

  // 促銷活動：日期到了自動上架、過期自動下架。整筆優惠（第二杯半價、滿額折、優惠碼、預購 9 折）擇一，自動選最划算的
  //   second-half 第二杯半價（每兩杯，較便宜的那杯半價）
  //   bogo        買一送一（每兩杯，較便宜的那杯免費）
  //               second-half 和 bogo 都可加 cat: '原茶' 限定品類、max: 5 每單最多幾杯
  //   item-price  指定品項特價，例：items: {'紅玉鮮奶茶': 60}；或整類折價，例：cat: '鮮奶茶', off: 10
  //   spend-off   滿額折，例：min: 500, off: 50
  //   code        優惠碼，例：code: 'FACTORY', rate: 0.95（不會顯示在首頁）
  //   days 可限定星期幾（0=週日），start / end 是開始和結束日期（含當天）
  promos: [
    { title: '週一、週四 第二杯半價', type: 'second-half', days: [1, 4], start: '2026-10-28', end: '2026-12-24',
      note: '同一筆訂單每兩杯，較便宜的那杯半價。',
      en: { title: 'Mon & Thu: 2nd cup half price', note: 'In each order, every second (cheaper) cup is half price.' } },
    { title: '鮮奶茶雙週 每杯折 10 元', type: 'item-price', cat: '鮮奶茶', off: 10, start: '2026-10-28', end: '2026-11-10',
      note: '鮮奶茶全品項，紅玉鮮奶茶 60、桂妃鮮奶茶 55。',
      en: { title: 'Fresh milk tea: $10 off each', note: 'All fresh milk teas.' } },
    // 週二、三、五 滿 300 折 30
    { title: '週二、三、五 滿 $300 折 $30', type: 'spend-off', min: 300, off: 30, days: [2, 3, 5], start: '2026-11-21', end: '2026-12-24',
      note: '飲料金額滿 $300 折 $30。',
      en: { title: 'Tue, Wed & Fri: $30 off $300+', note: '$30 off when your drinks total $300 or more.' } },
    // 週年慶（耶誕＋跨年起跑；期間不與每週優惠併用，所以每週優惠 12/24 結束）
    { title: '週年慶｜原茶買一送一', type: 'bogo', cat: '原茶', max: 5, start: '2026-12-25', end: '2027-01-09',
      note: '原茶可混搭，每兩杯送價格較低的那杯，每單最多送 5 杯。',
      en: { title: 'Anniversary: Pure tea, buy one get one free', note: 'Mix any pure teas. In every two cups, the cheaper one is free (up to 5 free per order).' } },
    { title: '週年慶｜鮮奶茶第二杯半價', type: 'second-half', cat: '鮮奶茶', max: 5, start: '2027-01-11', end: '2027-01-23',
      note: '鮮奶茶可混搭，每兩杯較便宜的那杯半價，每單最多 5 杯半價。',
      en: { title: 'Anniversary: Fresh milk tea, 2nd cup half price', note: 'Mix any fresh milk teas. In every two cups, the cheaper one is half price (up to 5 per order).' } }
  ],

  // 英文名稱對照：新增品項時，在這裡加一行英文名（沒加的會顯示中文）
  en: {
    '原茶':'Pure Tea', '特調茶':'Specialty Tea', '鮮奶茶':'Fresh Milk Tea', '奶茶':'Milk Tea', '奶蓋':'Milk Foam Tea',
    '日月潭紅玉紅茶':'Sun Moon Lake Ruby Black Tea', '魚池阿薩姆紅茶':'Yuchi Assam Black Tea', '蜜香紅茶':'Honey-Scent Black Tea',
    '四季青春茶':'Four Seasons Oolong', '茉香綠茶':'Jasmine Green Tea', '阿里山金萱茶':'Alishan Jin Xuan Oolong',
    '黃金蕎麥茶':'Golden Buckwheat Tea', '古早味冬瓜茶':'Classic Winter Melon Tea',
    '黃金柳橙綠':'Orange Green Tea', '蘋果紅茶':'Apple Black Tea', '蘋果青茶':'Apple Oolong',
    '檸檬愛玉紅茶':'Lemon Black Tea with Aiyu Jelly', '冬瓜檸檬愛玉':'Winter Melon Lemon with Aiyu Jelly', '蜂蜜凍檸檬青茶':'Lemon Oolong with Honey Jelly',
    '檸檬愛玉':'Lemon Aiyu Jelly', '甘蔗青茶':'Sugarcane Oolong', '梅子醋青茶':'Plum Vinegar Oolong',
    '百香果綠茶':'Passion Fruit Green Tea', '冰梅茉香綠茶':'Plum Jasmine Green Tea', '檸檬紅茶':'Lemon Black Tea',
    '冬瓜檸檬':'Winter Melon Lemonade', '多多綠茶':'Yakult Green Tea', '翡翠檸檬':'Lemon Jade Green Tea', '冬瓜青茶':'Winter Melon Oolong',
    '黑糖珍珠鮮奶':'Brown Sugar Boba Fresh Milk', '仙草凍鮮奶':'Grass Jelly Fresh Milk', '紅玉鮮奶茶':'Ruby Black Tea Fresh Milk Tea',
    '錫蘭鮮奶茶':'Ceylon Fresh Milk Tea', '桂妃鮮奶茶':'Osmanthus Oolong Fresh Milk Tea', '格雷伯爵鮮奶茶':'Earl Grey Fresh Milk Tea',
    '碳焙烏龍鮮奶茶':'Roasted Oolong Fresh Milk Tea', '阿薩姆鮮奶茶':'Assam Fresh Milk Tea', '茉香綠鮮奶茶':'Jasmine Green Fresh Milk Tea',
    '冬瓜鮮奶茶':'Winter Melon Fresh Milk', '黃金蕎麥鮮奶茶':'Buckwheat Fresh Milk Tea',
    '紅玉奶茶':'Ruby Black Milk Tea', '錫蘭奶茶':'Ceylon Milk Tea', '碳焙烏龍奶茶':'Roasted Oolong Milk Tea',
    '格雷伯爵奶茶':'Earl Grey Milk Tea', '阿薩姆奶茶':'Assam Milk Tea', '茉香綠奶茶':'Jasmine Green Milk Tea', '蜜香奶茶':'Honey-Scent Milk Tea',
    '奶蓋紅玉紅茶':'Ruby Black Tea with Milk Foam', '奶蓋蜜香紅茶':'Honey-Scent Black Tea with Milk Foam', '奶蓋阿薩姆紅茶':'Assam Black Tea with Milk Foam',
    '奶蓋四季青茶':'Four Seasons Oolong with Milk Foam', '奶蓋茉香綠茶':'Jasmine Green Tea with Milk Foam', '奶蓋金萱茶':'Jin Xuan Oolong with Milk Foam',
    '奶蓋蕎麥茶':'Buckwheat Tea with Milk Foam',
    '正常糖':'Regular sugar', '八分糖':'80% sugar', '半糖':'Half sugar', '微糖':'Light sugar', '無糖':'No sugar', '固定甜度':'Fixed sweetness',
    '正常冰':'Regular ice', '少冰':'Less ice', '微冰':'Light ice', '去冰':'No ice', '溫':'Warm',
    '愛玉':'Aiyu jelly', '布丁':'Pudding', '仙草凍':'Grass jelly', '蜂蜜凍':'Honey jelly', '寒天黑糖':'Brown sugar agar', '珍珠':'Boba', '椰果':'Nata de coco'
  },

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

const password = "wedding20251025";
let guestData = [];

try {
    console.log('開始解密...');
    console.log('加密資料長度:', window.encryptedGuestData ? window.encryptedGuestData.length : 'undefined');
    
    const decrypted = CryptoJS.AES.decrypt(window.encryptedGuestData, password);
    //console.log('解密後原始資料:', decrypted);
    
    const utf8 = decrypted.toString(CryptoJS.enc.Utf8);
    //console.log('轉換成 UTF-8:', utf8);
    
    guestData = JSON.parse(utf8);
    console.log('成功解密資料，共', guestData.length, '筆');
} catch (e) {
    console.error('資料解密失敗，詳細錯誤：', e);
    console.error('錯誤類型：', e.name);
    console.error('錯誤訊息：', e.message);
    console.error('錯誤堆疊：', e.stack);
    alert("資料解密失敗，請聯絡主辦人");
}

// 取得 DOM 元素
const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const resultSection = document.getElementById('resultSection');
const welcomeText = document.getElementById('welcomeText');

// 搜尋功能
function searchGuest() {
    const searchTerm = searchInput.value.trim().toLowerCase();
    
    if (!searchTerm) {
        alert('請輸入搜尋內容');
        return;
    }

    const guest = guestData.find(g => 
        g['姓名'].toLowerCase().includes(searchTerm) ||
        (g['別稱'] && g['別稱'].toLowerCase().includes(searchTerm)) ||
        (g['手機'] && g['手機'].includes(searchTerm))
    );

    if (guest) {
        displayResult(guest);
    } else {
        alert('找不到符合的資料');
        resultSection.style.display = 'none';
    }
}

// 顯示結果
function displayResult(guest) {
    // 設定歡迎詞
    welcomeText.textContent = `親愛的 ${guest['姓名']}${guest['別稱'] ? ` (${guest['別稱']})` : ''}，歡迎您來參加我們的婚禮！`;

    // 更新資料
    document.getElementById('tableNumber').textContent = guest['桌號'] || '未設定';
    document.getElementById('guestName').textContent = guest['姓名'] || '未設定';
    document.getElementById('nickname').textContent = guest['別稱'] || '未設定';
    document.getElementById('relationSide').textContent = guest['關係方'] || '未設定';
    document.getElementById('relation').textContent = guest['關係'] || '未設定';
    document.getElementById('attendanceCount').textContent = guest['出席人數'] || '0';
    document.getElementById('vegetarianCount').textContent = guest['素食人數'] || '0';
    document.getElementById('childSeatCount').textContent = guest['兒童座椅餐具數量'] || '0';
    document.getElementById('notes').textContent = guest['備註'] || '無';

    // 顯示結果區塊
    resultSection.style.display = 'block';
    
    // 加入動畫效果
    resultSection.style.animation = 'none';
    resultSection.offsetHeight; // 觸發重繪
    resultSection.style.animation = 'fadeIn 0.5s ease';
}

// 事件監聽
searchBtn.addEventListener('click', searchGuest);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchGuest();
    }
});

// 加入輸入框動畫效果
searchInput.addEventListener('focus', () => {
    searchInput.style.transform = 'scale(1.02)';
});

searchInput.addEventListener('blur', () => {
    searchInput.style.transform = 'scale(1)';
});

// 頁面載入時直接使用 guestData
document.addEventListener('DOMContentLoaded', () => {
    console.log('成功載入資料，共', guestData.length, '筆');
}); 
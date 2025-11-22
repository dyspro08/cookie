// [오류 수정]
// DOM이 완전히 로드된 후에만 스크립트 전체를 실행하도록 수정
document.addEventListener("DOMContentLoaded", function() {

    // Firebase 인스턴스를 window 객체에서 가져옵니다 (HTML에서 초기화됨)
    const auth = window.firebaseAuth;
    const db = window.firebaseDb;
    const GoogleAuthProvider = window.GoogleAuthProvider;

    // 1. DOM 요소 가져오기
    const sugarCountEl = document.getElementById('sugar-count');
    const sugarPerTimeEl = document.getElementById('sugar-per-time');
    const cookieNameDisplayEl = document.getElementById('cookie-name-display');
    const costDisplayEl = document.getElementById('cost-display');
    const probabilityDisplayEl = document.getElementById('probability-display');
    const strengthenButton = document.getElementById('strengthen-button');
    const storeButton = document.getElementById('store-button');
    const protectionTicketCountEl = document.getElementById('protection-ticket-count');
    const protectionUseCountEl = document.getElementById('protection-use-count');
    const equippedCookieListEl = document.getElementById('equipped-cookie-list');
    const protectionToggleCheckbox = document.getElementById('protection-toggle-checkbox');
    const protectionToggleLabel = document.getElementById('protection-toggle-label');
    const strengthenPanel = document.getElementById('strengthen-panel');
    const gachaPanel = document.getElementById('gacha-panel');
    const strengthenModeButton = document.getElementById('strengthen-mode-button');
    const gachaModeButton = document.getElementById('gacha-mode-button');
    const starStrengthenButton = document.getElementById('star-strengthen-button');
    const gachaCostEl = document.getElementById('gacha-cost');
    const gachaPull1 = document.getElementById('gacha-pull-1');
    const gachaPull10 = document.getElementById('gacha-pull-10');
    const gachaResult = document.getElementById('gacha-result');
    const inventoryToggleButton = document.getElementById('inventory-toggle-button');
    const shopToggleButton = document.getElementById('shop-toggle-button');
    const rankingToggleButton = document.getElementById('ranking-toggle-button');
    const tradeToggleButton = document.getElementById('trade-toggle-button');
    const battleButton = document.getElementById('battle-button');
    const mainSidebar = document.getElementById('main-sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const closeSidebarButton = document.getElementById('close-sidebar-button');
    const equippedSlotsEl = document.getElementById('equipped-slots');
    const inventoryListEl = document.getElementById('inventory-list');
    const battleCookieListEl = document.getElementById('battle-cookie-list');
    const equippedCountEl = document.getElementById('equipped-count');
    const equippedWeaponDisplayEl = document.getElementById('equipped-weapon-display'); 
    const inventoryTabButton = document.getElementById('inventory-tab-button');
    const shopTabButton = document.getElementById('shop-tab-button');
    const rankingTabButton = document.getElementById('ranking-tab-button');
    const tradeTabButton = document.getElementById('trade-tab-button');
    const inventoryTabContent = document.getElementById('inventory-tab-content');
    const shopTabContent = document.getElementById('shop-tab-content');
    const rankingTabContent = document.getElementById('ranking-tab-content');
    const tradeTabContent = document.getElementById('trade-tab-content');
    const buyProtectionTicketButton = document.getElementById('buy-protection-ticket');
    const buyWarpTicketButton = document.getElementById('buy-warp-ticket');
    const mainGameUI = document.getElementById('main-game-ui');
    const battleUI = document.getElementById('battle-ui');
    const battleExitButton = document.getElementById('battle-exit-button');
    const battleWeaponNameEl = document.getElementById('battle-weapon-name');
    
    // [신규] 로그인 DOM
    const authSection = document.getElementById('auth-section');
    const userInfoEl = document.getElementById('user-info');
    const userNameEl = document.getElementById('user-name');
    const googleLoginButton = document.getElementById('google-login-button');
    const logoutButton = document.getElementById('logout-button');
    const rankingListEl = document.getElementById('ranking-list');


    // 2. 100개 쿠키 이름 배열 (이전과 동일)
    const cookieNames = [
        "바삭한 쿠키", "달콤한 쿠키", "고소한 쿠키", "촉촉한 쿠키", "향기로운 쿠키",
        "설탕 코팅 쿠키", "초코칩 쿠키", "더블 초코 쿠키", "딸기 향 쿠키", "바닐라 쿠키",
        "황금빛 쿠키", "버터 쿠키", "캐러멜 쿠키", "연성(소프트) 쿠키", "단단한 쿠키",
        "강화된 쿠키", "마법 쿠키", "푹신 쿠키", "불타는 쿠키", "얼어붙은 쿠키",
        "번개 쿠키", "폭풍 쿠키", "대리석 쿠키", "수정 쿠키", "루비 쿠키",
        "사파이어 쿠키", "에메랄드 쿠키", "다이아 쿠키", "빛나는 쿠키", "신성한 쿠키",
        "고대의 쿠키", "전설의 쿠키", "신비한 쿠키", "정령의 쿠키", "용암 쿠키",
        "얼음 정수 쿠키", "번개 정수 쿠키", "대지의 쿠키", "숲의 쿠키", "바다의 쿠키",
        "태양 쿠키", "달빛 쿠키", "별빛 쿠키", "은하 쿠키", "우주 쿠키",
        "초신성 쿠키", "블랙홀 쿠키", "차원 쿠키", "시간 쿠키", "운명 쿠키",
        "신화 쿠키", "천상의 쿠키", "영원의 쿠키", "심판의 쿠키", "축복의 쿠키",
        "기적의 쿠키", "파동 쿠키", "폭발 쿠키", "회오리 쿠키", "섀도우 쿠키",
        "환영 쿠키", "망령 쿠키", "영혼 쿠키", "꿈의 쿠키", "환상 쿠키",
        "초월 쿠키", "무한 쿠키", "절대 쿠키", "창조 쿠키", "파괴 쿠키",
        "빛의 쿠키", "어둠의 쿠키", "균형의 쿠키", "혼돈 쿠키", "질서의 쿠키",
        "지배자의 쿠키", "정복자의 쿠키", "군주의 쿠키", "황제의 쿠키", "신군의 쿠키",
        "초신 쿠키", "우주핵 쿠키", "암흑핵 쿠키", "생성핵 쿠키", "절대핵 쿠키",
        "영겁의 쿠키", "초지성 쿠키", "초감각 쿠키", "전능 쿠키", "초능력 쿠키",
        "궁극 쿠키", "무적 쿠키", "초궁극 쿠키", "신격 쿠키", "초신격 쿠키",
        "절대신 쿠키", "무한신 쿠키", "초월신 쿠키", "창세신 쿠키", "태초의 쿠키"
    ];

    // 3. 50배 쿠키 초당 설탕 획득량 배열 (이전과 동일)
    const cookieSugarPerSecond = [
        5.00, 5.60, 6.25, 7.00, 7.85, 8.80, 9.85, 11.05, 12.35, 13.85,
        15.50, 17.35, 19.45, 21.80, 24.40, 27.30, 30.55, 34.20, 38.30, 42.90,
        48.05, 53.80, 60.25, 67.45, 75.55, 84.60, 94.80, 106.20, 118.95, 133.25,
        149.25, 167.10, 187.20, 209.70, 234.90, 263.10, 294.75, 330.15, 369.75, 414.15,
        463.90, 520.55, 583.00, 653.15, 732.00, 819.85, 918.30, 1029.05, 1152.80, 1290.20,
        1445.00, 1618.40, 1811.65, 2026.15, 2264.30, 2525.70, 2817.80, 3153.15, 3530.85, 3959.10,
        4435.00, 4972.20, 5568.90, 6229.30, 6967.05, 7790.10, 8704.90, 9741.50, 10910.85, 12221.15,
        13678.55, 15321.00, 17159.65, 19207.90, 21481.85, 24027.40, 26850.70, 30004.80, 33605.35, 37638.00,
        42103.60, 47111.10, 52765.40, 59077.25, 66116.75, 74002.40, 82872.65, 92766.35, 103900.05, 116428.05,
        130389.45, 146050.00, 163550.00, 183200.00, 205200.00, 229850.00, 257450.00, 297200.00, 332900.00, 372867.25
    ];

    // 4. 게임 상태 변수
    let level = 0;
    let sugar = 1000;
    const MAX_EQUIPPED = 5;
    let inventory = []; 
    let equipped = []; 
    let playerProtectionTickets = 0;
    let currentCookieProtectionUses = 0;
    const MAX_PROTECTION_USES = 5;
    let equippedBattleCookie = null; 
    let battleCookieInventory = {};
    const gachaCost = 1000;
    gachaCostEl.textContent = gachaCost.toLocaleString();
    const gachaTable = [
        { name: "카오스 버스터 쿠키", odds: 1, grade: "mythic" },
        { name: "어비스 블레이드 쿠키", odds: 3, grade: "mythic" },
        { name: "카오틱 브레이커 쿠키", odds: 10, grade: "mythic" },
        { name: "파괴의 망치 쿠키", odds: 50, grade: "legendary" },
        { name: "블러디 레이지 쿠키", odds: 100, grade: "legendary" },
        { name: "섀도우 리퍼 쿠키", odds: 500, grade: "legendary" },
        { name: "드래곤 포스 쿠키", odds: 1000, grade: "epic" },
        { name: "서리베기 쿠키", odds: 5000, grade: "epic" },
        { name: "풍참 쿠키", odds: 10000, grade: "epic" },
        { name: "어둠베기 쿠키", odds: 50000, grade: "rare" },
        { name: "라이트닝 블레이드 쿠키", odds: 100000, grade: "rare" },
        { name: "플레임 스트라이크 쿠키", odds: 200000, grade: "rare" },
        { name: "스틸 스매셔 쿠키", odds: 500000, grade: "common" },
        { name: "브론즈 블레이드 쿠키", odds: 1000000, grade: "common" },
        { name: "아이언 쿠키", odds: 1500000, grade: "common" },
        { name: "스톤 쿠키", odds: 2000000, grade: "common" },
        { name: "대나무 쿠키", odds: 2500000, grade: "common" },
        { name: "흙 쿠키", odds: 10000000, grade: "common" },
    ];
    
    // [신규] Firebase 변수
    let currentUser = null;


    // 5. 이벤트 리스너 (DOM 로드 후 실행되므로 안전)
    strengthenButton.addEventListener('click', strengthenCookie);
    storeButton.addEventListener('click', storeCookie);
    equippedSlotsEl.addEventListener('click', handleEquippedClick);
    inventoryListEl.addEventListener('click', handleInventoryClick);
    battleCookieListEl.addEventListener('click', handleBattleCookieListClick); 
    buyProtectionTicketButton.addEventListener('click', buyProtectionTicket);
    buyWarpTicketButton.addEventListener('click', buyWarpTicket);
    inventoryToggleButton.addEventListener('click', () => openSidebar('inventory'));
    shopToggleButton.addEventListener('click', () => openSidebar('shop'));
    rankingToggleButton.addEventListener('click', () => openSidebar('ranking'));
    tradeToggleButton.addEventListener('click', () => openSidebar('trade'));
    closeSidebarButton.addEventListener('click', closeSidebar);
    sidebarOverlay.addEventListener('click', closeSidebar);
    inventoryTabButton.addEventListener('click', () => switchTab('inventory'));
    shopTabButton.addEventListener('click', () => switchTab('shop'));
    rankingTabButton.addEventListener('click', () => switchTab('ranking'));
    tradeTabButton.addEventListener('click', () => switchTab('trade'));
    battleButton.addEventListener('click', startBattle);
    starStrengthenButton.addEventListener('click', () => alert("전투에서 '스타 강화권'을 획득해야 합니다."));
    strengthenModeButton.addEventListener('click', () => switchCentralPanel('strengthen'));
    gachaModeButton.addEventListener('click', () => switchCentralPanel('gacha'));
    gachaPull1.addEventListener('click', () => doGachaPull(1));
    gachaPull10.addEventListener('click', () => doGachaPull(10));
    battleExitButton.addEventListener('click', exitBattle);
    
    // [신규] 로그인/로그아웃 리스너
    googleLoginButton.addEventListener('click', signInWithGoogle);
    logoutButton.addEventListener('click', signOut);


    // 6. [신규] Firebase 인증 함수
    auth.onAuthStateChanged(user => {
        if (user) {
            // 로그인 성공
            currentUser = user;
            userNameEl.textContent = user.displayName;
            userInfoEl.style.display = 'block';
            googleLoginButton.style.display = 'none';
        } else {
            // 로그아웃
            currentUser = null;
            userInfoEl.style.display = 'none';
            googleLoginButton.style.display = 'block';
        }
    });

    function signInWithGoogle() {
        auth.signInWithPopup(GoogleAuthProvider).catch(error => {
            console.error("Google 로그인 실패:", error);
        });
    }

    function signOut() {
        auth.signOut();
    }
    
    // 7. 핵심 강화 함수
    function strengthenCookie() {
        const useProtection = protectionToggleCheckbox.checked;
        if (useProtection) {
            if (playerProtectionTickets <= 0) {
                alert("실패 방지권이 없습니다.");
                protectionToggleCheckbox.checked = false;
                return;
            }
            if (currentCookieProtectionUses >= MAX_PROTECTION_USES) {
                alert("이 쿠키에는 더 이상 방지권을 사용할 수 없습니다.");
                protectionToggleCheckbox.checked = false;
                return;
            }
        }
        const currentCost = getCost(level);
        if (sugar < currentCost) {
            alert("설탕이 부족합니다!");
            return;
        }
        sugar -= currentCost;
        if (useProtection) {
            playerProtectionTickets--; 
        }
        const random = Math.random() * 100;
        const currentProbability = getProbability(level);
        if (random < currentProbability) {
            level++;
        } else {
            if (useProtection) {
                currentCookieProtectionUses++;
                alert(`강화 실패! 방지권이 쿠키를 보호했습니다. (남은 보호 횟수: ${MAX_PROTECTION_USES - currentCookieProtectionUses}회)`);
            } else {
                alert(`강화 실패... 쿠키가 부서졌습니다! (+${level} -> +0)`);
                level = 0;
                currentCookieProtectionUses = 0;
            }
        }
        protectionToggleCheckbox.checked = false;
        updateDisplay();
    }

    // [수정] storeCookie (랭킹 업데이트)
    async function storeCookie() {
        if (level === 0) return; 

        const newCookie = {
            level: level,
            name: getCookieName(level),
            sugarPerTime: getSugarPerTime(level)
        };
        inventory.push(newCookie);
        
        // [신규] 로그인한 경우 랭킹 업데이트
        if (currentUser) {
            await updateUserRanking(currentUser, level);
        }

        level = 0;
        currentCookieProtectionUses = 0;
        updateDisplay();
    }

    // [신규] 랭킹 업데이트 함수
    async function updateUserRanking(user, newLevel) {
        if (!user) return;
        
        const userRef = db.collection('rankings').doc(user.uid);
        try {
            const userDoc = await userRef.get();
            const currentBest = userDoc.exists ? userDoc.data().highestLevel : 0;
            
            if (newLevel > currentBest) {
                await userRef.set({
                    displayName: user.displayName,
                    photoURL: user.photoURL,
                    highestLevel: newLevel
                }, { merge: true });
                // console.log("랭킹 업데이트 성공:", newLevel);
            }
        } catch (e) {
            console.error("랭킹 업데이트 실패:", e);
        }
    }


    function startBattle() {
        if (equippedBattleCookie) {
            battleWeaponNameEl.textContent = equippedBattleCookie;
            mainGameUI.style.display = 'none';
            closeSidebar();
            battleUI.style.display = 'flex';
        } else {
            alert("전투에 입장하려면 먼저 '뽑기'에서 쿠키를 뽑아 '무기'로 장착해야 합니다.");
        }
    }

    function exitBattle() {
        battleUI.style.display = 'none';
        mainGameUI.style.display = 'flex';
        updateDisplay();
    }

    // 8. 사이드바/중앙패널 함수 (직접 스타일 제어)
    function openSidebar(tabName) {
        mainSidebar.style.transform = 'translateX(0)';
        sidebarOverlay.style.opacity = '1';
        sidebarOverlay.style.visibility = 'visible';
        switchTab(tabName);
    }

    function closeSidebar() {
        mainSidebar.style.transform = 'translateX(100%)';
        sidebarOverlay.style.opacity = '0';
        sidebarOverlay.style.visibility = 'hidden';
    }

    // [수정] 4탭 전환 함수 (랭킹 로드 추가)
    async function switchTab(tabName) {
        inventoryTabContent.style.display = 'none';
        shopTabContent.style.display = 'none';
        rankingTabContent.style.display = 'none';
        tradeTabContent.style.display = 'none';
        inventoryTabButton.classList.remove('active');
        shopTabButton.classList.remove('active');
        rankingTabButton.classList.remove('active');
        tradeTabButton.classList.remove('active');

        if (tabName === 'inventory') {
            inventoryTabContent.style.display = 'block';
            inventoryTabButton.classList.add('active');
            updateInventoryDisplay(); 
        } else if (tabName === 'shop') {
            shopTabContent.style.display = 'block';
            shopTabButton.classList.add('active');
        } else if (tabName === 'ranking') {
            rankingTabContent.style.display = 'block';
            rankingTabButton.classList.add('active');
            await loadRanking(); // [신규] 랭킹 로드
        } else if (tabName === 'trade') {
            tradeTabContent.style.display = 'block';
            tradeTabButton.classList.add('active');
        }
    }
    
    // [신규] 랭킹 로드 함수
    async function loadRanking() {
        rankingListEl.innerHTML = '<li>로딩 중...</li>';
        try {
            const q = db.collection('rankings')
                        .orderBy('highestLevel', 'desc')
                        .limit(20);
            const querySnapshot = await q.get();
            
            rankingListEl.innerHTML = ''; // 목록 비우기
            if (querySnapshot.empty) {
                rankingListEl.innerHTML = '<li>아직 랭킹이 없습니다.</li>';
                return;
            }

            let rank = 1;
            querySnapshot.forEach(doc => {
                const data = doc.data();
                const li = document.createElement('li');
                li.innerHTML = `${rank}. ${data.displayName} <span>+${data.highestLevel}</span>`;
                rankingListEl.appendChild(li);
                rank++;
            });
        } catch (e) {
            console.error("랭킹 로드 실패:", e);
            rankingListEl.innerHTML = '<li>랭킹을 불러오는 데 실패했습니다.</li>';
        }
    }


    function switchCentralPanel(mode) {
        strengthenPanel.style.display = 'none';
        gachaPanel.style.display = 'none';
        strengthenModeButton.classList.remove('active');
        gachaModeButton.classList.remove('active');
        starStrengthenButton.classList.remove('active');

        if (mode === 'strengthen') {
            strengthenPanel.style.display = 'block';
            strengthenModeButton.classList.add('active');
        } else if (mode === 'gacha') {
            gachaPanel.style.display = 'block';
            gachaModeButton.classList.add('active');
        }
    }

    // 9. 인벤토리 UI 및 로직
    function updateInventoryDisplay() {
        // 1. 장착 슬롯
        equippedSlotsEl.innerHTML = ''; 
        equippedCountEl.textContent = equipped.length;
        equipped.forEach((cookie, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'inventory-item';
            itemEl.innerHTML = `
                <span>+${cookie.level} ${cookie.name} (초당 +${cookie.sugarPerTime.toFixed(3)})</span>
                <button class="unequip-button" data-index="${index}">장착 해제</button>
            `;
            equippedSlotsEl.appendChild(itemEl);
        });

        // 2. 강화 쿠키 보관함
        inventoryListEl.innerHTML = ''; 
        if (inventory.length === 0) {
            inventoryListEl.innerHTML = '<p style="text-align:center; color:#888;">보관함이 비었습니다.</p>';
        }
        inventory.forEach((cookie, index) => {
            const itemEl = document.createElement('div');
            itemEl.className = 'inventory-item';
            itemEl.innerHTML = `
                <span>+${cookie.level} ${cookie.name} (초당 +${cookie.sugarPerTime.toFixed(3)})</span>
                <div>
                    <button class="equip-button" data-index="${index}">장착</button>
                    <button class="load-button" data-index="${index}">불러오기</button>
                </div>
            `;
            inventoryListEl.appendChild(itemEl);
        });
        
        // 3. 전투 쿠키 보관함
        battleCookieListEl.innerHTML = '';
        const battleCookies = Object.keys(battleCookieInventory);
        if (battleCookies.length === 0) {
            battleCookieListEl.innerHTML = '<p style="text-align:center; color:#888;">뽑기에서 전투 쿠키를 획득하세요.</p>';
        }
        battleCookies.sort().forEach(cookieName => {
            const itemEl = document.createElement('div');
            itemEl.className = 'inventory-item';
            itemEl.innerHTML = `
                <span>${cookieName} (보유: ${battleCookieInventory[cookieName]})</span>
                <button class="equip-battle-cookie-button" data-name="${cookieName}">장착</button>
            `;
            battleCookieListEl.appendChild(itemEl);
        });
    }

    function handleInventoryClick(event) {
        if (event.target.classList.contains('equip-button')) {
            if (equipped.length >= MAX_EQUIPPED) {
                alert("장착 슬롯이 꽉 찼습니다! (최대 5개)");
                return;
            }
            const index = parseInt(event.target.dataset.index);
            const cookieToEquip = inventory.splice(index, 1)[0]; 
            equipped.push(cookieToEquip); 
            updateInventoryDisplay();
            updateSugarPerTime();
            updateEquippedList(); 
        }
        else if (event.target.classList.contains('load-button')) {
            if (level !== 0) {
                alert(`강화 중인 쿠키(+${level})를 먼저 저장하거나 실패해야 합니다.`);
                return;
            }
            const index = parseInt(event.target.dataset.index);
            const cookieToLoad = inventory.splice(index, 1)[0]; 
            level = cookieToLoad.level; 
            currentCookieProtectionUses = 0;
            updateDisplay(); 
            updateInventoryDisplay(); 
            closeSidebar(); 
        }
    }

    function handleEquippedClick(event) {
        if (event.target.classList.contains('unequip-button')) {
            const index = parseInt(event.target.dataset.index);
            const cookieToUnequip = equipped.splice(index, 1)[0]; 
            inventory.push(cookieToUnequip); 
            updateInventoryDisplay();
            updateSugarPerTime();
            updateEquippedList(); 
        }
    }

    function handleBattleCookieListClick(event) {
        if (event.target.classList.contains('equip-battle-cookie-button')) {
            const cookieName = event.target.dataset.name;
            equippedBattleCookie = cookieName;
            updateDisplay();
            alert(`'${cookieName}'(을)를 무기로 장착했습니다.`);
            closeSidebar();
        }
    }

    function updateEquippedList() {
        equippedCookieListEl.innerHTML = '';
        for (let i = 0; i < MAX_EQUIPPED; i++) {
            const li = document.createElement('li');
            if (equipped[i]) {
                li.textContent = `+${equipped[i].level} ${equipped[i].name}`;
            } else {
                li.textContent = `(비어있음)`;
                li.style.color = '#999';
            }
            equippedCookieListEl.appendChild(li);
        }
    }

    function buyProtectionTicket() {
        const price = 100000;
        if (sugar >= price) {
            sugar -= price;
            playerProtectionTickets++;
            updateDisplay();
            alert("실패 방지권 1개를 구매했습니다.");
        } else {
            alert("설탕이 부족합니다.");
        }
    }

    function buyWarpTicket() {
        const price = 10000;
        if (level >= 10) {
            alert("이미 +10 이상입니다.");
            return;
        }
        if (level === 0) {
            alert("먼저 +1 강화라도 성공해야 합니다.");
            return;
        }
        if (sugar >= price) {
            sugar -= price;
            level = 10;
            currentCookieProtectionUses = 0;
            updateDisplay();
            alert("+10 강화에 성공했습니다!");
        } else {
            alert("설탕이 부족합니다.");
        }
    }

    // 10. 뽑기 함수
    function doGachaPull(pullCount) {
        const totalCost = gachaCost * pullCount;
        if (sugar < totalCost) {
            alert("설탕이 부족합니다.");
            return;
        }
        
        sugar -= totalCost;
        gachaResult.innerHTML = '';
        let results = [];

        for (let i = 0; i < pullCount; i++) {
            const roll = Math.floor(Math.random() * 10000000) + 1;
            let drawnCookie = "흙 쿠키";
            let drawnGrade = "common";
            
            for (const item of gachaTable) {
                if (roll <= item.odds) {
                    drawnCookie = item.name;
                    drawnGrade = item.grade;
                    break;
                }
            }
            
            results.push({ name: drawnCookie, grade: drawnGrade });
            
            if (battleCookieInventory[drawnCookie]) {
                battleCookieInventory[drawnCookie]++;
            } else {
                battleCookieInventory[drawnCookie] = 1;
            }
        }
        
        results.forEach(item => {
            const p = document.createElement('p');
            p.textContent = `[${item.name}] 획득!`;
            p.className = `gacha-result-item grade-${item.grade}`;
            gachaResult.appendChild(p);
        });
        
        updateDisplay();
        updateInventoryDisplay();
    }

    // 11. 자동 설탕 획득
    function updateSugarPerTime() {
        let totalSugarPerSecond = 0;
        equipped.forEach(cookie => {
            totalSugarPerSecond += cookie.sugarPerTime;
        });
        sugarPerTimeEl.textContent = totalSugarPerSecond.toFixed(3);
    }
    setInterval(() => {
        let totalGeneration = 0;
        equipped.forEach(cookie => {
            totalGeneration += cookie.sugarPerTime;
        });
        if (totalGeneration > 0) {
            sugar += totalGeneration;
            sugarCountEl.textContent = Math.floor(sugar); 
        }
    }, 1000); 

    // 12. 보조 함수 (스타일 제어)
    function updateDisplay() {
        // 왼쪽 패널
        sugarCountEl.textContent = Math.floor(sugar);
        protectionTicketCountEl.textContent = playerProtectionTickets;
        if (equippedBattleCookie) {
            equippedWeaponDisplayEl.textContent = equippedBattleCookie;
            equippedWeaponDisplayEl.style.color = '#dc3545';
        } else {
            equippedWeaponDisplayEl.textContent = "(없음)";
            equippedWeaponDisplayEl.style.color = '#999';
        }

        // 중앙 패널
        costDisplayEl.textContent = getCost(level);
        probabilityDisplayEl.textContent = getProbability(level).toFixed(1);
        protectionUseCountEl.textContent = `${currentCookieProtectionUses}/${MAX_PROTECTION_USES}`;
        if (level === 0) {
            cookieNameDisplayEl.textContent = getCookieName(level);
        } else {
            cookieNameDisplayEl.textContent = `+${level} ${getCookieName(level)}`;
        }

        if (level > 0) {
            storeButton.style.display = 'block';
            protectionToggleLabel.style.display = 'block';
            protectionToggleLabel.textContent = `방지권 (${playerProtectionTickets})`;
            
            if (playerProtectionTickets <= 0 || currentCookieProtectionUses >= MAX_PROTECTION_USES) {
                protectionToggleCheckbox.disabled = true;
            } else {
                protectionToggleCheckbox.disabled = false;
            }
        } else {
            storeButton.style.display = 'none';
            protectionToggleLabel.style.display = 'none';
            protectionToggleCheckbox.checked = false;
            protectionToggleCheckbox.disabled = true;
        }
    }
    
    function getCost(currentLevel) {
        const baseCost = 10;
        return baseCost + Math.floor(Math.pow(currentLevel, 1.5) * 5);
    }
    function getProbability(currentLevel) {
        const baseProbability = 100;
        const probability = baseProbability - currentLevel * 1;
        return Math.max(probability, 1.0);
    }
    function getCookieName(currentLevel) {
        if (currentLevel === 0) return "기본 쿠키";
        if (currentLevel > 0 && currentLevel <= cookieNames.length) {
            return cookieNames[currentLevel - 1];
        }
        return `${cookieNames[cookieNames.length - 1]}`;
    }
    function getSugarPerTime(currentLevel) {
        if (currentLevel <= 0) return 0;
        if (currentLevel > cookieSugarPerSecond.length) {
            return cookieSugarPerSecond[cookieSugarPerSecond.length - 1];
        }
        return cookieSugarPerSecond[currentLevel - 1];
    }

    // 13. 초기 실행
    updateDisplay();
    updateSugarPerTime();
    updateEquippedList();
    switchCentralPanel('strengthen');
    battleUI.style.display = 'none';
    
}); // [오류 수정] DOMContentLoaded 래퍼 종료
```

---

### **[중요] 다음 2가지를 꼭 확인하세요!**

1.  **Firebase 콘솔 설정 (필수):**
    * Firebase 프로젝트(`cookie-bg`)로 이동하세요.
    * **Authentication (인증):** 'Sign-in method' 탭에서 **'Google'**을 **'사용 설정'** 하세요.
    * **Firestore Database (Cloud Firestore):** 데이터베이스를 **'프로덕션 모드'**로 만드세요.
    * **Firestore '규칙' (Rules) 탭:** 랭킹이 작동하려면 다음 규칙을 붙여넣고 **'게시'**하세요. (기본 규칙은 모든 읽기/쓰기를 차단합니다.)

    ```
    rules_version = '2';
    service cloud.firestore {
      match /databases/{database}/documents {
        // 'rankings' 컬렉션은 누구나 읽을 수 있게 허용
        match /rankings/{userId} {
          allow read: if true;
          // 쓰기(업데이트)는 본인만 가능하게 허용
          allow write: if request.auth != null && request.auth.uid == userId;
        }
      }
    }

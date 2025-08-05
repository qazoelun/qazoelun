
const tierConfig = {
    'ht1': { color: 'bg-gold/20 text-gold font-bold tier-ht1', text: 'HT1' },
    'lt1': { color: 'bg-gold/20 text-gold font-bold', text: 'LT1' },
    'ht2': { color: 'bg-silver/20 text-silver font-bold', text: 'HT2' },
    'lt2': { color: 'bg-silver/20 text-silver font-bold', text: 'LT2' },
    'ht3': { color: 'bg-bronze/20 text-bronze font-bold', text: 'HT3' },
    'lt3': { color: 'bg-bronze/20 text-bronze font-bold', text: 'LT3' },
    'ht4': { color: 'bg-gray-500/20 text-gray-400 font-bold', text: 'HT4' },
    'lt4': { color: 'bg-gray-500/20 text-gray-400 font-bold', text: 'LT4' },
    'ht5': { color: 'bg-gray-700/20 text-gray-500 font-bold', text: 'HT5' },
    'lt5': { color: 'bg-gray-700/20 text-gray-500 font-bold', text: 'LT5' }
};

const regionConfig = {
    'nc': { fullName: '华北', color: 'bg-green-500/20 text-green-400' },
    'ec': { fullName: '华东', color: 'bg-green-500/20 text-green-400' },
    'sc': { fullName: '华南', color: 'bg-green-500/20 text-green-400' },
    'ws': { fullName: '西南', color: 'bg-green-500/20 text-green-400' },
    'wn': { fullName: '西北', color: 'bg-green-500/20 text-green-400' },
    'en': { fullName: '东北', color: 'bg-green-500/20 text-green-400' }
};


let currentRegion = 'all';
let currentPage = 1;
let searchQuery = '';
const itemsPerPage = 10;


const rankingTable = document.getElementById('rankingTable');
const paginationButtons = document.querySelectorAll('.pagination-btn');
const refreshButton = document.getElementById('refreshBtn');
const themeToggle = document.getElementById('themeToggle');
const playerSearch = document.getElementById('playerSearch');
const playerSearchInline = document.getElementById('playerSearchInline');
const regionFilter = document.getElementById('regionFilter');


document.addEventListener('DOMContentLoaded', function() {
    renderTable();
    attachEventListeners();
});

function attachEventListeners() {

    regionFilter.addEventListener('change', function() {
        currentRegion = this.value;
        currentPage = 1;
        renderTable();
    });

    
    playerSearch.addEventListener('input', handleSearch);
    playerSearchInline.addEventListener('input', handleSearch);


    paginationButtons.forEach(button => {
        button.addEventListener('click', function() {
            const page = this.dataset.page;
            
            if (page === 'prev' && currentPage > 1) {
                currentPage--;
            } else if (page === 'next') {
                const filtered = getFilteredPlayers();
                const totalPages = Math.ceil(filtered.length / itemsPerPage);
                if (currentPage < totalPages) {
                    currentPage++;
                }
            } else if (!isNaN(page)) {
                currentPage = parseInt(page);
            }
            
            updatePagination();
            renderTable();
        });
    });

    refreshButton.addEventListener('click', function() {
        this.classList.add('animate-spin');
        setTimeout(() => {
            renderTable();
            this.classList.remove('animate-spin');
            showMessage('排行榜已更新');
        }, 800);
    });

    themeToggle.addEventListener('click', function() {
        const icon = this.querySelector('i');
        if (icon.classList.contains('fa-moon-o')) {
            icon.classList.remove('fa-moon-o');
            icon.classList.add('fa-sun-o');
            document.body.classList.add('bg-gray-950');
            document.body.classList.remove('bg-dark-blue');
            showMessage('已切换至超深色主题');
        } else {
            icon.classList.remove('fa-sun-o');
            icon.classList.add('fa-moon-o');
            document.body.classList.remove('bg-gray-950');
            document.body.classList.add('bg-dark-blue');
            showMessage('已切换至深色主题');
        }
    });
}

function handleSearch(e) {
    if (e.target.id === 'playerSearch') {
        playerSearchInline.value = e.target.value;
    } else {
        playerSearch.value = e.target.value;
    }
    
    searchQuery = e.target.value.trim().toLowerCase();
    currentPage = 1;
    renderTable();
}

function getFilteredPlayers() {
    let result = [...players];
    
    if (currentRegion !== 'all') {
        result = result.filter(p => p.region === currentRegion);
    }
    
    if (searchQuery) {
        result = result.filter(p => p.name.toLowerCase().includes(searchQuery));
    }
    
    result.sort((a, b) => {
        const tierOrder = {
            'ht1': 10, 'lt1': 9, 'ht2': 8, 'lt2': 7,
            'ht3': 6, 'lt3': 5, 'ht4': 4, 'lt4': 3,
            'ht5': 2, 'lt5': 1
        };
        
        const tierDiff = tierOrder[b.tier] - tierOrder[a.tier];
        return tierDiff !== 0 ? tierDiff : a.ping - b.ping;
    });
    
    return result;
}

function loadAvatar(img, uuid, container) {
    const loader = document.createElement('div');
    loader.className = 'avatar-loading';
    loader.innerHTML = '<div class="spinner"></div>';
    container.appendChild(loader);
    
    const cleanUuid = uuid.replace(/-/g, '');
    const urls = [
        `https://crafatar.com/renders/body/${cleanUuid}?overlay&scale=6`,
        `https://mc-heads.net/body/${cleanUuid}/100`,
        `https://crafatar.com/renders/body/Steve?overlay&scale=6`
    ];
    
    let currentUrlIndex = 0;
    
    function tryNextUrl() {
        if (currentUrlIndex >= urls.length) {
            showMessage(`玩家UUID可能无效: ${uuid}`, 'warning');
            loader.remove();
            return;
        }
        
        img.src = urls[currentUrlIndex];
        currentUrlIndex++;
    }
    
    img.onload = function() {
        if (this.width <= 1 && this.height <= 1) {
            tryNextUrl();
        } else {
            loader.remove();
        }
    };
    
    img.onerror = tryNextUrl;
    
    tryNextUrl();
}

function renderTable() {
    const filtered = getFilteredPlayers();
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const pageItems = filtered.slice(startIndex, startIndex + itemsPerPage);
    
    rankingTable.innerHTML = '';
    
    if (pageItems.length === 0) {
        const emptyRow = document.createElement('tr');
        emptyRow.innerHTML = `
            <td colspan="5" class="px-4 py-6 text-center text-gray-400 text-xs">
                <i class="fa fa-search-minus mr-1"></i>未找到匹配的玩家数据
            </td>
        `;
        rankingTable.appendChild(emptyRow);
        return;
    }
    
    pageItems.forEach((player, index) => {
        const rank = startIndex + index + 1;
        const region = regionConfig[player.region];
        const tier = tierConfig[player.tier];
        const row = document.createElement('tr');
        
        let rankClass = 'w-8 h-8 bg-medium-gray font-bold text-white';
        let rankIcon = '';
        
        if (rank === 1) {
            rankClass = 'w-8 h-8 rank-1 font-bold text-dark-blue relative';
            rankIcon = '<i class="fa fa-crown rank-icon text-xs"></i>';
        } else if (rank === 2) {
            rankClass = 'w-8 h-8 rank-2 font-bold text-dark-blue relative';
            rankIcon = '<i class="fa fa-star rank-icon text-xs"></i>';
        } else if (rank === 3) {
            rankClass = 'w-8 h-8 rank-3 font-bold text-white relative';
            rankIcon = '<i class="fa fa-shield rank-icon text-xs"></i>';
        }
        
        row.className = 'border-b border-medium-gray hover:bg-medium-gray/30 transition-colors';
        row.innerHTML = `
            <td class="px-4 py-2">
                <div class="flex items-center">
                    <span class="flex items-center justify-center rounded-full ${rankClass}">
                        ${rank}
                        ${rankIcon}
                    </span>
                </div>
            </td>
            <td class="px-4 py-2">
                <div class="flex items-center">
                    <div class="avatar-3d-container breathing border-2 border-accent-blue/30 mr-2" id="avatar-container-${player.id}">
                        <div class="avatar-cropper">
                            <img id="avatar-${player.id}" alt="${player.name}的3D半身像" class="w-full h-auto object-contain">
                        </div>
                    </div>
                    <span class="player-name">${player.name}</span>
                </div>
            </td>
            <td class="px-4 py-2">
                <span class="px-1.5 py-0.5 rounded-full text-[10px] ${region.color}">${region.fullName}</span>
            </td>
            <td class="px-4 py-2">
                <span class="px-1.5 py-0.5 rounded-full text-[10px] ${tier.color}">${tier.text}</span>
            </td>
            <td class="px-4 py-2">
                <span class="flex items-center ${player.ping > 100 ? 'text-red-400' : player.ping > 60 ? 'text-yellow-400' : 'text-green-400'} text-xs">
                    <i class="fa fa-signal mr-1 text-[10px]"></i>${player.ping}ms
                </span>
            </td>
        `;
        
        rankingTable.appendChild(row);

        const img = document.getElementById(`avatar-${player.id}`);
        const container = document.getElementById(`avatar-container-${player.id}`);
        loadAvatar(img, player.uuid, container);
    });
    
    updatePagination();
}

function updatePagination() {
    const filtered = getFilteredPlayers();
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    
    paginationButtons.forEach(button => {
        const page = button.dataset.page;
        
        if (page === 'prev') {
            button.disabled = currentPage === 1;
        } else if (page === 'next') {
            button.disabled = currentPage === totalPages || totalPages === 0;
        } else {
            const pageNum = parseInt(page);
            if (pageNum === currentPage) {
                button.classList.add('bg-accent-blue');
                button.classList.remove('bg-dark-gray');
            } else {
                button.classList.remove('bg-accent-blue');
                button.classList.add('bg-dark-gray');
            }
            
            button.style.display = pageNum > totalPages ? 'none' : 'inline-block';
        }
    });
}

function showMessage(msg, type = 'info') {
    const notification = document.createElement('div');
    let bgClass = 'bg-dark-gray';
    let icon = 'fa-info-circle';
    
    if (type === 'warning') {
        bgClass = 'bg-yellow-900/80';
        icon = 'fa-exclamation-triangle';
    } else if (type === 'error') {
        bgClass = 'bg-red-900/80';
        icon = 'fa-exclamation-circle';
    }
    
    notification.className = `fixed bottom-3 right-3 ${bgClass} text-white px-3 py-1.5 rounded-lg shadow-lg transform translate-y-10 opacity-0 transition-all duration-300 z-50 text-xs`;
    notification.innerHTML = `<i class="fa ${icon} mr-1 text-[10px]"></i>${msg}`;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.remove('translate-y-10', 'opacity-0');
    }, 10);
    
    setTimeout(() => {
        notification.classList.add('translate-y-10', 'opacity-0');
        setTimeout(() => document.body.removeChild(notification), 300);
    }, 3000);
}
    

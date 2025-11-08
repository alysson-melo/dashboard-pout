const bottomSheet = document.getElementById('bottomSheet');
const dragHandle = document.getElementById('dragHandle');

let startY = 0;
let isDragging = false;
let isExpanded = false;

// Toggle ao clicar
dragHandle.addEventListener('click', (e) => {
    if (!isDragging) {
        toggleSheet();
    }
});

function toggleSheet() {
    isExpanded = !isExpanded;
    if (isExpanded) {
        bottomSheet.classList.add('expanded');
    } else {
        bottomSheet.classList.remove('expanded');
    }
}

// Arrastar
dragHandle.addEventListener('touchstart', handleDragStart, { passive: true });
dragHandle.addEventListener('mousedown', handleDragStart);

function handleDragStart(e) {
    startY = e.type === 'touchstart' ? e.touches[0].clientY : e.clientY;
    isDragging = true;
}

document.addEventListener('touchmove', handleDragMove, { passive: true });
document.addEventListener('mousemove', handleDragMove);

function handleDragMove(e) {
    if (!isDragging) return;
}

document.addEventListener('touchend', handleDragEnd);
document.addEventListener('mouseup', handleDragEnd);

function handleDragEnd(e) {
    if (!isDragging) return;

    const endY = e.type === 'touchend' ? e.changedTouches[0].clientY : e.clientY;
    const diff = startY - endY;

    // Se arrastou mais de 30px
    if (Math.abs(diff) > 30) {
        if (diff > 0) {
            // Arrastou para cima - expandir
            isExpanded = true;
            bottomSheet.classList.add('expanded');
        } else {
            // Arrastou para baixo - colapsar
            isExpanded = false;
            bottomSheet.classList.remove('expanded');
        }
    }

    isDragging = false;
}
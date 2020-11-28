let $swipeMenu = document.querySelector('.js-swipe-menu');
let $overlay = document.querySelector('.js-overlay');
let $button = document.querySelector('.js-swipe-menu-show');

let menuWidth = $swipeMenu.clientWidth;
let menuLastX = -menuWidth;
let menuDragZoneWidth = 300;

let dragMenu = false;

let mouseDownX = 0;
let moveDistance = -menuWidth;

//check for pressing LMB on the left screeb area and start swipe
window.addEventListener('mousedown', function(e) 
{ 
    if(e.clientX <= menuDragZoneWidth)
    {
        swipeMenuDragStart(e); 
    }
})

//checkk for mouse up and finish swipe
window.addEventListener('mouseup', swipeMenuDragFinish)

//handle swipe
window.addEventListener('mousemove', function(e)
{
    if(dragMenu)
    {
        swipeMenuDrag(e);
    }
})

//check for swipe attempt on a menu
$swipeMenu.addEventListener('mousedown', function(e) { swipeMenuDragStart(e); })

//check for pressing LMB on overlay
$overlay.addEventListener('mousedown', swipeMenuClose)

//handle button
$button.addEventListener('click', swipeMenuOpen)

function swipeMenuDragStart(e)
{
    e.preventDefault();
    mouseDownX = e.clientX;
    dragMenu = true;
}

function swipeMenuDrag(e)
{
    moveDistance = Math.max(Math.min(e.clientX - mouseDownX + menuLastX, 0), -menuWidth);
    $swipeMenu.style.cssText = 'transform: translate(' + moveDistance + 'px, 0px)';
    if(moveDistance > -menuWidth)
    {
        let opacity = Math.min((moveDistance + menuWidth) / menuWidth, 1);
        $overlay.style.cssText = 'visibility: visible; opacity:' + opacity + '';
    }
    else
    {
        $overlay.style.cssText = 'visibility: hidden';
    }
}

function swipeMenuDragFinish()
{
    dragMenu = false;

    if(moveDistance + menuWidth > menuWidth/2)
    {
        swipeMenuOpen();
    }
    else
    {
        swipeMenuClose();
    }
}

//open menu trough program
function swipeMenuOpen()
{
    $swipeMenu.classList.add('active');
    $swipeMenu.style.cssText = 'transition: transform .15s linear';
    $overlay.classList.add('active');
    $overlay.style.cssText = 'transition: opacity .1s linear';
    moveDistance = 0;
    menuLastX = moveDistance;
}

//close menu trough program
function swipeMenuClose()
{
    $swipeMenu.classList.remove('active');
    $swipeMenu.style.cssText = 'transition: transform 0.15s linear';
    $overlay.classList.remove('active');
    $overlay.style.cssText = 'transition: opacity .15s linear, visibility .2s linear';
    moveDistance = -menuWidth;
    menuLastX = moveDistance;
}
const startCont = document.querySelector('.start')
const x = document.querySelector('.x')
const o = document.querySelector('.o')
const gameCont = document.querySelector('.game')
let huPlayer
let jsPlayer
let step = 0
let winnerLetter

const gameTitle = document.querySelector('.game-title')
const items = document.querySelectorAll('.item')
let stop = false

const bestIndToMove = [0, 2, 4, 6, 8]
let randomIndex
let randomWalk
const countLetterArr = [null, null, null, null, null, null, null, null, null]

const resultBlok = document.querySelector('.result')
const resultTitle = document.querySelector('.result-title')
const cancel = document.querySelector('.cancel')
const tryAgain = document.querySelector('.try-again')

startCont.addEventListener('click', selectLetter)

function selectLetter(event) {
    if (event.target.classList.contains('x')) {
        huPlayer = 'X'
        jsPlayer = 'O'
        startGame()
        whoStarts(huPlayer)
    } else {
        huPlayer = 'O'
        jsPlayer = 'X'
        startGame()
        whoStarts(huPlayer)
    }
}

function startGame() {
    startCont.classList.remove('slowlyShow')
    startCont.classList.add('slowlyHide')
    setTimeout(() => {
        startCont.classList.add('hide')
    }, 300)
    gameCont.classList.add('slowlyShow')
    setTimeout(() => {
        gameCont.classList.remove('hide')
    }, 600)
}

function finishGame() {
    gameCont.classList.remove('slowlyShow')
    gameCont.classList.add('slowlyHide')
    setTimeout(() => {
        gameCont.classList.add('hide')
    }, 300)
        startCont.classList.remove('slowlyHide')
        startCont.classList.add('slowlyShow')
    setTimeout(() => {
        startCont.classList.remove('hide')
    }, 600)
}

function whoStarts(huPlayer) {
    if (huPlayer === 'X') {
        // i starts
        // steps = [0, 2, 4, 6]
    } else if (huPlayer === 'O') {
        jsBotWalks()
    }
}

whoStarts()

gameCont.addEventListener('click', catchClickAndAddLetter)

function catchClickAndAddLetter(event) {
    if (stop === true) {
        showResult(stop)
        return
    }

    let index = event.target.dataset.index
    // console.log('index', index);
    if (event.target.textContent === '') {
        event.target.innerText = huPlayer
        countLetterArr[index] = huPlayer
        step++
        countSteps(step)
        whoWalks(step)
    } else {
        return
    }

    checkWin()

    if (stop === true) {
        showResult(stop)
        return
    }

    jsBotWalks()

    checkWin()
}

function whoWalks(step) {
    if (step === 0 || step % 2 === 0) {
        gameTitle.innerText = `Move now: X`
    } else {
        gameTitle.innerText = `Move now: O`
    }
}

whoWalks(step)

function concat(a, b, c) {
    let result = countLetterArr[a] + countLetterArr[b] + countLetterArr[c]

    if (result === 'XXX' || result === 'OOO') {
        return result
    }

    switch (result) {
        case 'XXnull':
            return ['X', c]
        case 'XnullX':
            return ['X', b]
        case 'nullXX':
            return ['X', a]

        case 'OOnull':
            return ['O', c]
        case 'OnullO':
            return ['O', b]
        case 'nullOO':
            return ['O', a]
    }
}

function changeColorLettersAndStop(a, b, c) {
    items[a].style.color = 'red'
    items[b].style.color = 'red'
    items[c].style.color = 'red'

    stop = true
    winnerLetter = items[a].textContent
    // console.log('items[b]', items[b]);
    showResult(stop)
}

function checkWin() {
    for (let i = 0; i < 3; i++) {
        let result = concat(i, i + 3, i + 6)
        if (result === 'XXX' || result === 'OOO') {
            changeColorLettersAndStop(i, i + 3, i + 6)
        }
    }

    for (let i = 0; i <= 6; i += 3) {
        let result = concat(i, i + 1, i + 2)
        if (result === 'XXX' || result === 'OOO') {
            changeColorLettersAndStop(i, i + 1, i + 2)
        }
    }

    result = concat(0, 4, 8)
    if (result === 'XXX' || result === 'OOO') {
        changeColorLettersAndStop(0, 4, 8)
    }

    result = concat(2, 4, 6)
    if (result === 'XXX' || result === 'OOO') {
        changeColorLettersAndStop(2, 4, 6)
    }
}

function jsBotWalks() {
    step++
    countSteps(step)
    for (let i = 0; i < 3; i++) {
        let result = concat(i, i + 3, i + 6)
        if (typeof(result) === 'object' && result[0] === jsPlayer) {
            items[result[1]].innerHTML = jsPlayer
            countLetterArr[result[1]] = jsPlayer
            return
        }
    }

    for (let i = 0; i <= 6; i += 3) {
        let result = concat(i, i + 1, i + 2)
        if (typeof(result) === 'object' && result[0] === jsPlayer) {
            items[result[1]].innerHTML = jsPlayer
            countLetterArr[result[1]] = jsPlayer
            return
        }
    }

    result = concat(0, 4, 8)
    if (typeof(result) === 'object' && result[0] === jsPlayer) {
        items[result[1]].innerHTML = jsPlayer
        countLetterArr[result[1]] = jsPlayer
        return
    }

    result = concat(2, 4, 6)
    if (typeof(result) === 'object' && result[0] === jsPlayer) {
        items[result[1]].innerHTML = jsPlayer
        countLetterArr[result[1]] = jsPlayer
        return
    }


    for (let i = 0; i < 3; i++) {
        let result = concat(i, i + 3, i + 6)
        if (typeof(result) === 'object' && result[0] === huPlayer) {
            items[result[1]].innerHTML = jsPlayer
            countLetterArr[result[1]] = jsPlayer
            return
        }
    }

    for (let i = 0; i <= 6; i += 3) {
        let result = concat(i, i + 1, i + 2)
        if (typeof(result) === 'object' && result[0] === huPlayer) {
            items[result[1]].innerHTML = jsPlayer
            countLetterArr[result[1]] = jsPlayer
            return
        }
    }

    result = concat(0, 4, 8)
    if (typeof(result) === 'object' && result[0] === huPlayer) {
        items[result[1]].innerHTML = jsPlayer
        countLetterArr[result[1]] = jsPlayer
        return
    }

    result = concat(2, 4, 6)
    if (typeof(result) === 'object' && result[0] === huPlayer) {
        items[result[1]].innerHTML = jsPlayer
        countLetterArr[result[1]] = jsPlayer
        return
    }

    let clearIndInItems = []
    let busyIndInItems = []

    for (let i = 0; i < 9; i++) {
        if (countLetterArr[i] === null) {
            clearIndInItems.push(i)
        }

        if (countLetterArr[i] !== null) {
            busyIndInItems.push(i)
            // console.log('busyIndInItems', busyIndInItems);
        }
    }

    if (clearIndInItems.length === 9) {
        randomIndex = Math.floor(Math.random() * bestIndToMove.length)
        randomWalk = bestIndToMove[randomIndex]
        items[randomWalk].innerHTML = jsPlayer
        countLetterArr[randomWalk] = jsPlayer
    } else if (clearIndInItems.length === 8) {
        if (busyIndInItems[0] > 5) {
            randomWalk = busyIndInItems[0] - 3
        } else {
            randomWalk = busyIndInItems[0] + 3
        }
        items[randomWalk].innerHTML = jsPlayer
        countLetterArr[randomWalk] = jsPlayer
    } else if (clearIndInItems.length < 8 && clearIndInItems.length !== 0) {
        randomIndex = Math.floor(Math.random() * clearIndInItems.length)
        randomWalk = clearIndInItems[randomIndex]
        items[randomWalk].innerHTML = jsPlayer
        countLetterArr[randomWalk] = jsPlayer
    } else if (clearIndInItems.length === 0) {
        stop = true
        return
    }
}

function showResult(stop) {
    if (stop === true) {
        // console.log('show result');
        whoWinner(step)
        gameCont.classList.remove('slowlyShow')
        gameCont.classList.add('slowlyHide')
        setTimeout(() => {
            gameCont.classList.add('hide')
        }, 300)
        resultBlok.classList.add('slowlyShow')
        setTimeout(() => {
            resultBlok.classList.remove('hide')
        }, 600)
    }
}

function whoWinner(step) {
    if (step === 9) {
        resultTitle.innerText = `Draw, steps: ${step}`
    } else {
        resultTitle.innerText = `Winner: ${winnerLetter}, steps: ${step}`
    }
}

function countSteps(step) {
    // console.log('step', step);
    if (step === 9) {
        stop = true
        showResult(stop)
    }
}

tryAgain.addEventListener('click', funcTryAgain)
cancel.addEventListener('click', funcCancel)

function funcTryAgain() {
    clearItemsAndCountLetterArr()
    resultBlok.classList.remove('slowlyShow')
    resultBlok.classList.add('slowlyHide')
    setTimeout(() => {
        resultBlok.classList.add('hide')
    }, 300)
    gameCont.classList.remove('slowlyHide')
    gameCont.classList.remove('slowlyShow')
    setTimeout(() => {
        gameCont.classList.remove('hide')
    }, 600)
    whoStarts(huPlayer)
}

function funcCancel() {
    clearItemsAndCountLetterArr()
    resultBlok.classList.remove('slowlyShow')
    resultBlok.classList.add('slowlyHide')
    setTimeout(() => {
        resultBlok.classList.add('hide')
    }, 300)
    startCont.classList.remove('slowlyHide')
    startCont.classList.add('slowlyShow')
    setTimeout(() => {
        startCont.classList.remove('hide')
    }, 600)

}

function clearItemsAndCountLetterArr() {
    stop = false
    step = 0
    items.forEach((el) => {
        el.textContent = null
        el.style.color = 'gold'
    })
    for (let i = 0; i < countLetterArr.length; i++) {
        countLetterArr[i] = null
    }
}

console.log(`
Ваша отметка - 50 балла(ов)
Отзыв по пунктам ТЗ:
Не выполненные/не засчитанные пункты:
1) Результаты последних 10 игр сохраняются в local storage. Есть таблица рекордов, в которой отображаются результаты предыдущих 10 игр

Частично выполненные пункты:
1) Анимации или звуки, или настройки игры. Баллы начисляются за любой из перечисленных пунктов — 5 балл(а)
Добавлено:
- выбор символа х или о;
- плавное открытие и закрытие каждой секции;
- можно продолжать игру тем же символом, что выбрали ранее - сохраняя порядок хода
или выбрать другой символ и другой порядок хода.
2) Очень высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения — 5 балл(а)
- оформление css добавлено с учетом задания.

Все оставшиеся пункты выполнены и не имеют комментариев проверяющего.
`);
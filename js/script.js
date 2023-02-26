const passwordShow = document.querySelector('.password')
const intlength = document.querySelector('#length')
const chklowercase = document.querySelector('#lowercase')
const chkuppercase = document.querySelector('#uppercase')
const chknumbers = document.querySelector('#numbers')
const chksymbols = document.querySelector('#symbols')
const btnGenerate = document.querySelector('.btn-generate')

const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const symbols = ['!', '@', '#', '$', '%', '?', '&']

const caracters = Array.from(Array(26)).map((_, i) => i + 97) //do A ao Z
const lowercaseCaracters = caracters.map((item) => String.fromCharCode(item))
const uppercaseCaracters = lowercaseCaracters.map((item) => item.toUpperCase())

intlength.addEventListener('focusout', () => {
  if(intlength.value < 6){
    alert('Sua senha deve ter pelo menos 6 caracteres.')
    return
  }
})

btnGenerate.addEventListener('click', () => {
  generatePassword(
    chknumbers.checked,
    chksymbols.checked,
    chklowercase.checked,
    chkuppercase.checked,
    intlength.value
  )
})

const generatePassword = (
  hasNumbers,
  hasSymbols,
  hasLowercase,
  hasUppercase,
  length
) => {
  const newArray = [
    ...(hasNumbers ? numbers : []),
    ...(hasSymbols ? symbols : []),
    ...(hasLowercase ? lowercaseCaracters : []),
    ...(hasUppercase ? uppercaseCaracters : [])
  ]

  if (newArray.length === 0) {
    alert('Marque pelos menos uma das opções abaxio')
    return
  } 

  let password = ''

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * newArray.length)
    password += newArray[randomIndex]
  }

  passwordShow.value = password
}

function showMessage() {
  document.querySelector(".myTooltip").classList.add('tooltiptext');
  setTimeout(() => {
    document.querySelector(".myTooltip").classList.remove('tooltiptext');
  }, "2000")
}

function showTooltip() {
  passwordShow.select();
  //passwordShow.setSelectionRange(0, passwordShow.value.length);
  navigator.clipboard.writeText(passwordShow.value);
  showMessage()  
}

const btnCopy = document.querySelector('.copy')

btnCopy.addEventListener('click', () => {
  if ( passwordShow.value !== '') {
    showTooltip()
  } else return
})

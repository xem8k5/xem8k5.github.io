// pallete
const color = {
  textLight: '#ffffff',
  textDark: '#000000',
  regular: '#ffffff',
  main: '#fca311',
  background: '#e5e5e5',
  header: '#000000',
  link: '#14213d'
}

// picture
const main = new StyledElement('main shadow')

// picture size
const imgSize = new StyledElement('imgSize')

// drag and drop area
const dropArea = new StyledElement('dropArea')
dropArea.fileDragandDropHandler('dropper', '上传或者拖入PNG或者JPG格式图片文件', 'dropAreaBox')



// load button
const loadContent = new StyledElement('loadContent dataInteraction')
loadContent.addLoader('loader', '上传图片', 'shadow')

// save button
const saveContent = new StyledElement('saveContent dataInteraction')
saveContent.addSaver('saver', '下载图片', 'shadow')

// canvas
const img = new StyledElement('img', 'img')

// image size warning
const warningSize = new StyledElement('warningSize')
warningSize.text = '尽量别加载大型图片，否则可能会出现未知问题'

// adding all stuff above (++)
main.add = imgSize
main.add = img
main.add = warningSize

// whole header
const headContainer = new StyledElement('headContainer shadow')

// logo
const head = new StyledElement('head')
head.addHtml = '图片转换MSAV'

// ++
headContainer.add = head

// info
const info = new StyledElement('info shadow')

const infoBefore = new StyledElement('infoContainer') // before converting
const infoAfter = new StyledElement('infoContainer') // after converting
const infoConverting = new StyledElement('infoContainer') // while converting

infoConverting.hide()
infoConverting.addHtml = '<span style="padding: 47px 0;">Converting...</span><span style="padding: 23px 0;">Please wait as the system converts your image.</span>'

infoBefore.text = '按下按钮开始转换'
// convert button
const btnConvert = new StyledElement('btn', 'button')
btnConvert.addHtml = '转换'
btnConvert.pressed = () => {
  infoBefore.hide()
  infoConverting.show('flex')
  const top = headContainer.element.getBoundingClientRect().bottom+2
  if (top < 0) window.scrollTo({ top: top+window.scrollY, behavior: 'smooth' })
  setTimeout(() => makeImg(),0)
  setTimeout(() => {
    infoConverting.hide()
    infoAfter.show('flex')
  },0)
}
infoBefore.add = btnConvert

infoAfter.hide()
infoAfter.text = '转换完毕，你可以保存了'
// reload button
const btnReload = new StyledElement('btn', 'button')
btnReload.addHtml = '回到初始状态'
btnReload.pressed = () => {
  myImg = lastImg
  load = true
  infoAfter.hide()
  infoBefore.show('flex')
}
infoAfter.add = btnReload
// ++
info.add = infoBefore
info.add = infoConverting
info.add = infoAfter

// all stuff from options
const settings = new StyledElement('settings shadow')

// only options (title)
const options = new StyledElement('options')

// title
const optionsTitle = new StyledElement('optionsTitle')
optionsTitle.text = '转换选项'

// options buttons (input radio)
const optionsRadios = new StyledElement('optionsRadios')

optionsRadios.putRadio('平地地板', 0, 'options')
optionsRadios.putRadio('所有类型地块', 1, 'options')
optionsRadios.putRadio('自定义', -1, 'options')
optionsRadios.updateRadios('options')

// gamma correction slider
const gamma = new StyledElement('gamma')
gamma.addHtml = '亮度: <span id="gammaValue">1</span>'
gamma.addHtml = `<input class="slider" id="sliderGamma" type="range" min="0.1" max="2" value="1" step=".02">`

// ++
options.add = optionsTitle
options.add = gamma
options.add = optionsRadios

// hidden custom options
const optionsCustom = new StyledElement('optionsCustom')

const allStuffName = Object.keys(allObjects)
for (let icon of allStuffName) {
  optionsCustom.putCheckbox(icon.split('-').join(' '), icon, 'custom')
}
optionsCustom.updateCheckboxes('custom')

// ++
settings.add = options
settings.add = optionsCustom

// side bar
const sideBarInfo = new StyledElement('sideBarInfo shadow')

sideBarInfo.addGroup('帮助', '加载您的图像，按转换按钮并等待处理完毕。您可以在下面应用一些选项')
sideBarInfo.addGroup('导入进游戏', '要把图片制作成Mindustry地图，请访问 <div class="command">1. 编辑器</div><div class="command">2. 新地图</div><div class="command">3. 菜单 (在地图编辑器中)</div><div class="command">4. 导入</div><div class="command">5. 导入图片文件</div><div class="command">6. 然后打开转换后的图片</div>')
sideBarInfo.addGroup('格外提醒', '别他妈转换r18g，雷人图片祸害服务器啊傻逼')

// footer
const footer = new StyledElement('footer shadow')
footer.addHtml = `<div class="center">
  <div>Contacts</div>
  <div>Discord:&nbspOriginal Made by&nbsp<span class="link">L' kk#6790</span></div>
  <div>Github:&nbsp<a class="link" target="_blank" href="https://github.com/WilloIzCitron">WilloIzCitron</a>&nbsp|&nbspOriginal Made By:&nbsp<a class="link" target="_blank" href="https://github.com/Lkk9">Lkk9</a>&nbsp|&nbsp<a class="link" target="_blank" href="https://github.com/WilloIzCitron/pngToMsav">Source Code</a></div>
  <div class="cop" style="user-select: none;">Copyright (c) 2022 Copyright Holder All Rights Reserved.</div>
</div>`

// dynamic stuff
setInterval(() => {

  gammaCorrection = document.getElementById('sliderGamma').value
  document.getElementById('gammaValue').innerHTML = gammaCorrection

  const src = document.getElementById('defaultCanvas0')?.toDataURL('image/png')
  img.element.src = !!src ? src : ''

  if (myImg?.width > 1 && myImg?.height > 1) {
    imgSize.element.innerHTML = `${myImg?.width}X${myImg?.height} px`
    img.show()
  }

  if (myImg.width*myImg.height > 500**2)
    warningSize.show()
  else
    warningSize.hide()

  let currentOption = +optionsRadios.currentRadioValue
  optionsCustom.hide()
  if (currentOption === 0) {
    allColors = Object.values(allObjects).splice(14, 42)
  } else if (currentOption === 1) {
    allColors = Object.values(allObjects)
  } else if (currentOption === -1) {
    optionsCustom.show('grid')
  }
}, 0)

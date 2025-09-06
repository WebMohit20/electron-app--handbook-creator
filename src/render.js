
const Editor = toastui.Editor
const convert = document.getElementById('convert')
const editor = new Editor({
    el: document.querySelector('#editor'),
    height: '500px',
    width: '400px',
    initialEditType: 'WYSIWYG',
    previewStyle: 'tab',
    // theme: 'dark'
});

const download = document.getElementById('download')

const upload = document.getElementById('upload')

download.addEventListener('click', () => {
    const HTMLContent = editor.getHTML()

    // console.log(HTMLContent)
    downloadContent(HTMLContent, false, 'content.html')

})

upload.addEventListener('change', (evt) => {
    const file = evt.target.files[0]
    
    if (file) {
        
        const reader = new FileReader()
        reader.onload = (e) => {
            const htmlContent = e.target.result
            editor.setHTML(htmlContent)
        }
        reader.readAsText(file)
    }
})

convert.addEventListener('click', () => {

    const HTMLContent = editor.getHTML()

    const doc = new DOMParser().parseFromString(wrapper(HTMLContent).outerHTML, 'text/html')

    const css = document.createElement('link')
    css.rel = 'stylesheet'
    css.href = 'https://d1tq2834awssza.cloudfront.net/80b99c15-b648-43a6-86f5-ef7c22b8b98a/build/assets/app-5114826c.css'

    doc.head.append(css)

    downloadContent(doc)
    // console.log(doc.body)


})



function handleEle(temp) {

    temp
        .childNodes
        .forEach((ele) => {
            // console.log(ele)
            if (checkNodeType(ele)) {
                if (ele.tagName === 'H1') {
                    headingHandler(ele)
                } else if (ele.tagName === 'P') {

                    if (checkNodeType(ele.childNodes[0])) {
                        if (ele.childNodes[0].tagName === 'IMG') {

                            imageHandler(ele)

                        } else if (ele.childNodes[0].tagName === 'STRONG') {
                            subHeadingHandler(ele)
                        }

                    } else {
                        paraHandler(ele)
                    }
                } else if (ele.tagName === 'H2') {
                    h2Handler(ele)
                } else if (ele.tagName === 'H3') {
                    h3Handler(ele)
                } else if (ele.tagName === 'UL') {
                    listHandler(ele)
                    // ele.remove()
                }
            }

        })
}

function wrapper(HTMLContent) {
    const section = document.createElement('section')
    section.classList.add('col-span-12', 'md:col-span-8', 'lg:col-span-9')
    section.id = 'handbook-content'

    const div = document.createElement('div')
    div.classList.add('md:pl-8', 'lg:pl-10', 'print:!pl-0')

    const documentContainer = document.createElement('div')
    documentContainer.classList.add('document-item-spacing', 'document-container')

    const temp = document.createElement('div')
    temp.innerHTML = HTMLContent

    handleEle(temp)

    documentContainer.append(...temp.childNodes)
    div.append(documentContainer)
    section.append(div)

    return section
}

function checkNodeType(node) {
    if (node.nodeType === Node.ELEMENT_NODE) {
        return true
    } else {
        return false
    }
}

function headingHandler(ele) {
    ele.classList.add('type-heading', 'type-heading--lg', 'pb-2')
}

function h2Handler(ele) {
    ele.classList.add('type-heading', 'linked-heading')
}

function h3Handler(ele) {
    ele.classList.add('type-heading', 'type-heading--xs', 'type-portable')
}

function paraHandler(ele) {
    ele.classList.add('type-body', 'type-portable')
    // if(ele.)
}

function imageHandler(ele) {
    // console.log(img);
    let img = ele.childNodes[0]
    let imgPortable = document.createElement('div')
    imgPortable.classList.add('img-portable', 'relative', 'overflow-hidden', 'overflow-clip', 'rounded', 'sm:rounded-lg', 'lg:rounded-xl')

    img.classList.add('w-full')
    img.width = '1600'
    img.height = '1000'

    let cloneImg = img.cloneNode(true);
    imgPortable.append(cloneImg)


    ele.replaceWith(imgPortable)

}

function subHeadingHandler(ele) {
    if (ele.childNodes[0].childNodes[0].tagName === 'EM') {
        proTipsHandler(ele)
    } else {
        paraHandler(ele)
    }
}

function listHandler(ele) {
    ele
        .childNodes
        .forEach((li, idx) => {
            let p = document.createElement('p')
            let div = document.createElement('div')
            let h2 = document.createElement('h2')
            let a = document.createElement('a')
            li
                .childNodes[0]
                .childNodes
                .forEach(el => {
                    if (el.tagName === 'DEL') {

                        p.innerHTML = el.innerHTML

                        el.replaceWith(p)

                        paraHandler(p)

                    } else if (el.tagName === 'A') {
                        div.classList.add('pt-poi-heading')
                        div.append(h2)
                        h2.append(a)
                        a.innerHTML = el.innerHTML
                        a.href = el.href
                        el.replaceWith(div)
                    }


                })

            li.innerHTML = ''
            li.append(div, p)
            // li.remove()
            // ele.append(div,p)
        })
}

function proTipsHandler(ele) {

    const calloutPortable = document.createElement('div')
    calloutPortable.classList.add('callout-portable', 'rounded-xl', 'spacing-y-xs', 'px-4', 'md:px-8', 'py-4', 'md:py-6', 'pl-9', 'md:pl-12', 'bg-[#E8F0FF]')

    const div = document.createElement('div')

    div.classList.add('flex', 'items-center', 'gap-2', 'md:gap-3', 'text-[#0067DD]')

    const h3 = document.createElement('h3')
    h3Handler(h3)
    h3.innerText = ele.childNodes[0].childNodes[0].innerHTML
    let svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none"
                            class="w-4 -ml-6 md:w-6 md:-ml-7 inline-block text-[#0067DD]" aria-hidden="true">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M18.0258 15.6025L21.5504 19.2032L11.3399 29.2851C10.8585 29.7514 10.2099 30.0071 9.53581 29.9999C8.8636 29.9909 8.22226 29.7172 7.75171 29.2401C7.28116 28.763 7.02317 28.1203 7.03044 27.4524C7.03952 26.7862 7.31567 26.1507 7.79713 25.6844L18.0258 15.6025ZM19.1704 14.4682L23.8759 9.85934C24.3573 9.45786 24.9732 9.24902 25.6019 9.27602C26.2305 9.30303 26.8264 9.56408 27.2697 10.007C27.713 10.448 27.9728 11.0404 27.9982 11.6633C28.0218 12.2862 27.8093 12.8947 27.4005 13.37L22.695 18.0149L19.1704 14.4682ZM10.9402 3.54011L11.9213 8.40105C11.9831 8.6729 12.1211 8.92315 12.321 9.12119C12.5208 9.31923 12.7734 9.45606 13.0477 9.51727L17.8804 10.4895L13.0477 11.4797C12.7716 11.5283 12.5172 11.6597 12.321 11.8577C12.1193 12.054 11.9794 12.3042 11.9213 12.5779L10.9402 17.3668L9.94096 12.5779C9.88101 12.3078 9.74838 12.0594 9.55943 11.8577C9.35958 11.6633 9.10705 11.5319 8.83271 11.4797L4 10.3994L8.83271 9.42725C9.10887 9.36964 9.3614 9.23101 9.55943 9.03117C9.7393 8.85654 9.87011 8.6405 9.94096 8.40105L10.9402 3.54011ZM19.57 3L20.0424 5.30445C20.0769 5.43047 20.1387 5.5475 20.2241 5.64651C20.3204 5.73653 20.4403 5.79955 20.5693 5.82655L22.8948 6.29464L20.6056 6.76273C20.4748 6.79694 20.3549 6.86535 20.2604 6.96077C20.1732 7.05799 20.1096 7.17501 20.0788 7.30284L19.6064 9.58928L19.134 7.30284C19.0977 7.17321 19.0286 7.05619 18.9342 6.96077C18.8379 6.86715 18.7198 6.79874 18.589 6.76273L16.2453 6.29464L18.5526 5.82655C18.6834 5.80315 18.8052 5.74013 18.8978 5.64651C18.9941 5.5529 19.0632 5.43407 19.0977 5.30445L19.57 3Z"
    fill="currentColor" /></svg>`

    div.innerHTML = svg
    div.append(h3)

    const p = document.createElement('p')
    p.classList.add('md:ml-2', 'type-portable', 'type-body', 'text-[#0067DD]')
    p.innerText = ele.childNodes[1].innerHTML


    calloutPortable.append(div, p)
    // console.log(calloutPortable);

    ele.replaceWith(calloutPortable)

}

function downloadContent(doc, orignal = true, fileName = 'handbook.html') {
    let updatedHTML = null
    if (orignal) {
        updatedHTML = "<!DOCTYPE html>\n" + doc.documentElement.outerHTML;
    } else {
        updatedHTML = doc
    }

    const blob = new Blob([updatedHTML], { type: 'text/html' })
    const url = URL.createObjectURL(blob)

    const a = document.createElement('a')
    a.href = url
    a.download = fileName
    a.click()

    URL.revokeObjectURL(url)
}
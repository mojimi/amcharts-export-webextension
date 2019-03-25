function txtAnchorToAlign(anchor) {
    if(anchor === 'middle'){
        return 'center';
    }else if(anchor === 'start'){
        return 'left';
    }else if(anchor === 'end'){
        return 'right';
    }else{
         return anchor;
    }
}
function eleFromStr(string){
    const ele = document.createElement('div');
    ele.innerHTML = string;
    return ele.firstElementChild;
}
function chartTextToHtml(chart) {
    const textDivs = document.createElement('div');
    textDivs.setAttribute('style', 'position: absolute; top: 0')
    chart.containerDiv.appendChild(textDivs);
    chart.containerDiv.querySelectorAll('text')
    .forEach(txt => {
        const newTxt = document.createElement('div');
        textDivs.appendChild(newTxt);
        newTxt.style.position = 'absolute';
        txt.querySelectorAll('tspan')
        .forEach(span => {
            const newSpan = document.createElement('p');
            newSpan.innerHTML = span.innerHTML;
            newSpan.style.margin = 0;
            newTxt.appendChild(newSpan);
            newSpan.style.height = span.getBoundingClientRect().height + 'px';
        })
        const rect = txt.getBoundingClientRect();
        newTxt.setAttribute('style', 'white-space: nowrap;position : absolute');
        newTxt.style.fontSize = txt.getAttribute('font-size');
        newTxt.style.textAlign = txtAnchorToAlign(txt.getAttribute('text-anchor'));
        const newTop = rect.y - (rect.height/4) - chart.containerDiv.getBoundingClientRect().y + 3;
        const newLeft = rect.x - chart.containerDiv.getBoundingClientRect().x + 1;
        newTxt.style.top = newTop + 'px';
        newTxt.style.left = newLeft + 'px';
        txt.style.visibility = 'hidden';
    })
    return textDivs;
}
function svgToCanvas(svg, scale=1){
    const canvas = document.createElement('canvas');
    const rect = svg.getBoundingClientRect();
    canvas.width = rect.width*scale;
    canvas.height = rect.height*scale;
    svg.setAttribute('style', '');
    svg.setAttribute('viewBox', '0 0 ' + rect.width + ' ' + rect.height);
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.setAttribute('xmlns:xlink', 'http://www.w3.org/1999/xlink')
    canvg(canvas, svg.outerHTML);
    return canvas;
}
function downloadCanvas(canvas) {
    const a = document.createElement('a');
    a.setAttribute('href', canvas.toDataURL("image/png", 1.0));
    a.download = 'image.png';
    document.body.appendChild(a);
    a.click();
    a.remove();
}
function loadJS(url){
    return new Promise( r => {
        const script = document.createElement('script');
        script.onload = r
        script.src = url;
        document.body.appendChild(script);
    })
}

function loadAmChartsExportMenu () {
    AmCharts.charts.forEach(chart => {
        const appendToEle = chart.containerDiv.parentElement.parentElement;
        //TODO: Add different options based on chart type
        //TODO: Add inputs to change colors
        const button = eleFromStr(
        `<button class="side-menu-button" style="position: absolute;top: 0;right: 0;padding: .3rem;cursor: pointer;border-radius: 50%;border: none;background: white;color: #000000c4;font-size: 2rem;margin-right: .5rem;transition: .5s ease;">
            ☰
        </button>`
        )
        const drawer = eleFromStr(
        `<div class="side-menu-drawer" style="position: absolute;width: 300px;height: 100%;top: 0;right: 0;background: #ffffffbd;transform: translateX(100%);transform-origin: right;transition: .5s ease;padding: 1.5rem;">
            <a class="side-menu-close" style="float:left" href="#">&times</a>
            <h3 style="margin-bottom: 0;text-align: center;margin: 0;">Customizações</h3>
            <hr>
            <label for="radius-range">Tamanho do gráfico</label>
            <input id="radius-range" type="range" max="400" value="${chart.radiusReal}" min="50" step="10">
            <label for="font-range">Tamanho do fonte</label>
            <input id="font-range" type="range" min="8" max="30" value="${chart.fontSize}">
            <label for="font-color-range">Cor da fonte</label>
            <input id="font-color-range" type="color" value="${chart.color}">
            <button class="export-btn">Exportar</button>
        </div>`);
        drawer.querySelector('#radius-range').oninput = evt => {
            chart.radius = evt.target.value;
            chart.validateNow();
        }
        drawer.querySelector('#font-range').oninput = evt => {
            chart.fontSize = evt.target.value;
            chart.validateNow();
        }
        drawer.querySelector('#font-color-range').oninput = evt => {
            chart.color = evt.target.value;
            chart.validateNow();
        }
        drawer.querySelector('.export-btn').onclick = evt => amChartToCanvas(chart);
        drawer.querySelector('.side-menu-close').onclick = evt => drawer.style.transform = 'translateX(100%)';
        button.querySelector('.side-menu-button').onclick = evt => drawer.style.transform = 'translateX(0px)';
        appendToEle.appendChild(menuEle);
    })
    
}
function amChartToCanvas(chart, scale) {
    const options = {
        backgroundColor : null,
        scale : scale,
        useCORS : true,
        allowTaint : false,
        onclone : doc => {
            const ele = doc.querySelector('[html2canvas-current-div="true"]');
            ele.querySelectorAll('*').forEach(child => {
                child.style.backgroundColor = 'transparent'
            });
            ele.style.backgroundColor = 'transparent'
            ele.querySelectorAll('[class*="amcharts-scrollbar"]').forEach(scrollbar => scrollbar.remove());
            ele.querySelectorAll('svg').forEach(svg => {
                const parent = svg.parentElement;
                const canvas = svgToCanvas(svg, scale);
                canvas.setAttribute('style', `transform: scale(${1/scale}, ${1/scale});transform-origin: top left`)
                svg.replaceWith(canvas);
                parent.style.overflow = 'visible';
                canvas.style.overflow = 'visible';
            });

        }
    }
    //TODO: Change scope based on wether the user wants labels
    const outerDiv = chart.containerDiv;
    document.querySelectorAll('[html2canvas-current-div="true"]').forEach(ele => ele.removeAttribute('html2canvas-current-div'))
    outerDiv.setAttribute('html2canvas-current-div', 'true');
    const newTxtDivs = chartTextToHtml(chart);
    html2canvas(outerDiv, options)
    .then(canvas => {
        newTxtDivs.remove();
        chart.containerDiv.querySelectorAll('text').forEach(txt => txt.style.visibility = 'visible');
        const ctx = canvas.getContext('2d');
        ctx.mozImageSmoothingEnabled = false;
        ctx.webkitImageSmoothingEnabled = false;
        ctx.msImageSmoothingEnabled = false;
        ctx.imageSmoothingEnabled = false;
        return canvas;
    })
}
loadJS('https://raw.githack.com/mojimi/string-format/master/html2canva.test.js')
.then( () => loadJS('https://raw.githack.com/mojimi/string-format/master/rgbcolor.test.js'))
.then( () => loadJS('https://raw.githack.com/mojimi/string-format/master/canvg2.test.js'))
.then( () => loadJS('https://raw.githack.com/amcharts/amcharts3/master/amcharts/plugins/export/export.min.js'))
.then(loadAmChartsExportMenu)
